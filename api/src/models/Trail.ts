import mongoose from 'mongoose';

export interface ITrail extends mongoose.Document {
  name: string;
  description: string;
  bikeParkId: mongoose.Schema.Types.ObjectId;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  type: 'downhill' | 'flow' | 'technical' | 'enduro' | 'jump' | 'skills';
  length: number;
  elevation: {
    gain: number;
    loss: number;
  };
  features: string[];
  status: 'open' | 'closed' | 'maintenance';
  conditions: {
    current: string;
    lastUpdated: Date;
  };
  rating: number;
  photos: string[];
  videos: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bikeParkId: { type: mongoose.Schema.Types.ObjectId, ref: 'BikePark', required: true },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'pro']
  },
  type: {
    type: String,
    required: true,
    enum: ['downhill', 'flow', 'technical', 'enduro', 'jump', 'skills']
  },
  length: { type: Number, required: true },
  elevation: {
    gain: { type: Number, required: true },
    loss: { type: Number, required: true }
  },
  features: [{ type: String }],
  status: {
    type: String,
    required: true,
    enum: ['open', 'closed', 'maintenance'],
    default: 'open'
  },
  conditions: {
    current: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  photos: [{ type: String }],
  videos: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add text index for search functionality
trailSchema.index({ 
  name: 'text',
  description: 'text'
});

// Update timestamps on save
trailSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Trail = mongoose.model<ITrail>('Trail', trailSchema); 