import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { AuthContext } from '../utils/auth.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../utils/auth.js';

// User object with optional password field
interface UserObject {
  password?: string;
  [key: string]: any;
}

export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: AuthContext) => {
      if (!context.user) {
        return null;
      }

      try {
        const user = await User.findById(context.user.id);
        if (!user) {
          throw new GraphQLError('User not found');
        }
        return user;
      } catch (error: any) {
        throw new GraphQLError(`Error fetching user: ${error.message}`);
      }
    },
  },

  Mutation: {
    register: async (_: unknown, args: { 
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const { username, firstName, lastName, email, password, confirmPassword } = args;

        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (existingUser) {
          throw new GraphQLError('User already exists');
        }

        // Create user
        const user = new User({
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
    },

    login: async (_: unknown, args: { email: string; password: string }) => {
      try {
        const { email, password } = args;
        
        // Find user
        const user = await User.findOne({ email }).select('+password');
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
    },

    updateProfile: async (_: unknown, args: { name?: string; email?: string }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const user = await User.findById(context.user.id);
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
    },
  },
};
