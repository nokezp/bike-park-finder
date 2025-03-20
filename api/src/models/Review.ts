import mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
  title: string;
  content: string;
  rating: number;
  difficulty: string;
  technicalRating: number;
  scenicRating: number;
  maintenanceRating: number;
  bikeUsed: string;
  rideDate: Date;
  conditions: {
    weather: string;
    trailCondition: string;
  };
  photos?: string[];
  videos?: string[];
  likes?: number;
  bikePark: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'pro']
  },
  technicalRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  scenicRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  maintenanceRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  bikeUsed: {
    type: String,
    required: true
  },
  rideDate: {
    type: Date,
    required: true
  },
  conditions: {
    weather: {
      type: String,
      required: true,
      enum: ['sunny', 'cloudy', 'rainy', 'snowy']
    },
    trailCondition: {
      type: String,
      required: true,
      enum: ['dry', 'wet', 'muddy', 'icy']
    }
  },
  photos: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  likes: {
    type: Number,
    default: 0
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

export const Review = mongoose.model<IReview>('Review', reviewSchema); 