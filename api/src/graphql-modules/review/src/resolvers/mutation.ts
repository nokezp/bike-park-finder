import { reviewProvider } from '../providers/ReviewProvider.js';

export const mutation = {
  Mutation: {
    createReview: async (
      _: any,
      args: { 
        rating: number; 
        comment: string; 
        bikeParkId: string;
        title?: string;
        visitDate?: string;
        trailDifficulty?: string;
        photos?: string[];
      },
      context: any
    ) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return reviewProvider.createReview(args, context.user.id);
    },
  },
};
