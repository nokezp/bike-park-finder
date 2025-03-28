import mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
  title: string;
  comment: string;
  rating: number;
  bikePark: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  visitDate?: Date;
  trailDifficulty?: string;
  photos?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  bikePark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BikePark',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visitDate: {
    type: Date
  },
  trailDifficulty: {
    type: String
  },
  photos: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
reviewSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
