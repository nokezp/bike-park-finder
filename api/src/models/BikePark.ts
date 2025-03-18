import mongoose from 'mongoose';

// Coordinates interface
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// BikePark interface
export interface IBikePark extends mongoose.Document {
  name: string;
  description?: string;
  location: string;
  coordinates?: Coordinates;
  difficulty?: string;
  features?: string[];
  amenities?: string[];
  hasLiftAccess?: boolean;
  hasTechnicalSections?: boolean;
  hasJumps?: boolean;
  hasDrops?: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// BikePark schema
const bikeParkSchema = new mongoose.Schema<IBikePark>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    features: [{
      type: String,
    }],
    amenities: [{
      type: String,
    }],
    hasLiftAccess: {
      type: Boolean,
      default: false,
    },
    hasTechnicalSections: {
      type: Boolean,
      default: false,
    },
    hasJumps: {
      type: Boolean,
      default: false,
    },
    hasDrops: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
bikeParkSchema.index(
  { name: 'text', description: 'text', location: 'text' },
  { weights: { name: 3, location: 2, description: 1 } }
);

// Export BikePark model
export const BikePark = mongoose.model<IBikePark>('BikePark', bikeParkSchema); 