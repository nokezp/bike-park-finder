import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { JWT_SECRET, JWT_EXPIRES_IN, AuthContext } from '../../../../utils/auth.js';
import { UserModel } from '../models/UserModel.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongoose';

// Google OAuth client
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '938158311101-08if6hhqen4ag4v1ihbfsl4ci5kq58hu.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'noreply@bikeparkfinder.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'password';
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.example.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587');
const EMAIL_FROM = process.env.EMAIL_FROM || 'Bike Park Finder <noreply@bikeparkfinder.com>';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// User object with optional password field
interface UserObject {
  password?: string;
  [key: string]: any;
}

// Google user info
interface GoogleUserInfo {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string; // Google's user ID
}

export class AuthProvider {
  /**
   * Get the current authenticated user
   */
  async getMe(userId: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new GraphQLError('User not found');
      }
      return user;
    } catch (error: any) {
      throw new GraphQLError(`Error fetching user: ${error.message}`);
    }
  }

  /**
   * Get the user
   */
  async getUserById(userId: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new GraphQLError('User not found');
      }
      return user;
    } catch (error: any) {
      throw new GraphQLError(`Error fetching user: ${error.message}`);
    }
  }

  /**
   * Register a new user
   */
  async register(args: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      const { username, firstName, lastName, email, password, confirmPassword } = args;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new GraphQLError('User already exists');
      }

      // Create user
      const user = new UserModel({
        username,
        email,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'user',
        agreeToTerms: false,
        profile: {
          firstName,
          lastName,
          preferences: {
            skillLevel: 'Beginner'
          }
        },
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      // Remove password from response
      const userObj = user.toObject() as UserObject;
      delete userObj.password;

      return {
        token,
        user: userObj,
      };
    } catch (error: any) {
      throw new GraphQLError(`Registration failed: ${error.message}`);
    }
  }

  /**
   * Login a user
   */
  async login(email: string, password: string, rememberMe?: boolean, req?: any) {
    try {
      // Find user
      const user = await UserModel.findOne({ email }).select('+password');
      if (!user) {
        throw new GraphQLError('Invalid credentials');
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new GraphQLError('Invalid credentials');
      }

      // Set token expiration based on rememberMe flag
      const expiresIn = rememberMe ? '30d' : JWT_EXPIRES_IN; // 30 days for remember me, default otherwise

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn });

      // Remove password from response
      const userObj = user.toObject() as UserObject;
      delete userObj.password;

      user.lastLogin = new Date().toISOString();
      await user.save();

      if (req?.session) {
        req.session.userId = user._id.toString();
      }

      return {
        token,
        user: userObj,
      };
    } catch (error: any) {
      throw new GraphQLError(`Login failed: ${error.message}`);
    }
  }

  /**
   * Login or register a user with Google
   */
  async googleLogin(idToken: string) {
    try {
      // Verify the Google ID token
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload() as GoogleUserInfo;
      if (!payload) {
        throw new GraphQLError('Invalid Google token');
      }

      const { email, given_name, family_name, sub } = payload;

      // Check if user exists
      let user = await UserModel.findOne({ email });

      if (!user) {
        // Create a new user if they don't exist
        const username = email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);

        user = new UserModel({
          username,
          email,
          googleId: sub,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toDateString(),
          role: 'user',
          firstName: given_name,
          lastName: family_name,
          lastLogin: new Date().toISOString(),
          profile: {
            firstName: given_name,
            lastName: family_name,
            preferences: {
              skillLevel: 'Beginner'
            }
          },
        });

        await user.save();
      } else if (!user.googleId) {
        // Link Google account to existing user
        user.googleId = sub;
        user.updatedAt = new Date();
        await user.save();
      }

      // Generate JWT token (long-lived for SSO)
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

      return {
        token,
        user,
      };
    } catch (error: any) {
      throw new GraphQLError(`Google login failed: ${error.message}`);
    }
  }

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(email: string) {
    try {
      // Find user
      const user = await UserModel.findOne({ email });
      if (!user) {
        // For security reasons, don't reveal if the email exists or not
        return true;
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Hash token and set to resetPasswordToken field
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      // Set token expiry (1 hour)
      const resetPasswordExpire = Date.now() + 3600000;

      // Update user with reset token info
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpire = resetPasswordExpire;
      await user.save({ validateBeforeSave: false });

      // Create reset URL
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

      // Email message
      const message = `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>This link is valid for 1 hour.</p>
        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
      `;

      // Send email
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: user.email,
        subject: 'Password Reset Request',
        html: message,
      });

      return true;
    } catch (error: any) {
      throw new GraphQLError(`Forgot password failed: ${error.message}`);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, password: string) {
    try {
      // Hash token
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      // Find user with token and valid expiry
      const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        throw new GraphQLError('Invalid or expired token');
      }

      // Set new password
      user.password = password;

      // Clear reset token fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      // Save user
      await user.save();

      // Generate JWT token
      const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      // Remove password from response
      const userObj = user.toObject() as UserObject;
      delete userObj.password;

      return {
        token: jwtToken,
        user: userObj,
      };
    } catch (error: any) {
      throw new GraphQLError(`Reset password failed: ${error.message}`);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, args: { name?: string; email?: string }) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new GraphQLError('User not found');
      }

      // Update fields
      // if (args.name) user.name = args.name;
      if (args.email) user.email = args.email;

      await user.save();
      return user;
    } catch (error: any) {
      throw new GraphQLError(`Update failed: ${error.message}`);
    }
  }

  /**
   * Toggle a bike park as favorite
   */
  async toggleFavoriteBikePark(userId: string, bikeParkId: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new GraphQLError('User not found');
      }

      // Initialize stats if it doesn't exist
      if (!user.stats) {
        user.stats = {};
      }

      // Initialize favoriteParks array if it doesn't exist
      if (!user.stats.favoriteParks) {
        user.stats.favoriteParks = [];
      }

      // Check if the bike park is already in favorites
      const favoriteIndex = user.stats.favoriteParks.findIndex(
        (id) => id.toString() === bikeParkId
      );

      // Toggle favorite status
      if (favoriteIndex === -1) {
        // Add to favorites
        user.stats.favoriteParks.push(bikeParkId as any);
      } else {
        // Remove from favorites
        user.stats.favoriteParks.splice(favoriteIndex, 1);
      }

      await user.save();
      return user;
    } catch (error: any) {
      throw new GraphQLError(`Toggle favorite failed: ${error.message}`);
    }
  }

  /**
   * Check is bike park in favorites
   */
  async isFavorite(bikeParkId: ObjectId | string, currentUser: AuthContext) {
    if (!currentUser.user?.id) {
      throw new Error('Not authenticated');
    }

    const user = await UserModel.findById(currentUser.user.id);
    if (!user) {
      throw new GraphQLError('User not found');
    }

    return user.stats?.favoriteParks?.some(
      (id) => id.toString() === bikeParkId.toString()
    );
  }

  /**
   * Get favorites bike parks
   */
  async getFavorites(currentUser: AuthContext) {
    if (!currentUser.user?.id) {
      throw new Error('Not authenticated');
    }

    const user = await UserModel.findById(currentUser.user.id);
    if (!user) {
      throw new GraphQLError('User not found');
    }

    return user.stats?.favoriteParks;
  }
}

export const authProvider = new AuthProvider();
