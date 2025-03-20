import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
  category: string;
  disciplines: string[];
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  price: {
    amount: number;
    currency: string;
  };
  prizes: {
    totalAmount: number;
    currency: string;
    distribution: Array<{
      place: number;
      amount: number;
    }>;
  };
  sponsors: string[];
  contact: {
    email: string;
    phone: string;
  };
  bikePark: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Race', 'Festival', 'Training', 'Competition']
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled']
  },
  category: {
    type: String,
    required: true,
    enum: ['Professional', 'Amateur', 'All Levels']
  },
  disciplines: [{
    type: String,
    required: true
  }],
  registrationDeadline: {
    type: Date,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  prizes: {
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    distribution: [{
      place: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }]
  },
  sponsors: [{
    type: String
  }],
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  bikePark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BikePark',
    required: true
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

// Add text index for search functionality
eventSchema.index({ 
  name: 'text',
  description: 'text',
  location: 'text'
});

// Update timestamps on save
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Event = mongoose.model<IEvent>('Event', eventSchema); 