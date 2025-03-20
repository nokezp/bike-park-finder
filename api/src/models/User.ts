import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User interface
export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profile: {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Avatar URL must be a valid URL'
      }
    },
    bio: {
      type: String,
      maxlength: 500
    },
    location: {
      type: String,
      trim: true
    },
    preferences: {
      ridingStyle: [{
        type: String,
        enum: ['Downhill', 'Enduro', 'Freeride', 'Dirt Jump', 'Trail', 'Cross Country']
      }],
      skillLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Pro']
      },
      preferredBikeType: [{
        type: String,
        enum: ['Downhill', 'Enduro', 'Trail', 'Dirt Jump']
      }]
    }
  },
  stats: {
    totalRides: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    favoriteParks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BikePark'
    }],
    favoriteTrails: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trail'
    }]
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    youtube: String,
    strava: String
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    }
  },
  verified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
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
userSchema.index({ 
  username: 'text',
  'profile.firstName': 'text',
  'profile.lastName': 'text',
  'profile.location': 'text'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.updatedAt = new Date();
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export User model
export const User = mongoose.model<IUser>('User', userSchema); 