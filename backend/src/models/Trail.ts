import mongoose, { Schema, Document } from 'mongoose';

interface ITrail extends Document {
  bikeParkId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  length: number; // in meters
  elevationGain?: number; // in meters
  hasJumps: boolean;
  hasDrops: boolean;
  isTechnical: boolean;
  isFlowTrail: boolean;
  gpxTrack?: string; // URL to GPX track file
  imageUrl?: string;
}

const trailSchema = new Schema<ITrail>({
  bikeParkId: {
    type: Schema.Types.ObjectId,
    ref: 'BikePark',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  elevationGain: Number,
  hasJumps: {
    type: Boolean,
    default: false
  },
  hasDrops: {
    type: Boolean,
    default: false
  },
  isTechnical: {
    type: Boolean,
    default: false
  },
  isFlowTrail: {
    type: Boolean,
    default: false
  },
  gpxTrack: String,
  imageUrl: String
}, {
  timestamps: true
});

export default mongoose.model<ITrail>('Trail', trailSchema); 