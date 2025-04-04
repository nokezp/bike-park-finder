import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IStats {
  totalRides?: number;
  totalReviews?: number;
  favoriteParks?: mongoose.Types.ObjectId[];
  favoriteTrails?: mongoose.Types.ObjectId[];
}

interface INotifications {
  email: boolean
  push: boolean
}

interface ISocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  strava?: string;
}

interface IPreferences {
  ridingStyle?: string[];
  skillLevel?: string;
  preferredBikeType?: string[];
}

interface IProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  location?: string;
  preferences?: IPreferences;
  socialMedia?: ISocialMedia;
  notifications: boolean
}

// User interface
export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  prifile?: IProfile;
  stats?: IStats;
  notifications: INotifications
  lastLogin: string
  googleId?: string;
  isVerified: boolean
  resetPasswordToken?: string;
  resetPasswordExpire?: number;
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
    required: function (this: any): boolean {
      return !this.googleId;
    },
    minlength: 8
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
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
        validator: function (v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Avatar URL must be a valid URL'
      }
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
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Add text index for search functionality
userSchema.index({
  username: 'text',
  firstName: 'text',
  lastName: 'text',
  'profile.firstName': 'text',
  'profile.lastName': 'text',
  'profile.location': 'text'
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.updatedAt = new Date();
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Export User model
export const UserModel = mongoose.model<IUser>('User', userSchema);
