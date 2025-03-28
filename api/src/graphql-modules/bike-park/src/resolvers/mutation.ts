import { AuthContext } from '../../../../utils/auth.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';

export const mutation = {
  Mutation: {
    createBikePark: async (_: unknown, args: any, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.createBikePark(args, context.user.id);
    },

    updateBikePark: async (_: unknown, { id, input }: { id: string; input: any }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.updateBikePark(id, input, context.user.id, context.user.role);
    },

    deleteBikePark: async (_: unknown, { id }: { id: string }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.deleteBikePark(id, context.user.id, context.user.role);
    },
  },
};
