import mongoose, { Document, Schema } from 'mongoose';

export interface IBikePark extends Document {
  name: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  features: string[];
  amenities: string[];
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  images: string[];
  createdBy: mongoose.Types.ObjectId;
}

const bikeParkSchema = new Schema<IBikePark>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  features: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String,
    required: true
  }],
  hasLiftAccess: {
    type: Boolean,
    default: false
  },
  hasTechnicalSections: {
    type: Boolean,
    default: false
  },
  hasJumps: {
    type: Boolean,
    default: false
  },
  hasDrops: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String,
    default: []
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const BikePark = mongoose.model<IBikePark>('BikePark', bikeParkSchema); 