import { Context } from '../types';
import { GraphQLError } from 'graphql';
import { WeatherService } from '../services/weatherService.js';
import { BikePark } from '../models/BikePark.js';
import { Document } from 'mongoose';
import { AuthContext } from '../utils/auth.js';
import { Event } from '../models/Event.js';

interface EventFilter {
  search?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

interface CreateEventInput {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  capacity: number;
  registrationEndDate: string;
  featured?: boolean;
  organizer: {
    name: string;
    description: string;
    imageUrl: string;
  };
  schedule: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  venue: {
    name: string;
    address: string;
    mapImageUrl: string;
  };
}

interface UpdateEventInput extends Partial<CreateEventInput> {}

export const eventResolvers = {
  Query: {
    events: async (_: any, { filter }: { filter?: EventFilter }) => {
      try {
        const query: any = {};

        if (filter) {
          if (filter.search) {
            query.$text = { $search: filter.search };
          }
          if (filter.category) {
            query.category = filter.category;
          }
          if (filter.location) {
            query.location = { $regex: filter.location, $options: 'i' };
          }
          if (filter.startDate) {
            query.date = { $gte: filter.startDate };
          }
          if (filter.endDate) {
            query.date = { ...query.date, $lte: filter.endDate };
          }
          if (filter.minPrice !== undefined) {
            query.price = { $gte: filter.minPrice };
          }
          if (filter.maxPrice !== undefined) {
            query.price = { ...query.price, $lte: filter.maxPrice };
          }
          if (filter.featured !== undefined) {
            query.featured = filter.featured;
          }
        }

        const events = await Event.find(query).sort({ date: 1 });
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Failed to fetch events');
      }
    },

    event: async (_: any, { id }: { id: string }) => {
      try {
        const event = await Event.findById(id);
        if (!event) {
          throw new Error('Event not found');
        }
        return event;
      } catch (error) {
        console.error('Error fetching event:', error);
        throw new Error('Failed to fetch event');
      }
    },
  },

  Mutation: {
    createEvent: async (_: any, { input }: { input: CreateEventInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }

        const event = new Event({
          ...input,
          availableTickets: input.capacity,
          attendeeCount: 0,
        });

        await event.save();
        return event;
      } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Failed to create event');
      }
    },

    updateEvent: async (_: any, { id, input }: { id: string; input: UpdateEventInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }

        const event = await Event.findById(id);
        if (!event) {
          throw new Error('Event not found');
        }

        // Update only the provided fields
        Object.assign(event, input);
        await event.save();

        return event;
      } catch (error) {
        console.error('Error updating event:', error);
        throw new Error('Failed to update event');
      }
    },

    deleteEvent: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }

        const event = await Event.findByIdAndDelete(id);
        if (!event) {
          throw new Error('Event not found');
        }

        return true;
      } catch (error) {
        console.error('Error deleting event:', error);
        throw new Error('Failed to delete event');
      }
    },

    registerForEvent: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }

        const event = await Event.findById(id);
        if (!event) {
          throw new Error('Event not found');
        }

        if (event.availableTickets <= 0) {
          throw new Error('No tickets available');
        }

        if (new Date(event.registrationEndDate) < new Date()) {
          throw new Error('Registration has ended');
        }

        // Update available tickets and attendee count
        event.availableTickets -= 1;
        event.attendeeCount += 1;
        await event.save();

        return event;
      } catch (error) {
        console.error('Error registering for event:', error);
        throw new Error('Failed to register for event');
      }
    },
  },
}; 