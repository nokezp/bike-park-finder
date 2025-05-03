import { AuthContext } from '../../../../utils/auth.js';
import { stravaProvider } from '../providers/StravaProvider.js';
import { GraphQLError } from 'graphql';

export const query = {
  Query: {
    stravaAuthUrl: (_: unknown, { state }: { state?: string }) => {
      return stravaProvider.getAuthorizationUrl(state);
    },

    stravaConnection: async (_: unknown, __: unknown, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      const connected = await stravaProvider.isStravaConnected(context.user.id);

      if (!connected) {
        return { connected: false, athlete: null };
      }

      try {
        const athlete = await stravaProvider.getAthleteProfile(context.user.id);
        return { connected: true, athlete };
      } catch (error) {
        // If there's an error getting the athlete profile, we'll still return connected: true
        // but with athlete: null
        console.error('Error getting Strava athlete profile:', error);
        return { connected: true, athlete: null };
      }
    },

    stravaActivities: async (
      _: unknown,
      { page, perPage, before, after }: { page?: number; perPage?: number; before?: number; after?: number },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      const connected = await stravaProvider.isStravaConnected(context.user.id);
      if (!connected) {
        throw new GraphQLError('Strava account not connected');
      }

      return stravaProvider.getActivities(context.user.id, page, perPage, before, after);
    },

    stravaActivity: async (_: unknown, { id }: { id: number }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      const connected = await stravaProvider.isStravaConnected(context.user.id);
      if (!connected) {
        throw new GraphQLError('Strava account not connected');
      }

      return stravaProvider.getActivity(context.user.id, id);
    },
  },
};
