import mongoose from 'mongoose';
import { WeatherData } from '../services/weatherService.js';

// BikePark interface
export interface IBikePark extends mongoose.Document {
  name: string;
  description: string;
  location: string;
  features: string[];
  difficulty: string;
  rating?: number;
  reviews: mongoose.Types.ObjectId[];
  imageUrl?: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  facilities?: string[];
  rules?: string[];
  status?: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  weather?: {
    current: WeatherData;
    forecast: WeatherData[];
    lastUpdated: Date;
  };
}

// BikePark schema
const bikeParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  description: String,
  location: String,
  features: [String],
  difficulty: String,
  rating: Number,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  imageUrl: String,
  address: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  rules: [String],
  status: {
    type: String,
    default: 'active'
  },
  lastUpdated: String,
  updatedAt: String,
  weather: {
    current: mongoose.Schema.Types.Mixed,
    forecast: mongoose.Schema.Types.Mixed,
    lastUpdated: String
  }
});

export const BikePark = mongoose.model('BikePark', bikeParkSchema); 