import { GraphQLError } from 'graphql';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';
import { BikePark } from '../models/BikePark.js';

export const reviewResolvers = {
  Query: {
    reviews: async (_: any, args: { bikeParkId: string; page?: number; limit?: number }) => {
      try {
        const { bikeParkId, page = 1, limit = 5 } = args;
        const skip = (page - 1) * limit;
        
        // Get total count for pagination
        const totalCount = await Review.countDocuments({ bikePark: bikeParkId });
        
        // Get paginated reviews
        const reviews = await Review.find({ bikePark: bikeParkId })
          .sort({ createdAt: -1 }) // Sort by newest first
          .skip(skip)
          .limit(limit)
          .populate('createdBy')
          .populate('bikePark');
        
        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        
        return {
          reviews,
          totalCount,
          currentPage: page,
          totalPages,
          hasNextPage
        };
      } catch (error: any) {
        throw new GraphQLError(`Error fetching reviews: ${error.message}`);
      }
    },
  },

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
        throw new GraphQLError('Not authenticated');
      }

      try {
        // Create and save the new review
        const review = new Review({
          ...args,
          bikePark: args.bikeParkId,
          createdBy: context.user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const savedReview = await review.save();
        
        // Update the bike park by adding the review to its reviews array
        await BikePark.findByIdAndUpdate(
          args.bikeParkId,
          { $push: { reviews: savedReview._id } },
          { new: true }
        );

        return savedReview;
      } catch (error: any) {
        throw new GraphQLError(`Error creating review: ${error.message}`);
      }
    },
  },

  Review: {
    createdBy: async (review: any) => {
      try {
        // Convert ObjectId to string if it's a Buffer
        if (review.createdBy && typeof review.createdBy === 'object' && review.createdBy.type === 'Buffer') {
          const objectId = Buffer.from(review.createdBy.data).toString('hex');
          return await User.findById(objectId);
        }
        
        return await User.findById(review.createdBy);
      } catch (error: any) {
        console.error(`Error fetching createdBy for review:`, error);
        throw new GraphQLError(`Error fetching createdBy for review: ${error.message}`);
      }
    },
  },
};
