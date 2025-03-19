import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bikePark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BikePark',
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String
  }
});

export const Review = mongoose.model('Review', reviewSchema); 