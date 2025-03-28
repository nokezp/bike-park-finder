import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../../../utils/auth.js';
import { UserModel } from '../models/UserModel.js';

// User object with optional password field
interface UserObject {
  password?: string;
  [key: string]: any;
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
      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

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
        role: 'user',
        agreeToTerms: false,
        profile: {
          firstName,
          lastName,
          ridingLevel: 'Beginner',
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
  async login(email: string, password: string) {
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
      throw new GraphQLError(`Login failed: ${error.message}`);
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
      if (args.name) user.name = args.name;
      if (args.email) user.email = args.email;

      await user.save();
      return user;
    } catch (error: any) {
      throw new GraphQLError(`Update failed: ${error.message}`);
    }
  }
}

export const authProvider = new AuthProvider();
