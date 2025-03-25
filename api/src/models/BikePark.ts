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
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'closed', 'maintenance']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'expert']
  },
  features: [{
    type: String,
    required: true
  }],
  facilities: [{
    type: String,
    required: true
  }],
  openingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  contact: {
    phone: String,
    email: String
  },
  price: {
    amount: Number,
    currency: String
  },
  rules: [String],
  photos: [String],
  videos: [String],
  website: String,
  socialMedia: {
    facebook: String,
    instagram: String,
    youtube: String
  },
  weather: {
    current: {
      temperature: Number,
      conditions: String,
      windSpeed: Number,
      precipitation: Number
    },
    forecast: [{
      date: Date,
      temperature: Number,
      conditions: String,
      windSpeed: Number,
      precipitation: Number
    }],
    lastUpdated: Date
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
bikeParkSchema.index({ 
  name: 'text',
  description: 'text',
  location: 'text'
});

// Update timestamps on save
bikeParkSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const BikePark = mongoose.model('BikePark', bikeParkSchema); 