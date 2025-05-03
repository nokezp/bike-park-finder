import mongoose from 'mongoose';

export interface IStravaCredentials extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  stravaId: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
  tokenType: string;
  createdAt: Date;
  updatedAt: Date;
}

const stravaCredentialsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  stravaId: {
    type: Number,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamps on save
stravaCredentialsSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const StravaCredentialsModel = mongoose.model<IStravaCredentials>(
  'StravaCredentials',
  stravaCredentialsSchema
);
