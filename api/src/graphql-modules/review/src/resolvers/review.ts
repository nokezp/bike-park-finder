import { reviewProvider } from '../providers/ReviewProvider.js';

export const review = {
  Review: {
    createdBy: async (review: any) => {
      return reviewProvider.getReviewCreator(review);
    },
  },
};
