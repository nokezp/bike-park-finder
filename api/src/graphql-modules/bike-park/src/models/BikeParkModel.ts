import mongoose from 'mongoose';
import { WeatherData } from '../../../../services/weatherService.js';
import { Contact, OpeningHours, SocialMedia } from '../../../../core/generated-models.js';

// BikePark interface
export interface IBikePark extends mongoose.Document {
  name: string;
  description?: string;
  location: string;
  features?: string[];
  difficulty: string;
  rating?: number;
  reviews?: mongoose.Types.ObjectId[];
  imageUrl?: string;
  address?: string;
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
  openingHours?: OpeningHours;
  contact?: Contact;
  socialMedia?: SocialMedia;
  weather?: {
    current: WeatherData;
    forecast: WeatherData[];
    lastUpdated: Date;
  };
  approvalStatus: string;
  isFavorite?: boolean;
}

// BikePark schema
const bikeParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'maintenance'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
  },
  features: [
    {
      type: String,
    },
  ],
  facilities: [
    {
      type: String,
    },
  ],
  openingHours: {
    monday: { from: String, to: String },
    tuesday: { from: String, to: String },
    wednesday: { from: String, to: String },
    thursday: { from: String, to: String },
    friday: { from: String, to: String },
    saturday: { from: String, to: String },
    sunday: { from: String, to: String },
  },
  contact: {
    phone: String,
    email: String,
    website: String,
  },
  prices: [{
    name: String,
    price: Number,
    currency: String,
  }],
  rules: [String],
  photos: [String],
  videos: [String],
  socialMedia: {
    facebook: String,
    instagram: String,
    youtube: String,
  },
  weather: {
    current: {
      temperature: Number,
      feelsLike: Number,
      humidity: Number,
      windSpeed: Number,
      description: String,
      icon: String,
      precipitation: Number,
      uvIndex: Number,
    },
    forecast: [
      {
        date: Number,
        temperature: Number,
        feelsLike: Number,
        humidity: Number,
        windSpeed: Number,
        description: String,
        icon: String,
        precipitation: Number,
        uvIndex: Number,
      },
    ],
    lastUpdated: Date,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  approvalStatus: String
});

// Add text index for search functionality
bikeParkSchema.index({
  name: 'text',
  description: 'text',
  location: 'text',
});

// Update timestamps on save
bikeParkSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const BikeParkModel = mongoose.model('BikePark', bikeParkSchema);
