import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  bikeParkId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  eventType: 'competition' | 'maintenance' | 'demo' | 'camp' | 'other';
  imageUrl?: string;
  externalUrl?: string;
}

const eventSchema = new Schema<IEvent>({
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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  eventType: {
    type: String,
    enum: ['competition', 'maintenance', 'demo', 'camp', 'other'],
    required: true
  },
  imageUrl: String,
  externalUrl: String
}, {
  timestamps: true
});

export default mongoose.model<IEvent>('Event', eventSchema); 