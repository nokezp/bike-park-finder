import { AuthContext } from '../../../../utils/auth.js';
import { authProvider } from '../providers/AuthProvider.js';

export const mutation = {
  Mutation: {
    register: async (_: unknown, args: { 
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      return authProvider.register(args);
    },

    login: async (_: unknown, args: { email: string; password: string; rememberMe?: boolean }) => {
      return authProvider.login(args.email, args.password, args.rememberMe);
    },

    googleLogin: async (_: unknown, args: { idToken: string }) => {
      return authProvider.googleLogin(args.idToken);
    },

    forgotPassword: async (_: unknown, args: { email: string }) => {
      return authProvider.forgotPassword(args.email);
    },

    resetPassword: async (_: unknown, args: { token: string; password: string; confirmPassword: string }) => {
      // Validate password and confirmPassword match
      if (args.password !== args.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      return authProvider.resetPassword(args.token, args.password);
    },

    updateProfile: async (_: unknown, args: { name?: string; email?: string }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      
      return authProvider.updateProfile(context.user.id, args);
    },
  },
};
