import mongoose from 'mongoose';

export interface ITrail extends mongoose.Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  length: number;
  elevation: number;
  features: string[];
  status: 'open' | 'closed' | 'maintenance';
  bikeParkId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const trailSchema = new mongoose.Schema<ITrail>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    },
    length: {
      type: Number,
      required: true,
      min: 0,
    },
    elevation: {
      type: Number,
      required: true,
      min: 0,
    },
    features: [{
      type: String,
      required: true,
    }],
    status: {
      type: String,
      required: true,
      enum: ['open', 'closed', 'maintenance'],
      default: 'open',
    },
    bikeParkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BikePark',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text search index
trailSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 2, description: 1 } }
);

export const Trail = mongoose.model<ITrail>('Trail', trailSchema); 