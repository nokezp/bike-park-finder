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

    login: async (_: unknown, args: { email: string; password: string }) => {
      return authProvider.login(args.email, args.password);
    },

    updateProfile: async (_: unknown, args: { name?: string; email?: string }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      
      return authProvider.updateProfile(context.user.id, args);
    },
  },
};
