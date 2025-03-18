import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  name: string;
  description: string;
  date: Date;
  type: 'competition' | 'clinic' | 'social' | 'maintenance';
  status: 'scheduled' | 'cancelled' | 'completed';
  capacity: number;
  registrationDeadline: Date;
  bikeParkId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema<IEvent>(
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
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['competition', 'clinic', 'social', 'maintenance'],
    },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'cancelled', 'completed'],
      default: 'scheduled',
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    registrationDeadline: {
      type: Date,
      required: true,
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
eventSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 2, description: 1 } }
);

// Add index for querying upcoming events
eventSchema.index({ date: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema); 