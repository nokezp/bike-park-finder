import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  bikeParkId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReview>({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String
}, {
  timestamps: true
});

export default mongoose.model<IReview>('Review', reviewSchema); 