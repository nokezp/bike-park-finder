import { reviewProvider } from '../providers/ReviewProvider.js';

export const query = {
  Query: {
    reviews: async (_: any, args: { bikeParkId: string; page?: number; limit?: number }) => {
      const { bikeParkId, page = 1, limit = 5 } = args;
      return reviewProvider.getReviews(bikeParkId, page, limit);
    },
  },
};
