import mongoose from 'mongoose';

export interface IScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface IOrganizer {
  name: string;
  description: string;
  imageUrl: string;
}

export interface IVenue {
  name: string;
  address: string;
  mapImageUrl: string;
}

export interface IEvent extends mongoose.Document {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: 'CHAMPIONSHIP' | 'WORKSHOP' | 'FESTIVAL' | 'GROUP_RIDE';
  price: number;
  imageUrl: string;
  description: string;
  capacity: number;
  registrationEndDate: string;
  availableTickets: number;
  attendeeCount: number;
  featured: boolean;
  organizer: IOrganizer;
  schedule: IScheduleItem[];
  venue: IVenue;
  createdAt: Date;
  updatedAt: Date;
}

const scheduleItemSchema = new mongoose.Schema<IScheduleItem>({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const organizerSchema = new mongoose.Schema<IOrganizer>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const venueSchema = new mongoose.Schema<IVenue>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mapImageUrl: { type: String, required: true }
});

const eventSchema = new mongoose.Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ['CHAMPIONSHIP', 'WORKSHOP', 'FESTIVAL', 'GROUP_RIDE'],
      required: true
    },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    registrationEndDate: { type: String, required: true },
    availableTickets: { type: Number, required: true },
    attendeeCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    organizer: { type: organizerSchema, required: true },
    schedule: [{ type: scheduleItemSchema, required: true }],
    venue: { type: venueSchema, required: true }
  },
  {
    timestamps: true
  }
);

// Add text search indexes
eventSchema.index({
  title: 'text',
  description: 'text',
  location: 'text',
  'venue.name': 'text',
  'venue.address': 'text'
});

// Add regular indexes for common queries
eventSchema.index({ category: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ registrationEndDate: 1 });
eventSchema.index({ price: 1 });

// export const Event = model<IEvent>('Event', eventSchema); 
export const Event = mongoose.model('Event', eventSchema); 
