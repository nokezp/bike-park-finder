import { AuthContext } from '../../../../utils/auth.js';
import { authProvider } from '../../../auth/src/providers/AuthProvider.js';
import { trailProvider } from '../../../trail/src/providers/TrailProvider.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';

export const bikePark = {
  BikePark: {
    createdBy: async (bikePark: any) =>
      authProvider.getUserById(bikePark.createdBy),
    weather: async (bikePark: any) =>
      bikeParkProvider.getBikeParkWeather(bikePark),
    rating: async (bikePark: any) => bikeParkProvider.calculateBikeParkRating(bikePark),
    trails: async (bikePark: any) => trailProvider.getBikeParkTrails(bikePark),
    reviews: async (bikePark: any) => bikeParkProvider.getBikeParkReviews(bikePark),
    isFavorite: async (bikePark: any, _: unknown, context: AuthContext) => authProvider.isFavorite(bikePark?.id, context)
  },
};
