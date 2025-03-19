import { GraphQLError } from 'graphql';
import { Review } from '../models/Review.js';

export const reviewResolvers = {
  Query: {
    reviews: async () => {
      try {
        return await Review.find().populate('createdBy').populate('bikePark');
      } catch (error: any) {
        throw new GraphQLError(`Error fetching reviews: ${error.message}`);
      }
    },
  },

  Mutation: {
    createReview: async (
      _: any,
      args: { rating: number; comment: string; bikePark: string },
      context: any
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const review = new Review({
          ...args,
          createdBy: context.user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return await review.save();
      } catch (error: any) {
        throw new GraphQLError(`Error creating review: ${error.message}`);
      }
    },
  },
}; 