import { AuthContext } from '../../../../utils/auth.js';
import { reviewProvider } from '../../../review/src/providers/ReviewProvider.js';
import { authProvider } from '../providers/AuthProvider.js';

export const query = {
  Query: {
    me: async (_: unknown, __: unknown, context: AuthContext) => {
      if (!context.user) {
        return null;
      }

      return authProvider.getMe(context.user.id);
    },

    reviewsByUser: async (_: never, args: { userId: string, page?: number; limit?: number }) => {
      return reviewProvider.getReviewsByUser(args.userId, args.page, args.limit);
    },
  },
};
