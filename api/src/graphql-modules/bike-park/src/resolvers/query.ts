import { BikeParkFilter } from '../../../../core/generated-models.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';

export const query = {
  Query: {
    bikeParks: async (_: unknown, { filter }: { filter?: BikeParkFilter }) => {
      return bikeParkProvider.getBikeParks(filter);
    },

    bikePark: async (_: unknown, { id }: { id: string }) => {
      return bikeParkProvider.getBikeParkById(id);
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
    }
  },
};
