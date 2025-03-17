import mongoose, { Schema, Document } from 'mongoose';

interface ITrail extends Document {
  bikeParkId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  capacity: number;
  type: 'shuttle' | 'gondola' | 'chairlift' | 'other';
  status: 'operational' | 'maintenance' | 'closed';
  operatingHours: string;
  imageUrl?: string;
  notes?: string;
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
  capacity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['shuttle', 'gondola', 'chairlift', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['operational', 'maintenance', 'closed'],
    required: true,
    default: 'operational'
  },
  operatingHours: {
    type: String,
    required: true
  },
  imageUrl: String,
  notes: String
}, {
  timestamps: true
});

export default mongoose.model<ITrail>('Trail', trailSchema); 