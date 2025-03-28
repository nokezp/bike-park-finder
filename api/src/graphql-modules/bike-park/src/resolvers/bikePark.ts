import { trailProvider } from '../../../trail/src/providers/TrailProvider.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';

export const bikePark = {
  BikePark: {
    weather: async (bikePark: any) => {
      return bikeParkProvider.getBikeParkWeather(bikePark);
    },
    rating: async (bikePark: any) => {
      return bikeParkProvider.calculateBikeParkRating(bikePark);
    },
    trails: async (bikePark: any) => {
      return trailProvider.getBikeParkTrails(bikePark);
    },
    reviews: async (bikePark: any) => {
      return bikeParkProvider.getBikeParkReviews(bikePark);
    },
  },
};
