import { ApprovalStatus, BikeParkFilter } from '../../../../core/generated-models.js';
import { AuthContext } from '../../../../utils/auth.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';

export const query = {
  Query: {
    bikeParks: async (_: unknown, { filter }: { filter?: BikeParkFilter }) => {
      return bikeParkProvider.getBikeParks(filter);
    },

    bikePark: async (_: unknown, { id }: { id: string }) => {
      return bikeParkProvider.getBikeParkById(id);
    },

    favoriteBikeParks: async (_: unknown, __: unknown, context: AuthContext) => {
      return bikeParkProvider.getFavoriteBikeParks(context);
    },

    searchBikeParks: async (_: unknown, { query }: { query: string }) => {
      return bikeParkProvider.searchBikeParks(query);
    },

    bikeParksByViewport: async (
      _: unknown,
      {
        viewport,
        searchQuery,
      }: {
        viewport: {
          northEast: { latitude: number; longitude: number };
          southWest: { latitude: number; longitude: number };
        };
        searchQuery?: string;
      },
    ) => {
      return bikeParkProvider.getBikeParksByViewport(viewport, searchQuery);
    },

    mostCommonFeatures: async (_: unknown, { limit }: { limit?: number }) => {
      return bikeParkProvider.getMostCommonFeatures(limit);
    },

    mostCommonFacilities: async (_: unknown, { limit }: { limit?: number }) => {
      return bikeParkProvider.getMostCommonFacilities(limit);
    },

    mostCommonRules: async (_: unknown, { limit }: { limit?: number }) => {
      return bikeParkProvider.getMostCommonRules(limit);
    },

    pendingBikeParks: async (_: unknown, { status }: { status?: ApprovalStatus }, context: AuthContext) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Not authorized. Only admins can access pending bike parks.');
      }
      return bikeParkProvider.getPendingBikeParks(status);
    }
  },
};
