import { AuthContext } from '../../../../utils/auth.js';
import { stravaProvider } from '../providers/StravaProvider.js';
import { GraphQLError } from 'graphql';

export const mutation = {
  Mutation: {
    connectStrava: async (_: unknown, { code }: { code: string }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      return stravaProvider.handleOAuthCallback(code, context.user.id);
    },

    disconnectStrava: async (_: unknown, __: unknown, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      return stravaProvider.disconnectStrava(context.user.id);
    },
  },
};
