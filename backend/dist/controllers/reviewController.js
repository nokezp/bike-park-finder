"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByBikePark = void 0;
const Review_1 = __importDefault(require("../models/Review"));
// Get reviews for a bike park
const getReviewsByBikePark = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const reviews = await Review_1.default.find({ bikeParkId })
            .populate('userId', 'id username profileImageUrl')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ message: 'Error getting reviews', error });
    }
};
exports.getReviewsByBikePark = getReviewsByBikePark;
// Create a new review
const createReview = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { bikeParkId } = req.params;
        const { rating, comment } = req.body;
        // Check if user already reviewed this bike park
        const existingReview = await Review_1.default.findOne({
            userId,
            bikeParkId,
        });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this bike park' });
        }
        const newReview = await Review_1.default.create({
            userId,
            bikeParkId,
            rating,
            comment,
        });
        const reviewWithUser = await Review_1.default.findById(newReview._id)
            .populate('userId', 'id username profileImageUrl');
        res.status(201).json({
            message: 'Review created successfully',
            review: reviewWithUser,
        });
    }
    catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating review', error });
    }
};
exports.createReview = createReview;
// Update a review
const updateReview = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const review = await Review_1.default.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Check if user owns the review
        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }
        const updatedReview = await Review_1.default.findByIdAndUpdate(reviewId, { rating, comment }, { new: true }).populate('userId', 'id username profileImageUrl');
        res.status(200).json({
            message: 'Review updated successfully',
            review: updatedReview,
        });
    }
    catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Error updating review', error });
    }
};
exports.updateReview = updateReview;
// Delete a review
const deleteReview = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { reviewId } = req.params;
        const review = await Review_1.default.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Check if user owns the review
        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }
        await Review_1.default.findByIdAndDelete(reviewId);
        res.status(200).json({
            message: 'Review deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review', error });
    }
};
exports.deleteReview = deleteReview;
