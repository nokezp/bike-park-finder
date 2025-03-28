import { GraphQLError } from 'graphql';
import { ReviewModel } from '../models/ReviewModel.js';
import { UserModel } from '../../../auth/src/models/UserModel.js';
import { BikeParkModel } from '../../../bike-park/src/models/BikeParkModel.js';

export class ReviewProvider {
  /**
   * Get reviews for a bike park with pagination
   */
  async getReviews(bikeParkId: string, page: number = 1, limit: number = 5) {
    try {
      const skip = (page - 1) * limit;
      
      // Get total count for pagination
      const totalCount = await ReviewModel.countDocuments({ bikePark: bikeParkId });
      
      // Get paginated reviews
      const reviews = await ReviewModel.find({ bikePark: bikeParkId })
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
  }

  /**
   * Create a new review
   */
  async createReview(
    data: { 
      rating: number; 
      comment: string; 
      bikeParkId: string;
      title?: string;
      visitDate?: string;
      trailDifficulty?: string;
      photos?: string[];
    },
    userId: string
  ) {
    try {
      // Create and save the new review
      const review = new ReviewModel({
        ...data,
        bikePark: data.bikeParkId,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const savedReview = await review.save();
      
      // Update the bike park by adding the review to its reviews array
      await BikeParkModel.findByIdAndUpdate(
        data.bikeParkId,
        { $push: { reviews: savedReview._id } },
        { new: true }
      );

      return savedReview;
    } catch (error: any) {
      throw new GraphQLError(`Error creating review: ${error.message}`);
    }
  }

  /**
   * Get the user who created a review
   */
  async getReviewCreator(review: any) {
    try {
      // Convert ObjectId to string if it's a Buffer
      if (review.createdBy && typeof review.createdBy === 'object' && review.createdBy.type === 'Buffer') {
        const objectId = Buffer.from(review.createdBy.data).toString('hex');
        return await UserModel.findById(objectId);
      }
      
      return await UserModel.findById(review.createdBy);
    } catch (error: any) {
      console.error(`Error fetching createdBy for review:`, error);
      throw new GraphQLError(`Error fetching createdBy for review: ${error.message}`);
    }
  }
}

export const reviewProvider = new ReviewProvider();
