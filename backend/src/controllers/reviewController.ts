import { Request, Response } from 'express';
import Review from '../models/Review';
import User from '../models/User';

// Get reviews for a bike park
export const getReviewsByBikePark = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    
    const reviews = await Review.find({ bikeParkId })
      .populate('userId', 'id username profileImageUrl')
      .sort({ createdAt: -1 });
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ message: 'Error getting reviews', error });
  }
};

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { bikeParkId } = req.params;
    const { rating, comment } = req.body;
    
    // Check if user already reviewed this bike park
    const existingReview = await Review.findOne({
      userId,
      bikeParkId,
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this bike park' });
    }
    
    const newReview = await Review.create({
      userId,
      bikeParkId,
      rating,
      comment,
    });
    
    const reviewWithUser = await Review.findById(newReview._id)
      .populate('userId', 'id username profileImageUrl');
    
    res.status(201).json({
      message: 'Review created successfully',
      review: reviewWithUser,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only update your own reviews' });
    }
    
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    ).populate('userId', 'id username profileImageUrl');
    
    res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own reviews' });
    }
    
    await Review.findByIdAndDelete(reviewId);
    
    res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review', error });
  }
}; 