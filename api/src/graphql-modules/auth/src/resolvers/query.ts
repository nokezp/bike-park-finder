import { AuthContext } from '../../../../utils/auth.js';
import { authProvider } from '../providers/AuthProvider.js';

export const query = {
  Query: {
    me: async (_: unknown, __: unknown, context: AuthContext) => {
      if (!context.user) {
        return null;
      }
      
      return authProvider.getMe(context.user.id);
    },
  },
};
