import mongoose, { Schema, Document } from 'mongoose';

interface ICheckIn extends Document {
  userId: mongoose.Types.ObjectId;
  bikeParkId: mongoose.Types.ObjectId;
  note?: string;
  weatherCondition?: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  trailCondition?: 'dry' | 'wet' | 'muddy' | 'icy' | 'snowy' | 'perfect' | 'closed';
}

const checkInSchema = new Schema<ICheckIn>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  bikeParkId: { 
    type: Schema.Types.ObjectId, 
    ref: 'BikePark',
    required: true 
  },
  note: String,
  weatherCondition: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy']
  },
  trailCondition: {
    type: String,
    enum: ['dry', 'wet', 'muddy', 'icy', 'snowy', 'perfect', 'closed']
  }
}, {
  timestamps: true
});

export default mongoose.model<ICheckIn>('CheckIn', checkInSchema); 