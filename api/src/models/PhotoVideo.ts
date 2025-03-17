import mongoose, { Schema, Document } from 'mongoose';

interface IPhotoVideo extends Document {
  userId: mongoose.Types.ObjectId;
  bikeParkId: mongoose.Types.ObjectId;
  trailId?: mongoose.Types.ObjectId;
  url: string;
  type: 'photo' | 'video';
  caption?: string;
}

const photoVideoSchema = new Schema<IPhotoVideo>({
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
  trailId: {
    type: Schema.Types.ObjectId,
    ref: 'Trail'
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  caption: String
}, {
  timestamps: true
});

export default mongoose.model<IPhotoVideo>('PhotoVideo', photoVideoSchema); 