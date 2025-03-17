const mongoose = require('mongoose');

const bikeParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
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
  description: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'All Levels'],
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  website: {
    type: String,
    trim: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true
  },
  hours: {
    type: String,
    trim: true
  },
  pricing: {
    type: String,
    trim: true
  },
  hasLiftAccess: {
    type: Boolean,
    default: false
  },
  hasTechnicalSections: {
    type: Boolean,
    default: false
  },
  hasJumps: {
    type: Boolean,
    default: false
  },
  hasDrops: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Update the updatedAt field before saving
bikeParkSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create a text index for search functionality
bikeParkSchema.index({ 
  name: 'text', 
  location: 'text', 
  description: 'text',
  features: 'text',
  amenities: 'text'
});

const BikePark = mongoose.model('BikePark', bikeParkSchema);

module.exports = BikePark; 