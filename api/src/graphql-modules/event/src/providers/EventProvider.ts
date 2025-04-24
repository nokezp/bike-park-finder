import moment from 'moment';
import axios from 'axios';
import { ApprovalStatus, CategoryInfo, CreateEventInput, EventCategory, EventFilter, EventPeriod, UpdateEventInput } from '../../../../core/generated-models.js';
import { EventModel } from '../models/EventModel.js';
import { GraphQLError } from 'graphql';

export class EventProvider {
  /**
   * Get popular event categories
   */
  async getPopularEventCategories() {
    try {
      // Aggregate events by category and count them
      const categoryAggregation = await EventModel.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Map category enum values to display names and image URLs
      const categoryImages = {
        CHAMPIONSHIP: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1c67488712-b96b92d9e02e37aa4b55.png",
        WORKSHOP: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f1a3daef3b-9a5736df319c856fdac9.png",
        FESTIVAL: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5fb1a1b3d8-b126228684fdf6321e58.png",
        GROUP_RIDE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b914477774-20809743ba2b9bddaf9f.png",
        RACE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/race-category.jpg",
        ENDURO: "https://storage.googleapis.com/uxpilot-auth.appspot.com/enduro-category.jpg",
        DOWNHILL: "https://storage.googleapis.com/uxpilot-auth.appspot.com/downhill-category.jpg",
        CROSS_COUNTRY: "https://storage.googleapis.com/uxpilot-auth.appspot.com/cross-country-category.jpg",
        DIRT_JUMP: "https://storage.googleapis.com/uxpilot-auth.appspot.com/dirt-jump-category.jpg",
        CHARITY_RIDE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/charity-ride-category.jpg",
        DEMO_DAY: "https://storage.googleapis.com/uxpilot-auth.appspot.com/demo-day-category.jpg",
        TRAINING_CAMP: "https://storage.googleapis.com/uxpilot-auth.appspot.com/training-camp-category.jpg",
        MAINTENANCE_CLINIC: "https://storage.googleapis.com/uxpilot-auth.appspot.com/maintenance-clinic-category.jpg",
        NIGHT_RIDE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/night-ride-category.jpg",
        GRAVEL_RACE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gravel-race-category.jpg",
        BIKEPACKING_EVENT: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bikepacking-event-category.jpg",
        E_BIKE_EVENT: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e-bike-event-category.jpg",
        FUN_RIDE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fun-ride-category.jpg",
        FAMILY_RIDE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/family-ride-category.jpg",
        STAGE_RACE: "https://storage.googleapis.com/uxpilot-auth.appspot.com/stage-race-category.jpg"
      };

      const categoryNames = {
        CHAMPIONSHIP: "Races",
        WORKSHOP: "Workshops",
        FESTIVAL: "Festivals",
        GROUP_RIDE: "Group Rides",
        RACE: "Races",
        ENDURO: "Enduro",
        DOWNHILL: "Downhill",
        CROSS_COUNTRY: "Cross Country",
        DIRT_JUMP: "Dirt Jump",
        CHARITY_RIDE: "Charity Rides",
        DEMO_DAY: "Demo Days",
        TRAINING_CAMP: "Training Camps",
        MAINTENANCE_CLINIC: "Maintenance Clinics",
        NIGHT_RIDE: "Night Rides",
        GRAVEL_RACE: "Gravel Races",
        BIKEPACKING_EVENT: "Bikepacking Events",
        E_BIKE_EVENT: "E-Bike Events",
        FUN_RIDE: "Fun Rides",
        FAMILY_RIDE: "Family Rides",
        STAGE_RACE: "Stage Races"
      };

      const categories: CategoryInfo[] = categoryAggregation.map(category => ({
        name: EventCategory[category._id as keyof typeof categoryNames] || category._id,
        count: category.count,
        imageUrl: categoryImages[category._id as keyof typeof categoryImages] || ""
      }));

      return categories;
    } catch (error: any) {
      console.error('Error fetching popular event categories:', error);
      throw new Error('Failed to fetch popular event categories');
    }
  }

  /**
   * Get events with filtering
   */
  async getEvents(filter?: EventFilter) {
    try {
      let startDate, endDate;
      const now = moment().startOf("day"); // Current day at midnight
      const query: any = {};

      if (filter) {
        if (filter.title) {
          query.title = { $search: filter.title };
        }

        if (filter.category) {
          query.category = filter.category;
        }

        if (filter.location) {
          query.location = { $regex: filter.location, $options: 'i' };
        }

        if (filter.period !== EventPeriod.ALL) {
          switch (filter.period) {
            case EventPeriod.THIS_WEEK:
              startDate = now.clone().startOf("isoWeek");
              endDate = now.clone().endOf("isoWeek");
              break;
            case EventPeriod.THIS_MONTH:
              startDate = now.clone().startOf("month");
              endDate = now.clone().endOf("month");
              break;
            case EventPeriod.NEXT_MONTH:
              startDate = now.clone().add(1, "month").startOf("month");
              endDate = now.clone().add(1, "month").endOf("month");
              break;
          }

          query.date = { $gte: startDate?.toDate(), $lte: endDate?.toDate() };
        }
      }

      const events = await EventModel.find(query).sort({ date: -1 });
      return events;
    } catch (error: any) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  }

  /**
   * Get a single event by ID
   */
  async getEventById(id: string) {
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error: any) {
      console.error('Error fetching event:', error);
      throw new Error('Failed to fetch event');
    }
  }

  /**
   * Create a new event
   */
  async createEvent(input: CreateEventInput) {
    try {
      const event = new EventModel({
        ...input,
        availableTickets: input.capacity,
        attendeeCount: 0,
        createdAt: new Date(),
      });

      await event.save();
      return event;
    } catch (error: any) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  /**
   * Update an existing event
   */
  async updateEvent(id: string, input: UpdateEventInput) {
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        throw new Error('Event not found');
      }

      event.updatedAt = new Date();

      // Update only the provided fields
      Object.assign(event, input);
      await event.save();

      return event;
    } catch (error: any) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string) {
    try {
      const event = await EventModel.findByIdAndDelete(id);
      if (!event) {
        throw new Error('Event not found');
      }

      return true;
    } catch (error: any) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }

  /**
   * Register a user for an event
   */
  async registerForEvent(id: string) {
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        throw new Error('Event not found');
      }

      if (event.availableTickets <= 0) {
        throw new Error('No tickets available');
      }

      if (event.registrationEndDate < new Date()) {
        throw new Error('Registration has ended');
      }

      // Update available tickets and attendee count
      event.availableTickets -= 1;
      event.attendeeCount += 1;
      await event.save();

      return event;
    } catch (error: any) {
      console.error('Error registering for event:', error);
      throw new Error('Failed to register for event');
    }
  }

  /**
   * Get coordinates by location
   */
  async getCoordinatesByLocation(location: string) {
    try {
      // Use Mapbox Geocoding API to convert location string to coordinates
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=pk.eyJ1Ijoibm9rZXpwbmV3IiwiYSI6ImNtOGQya3BnZzFiZnkya3M1bWEzMzVuYXkifQ.rOk1OezputSSawqlWIMycQ`
      );

      if (response.data.features && response.data.features.length > 0) {
        const [longitude, latitude] = response.data.features[0].center;
        return { latitude, longitude };
      }

      return null;
    } catch (error: any) {
      console.error('Error geocoding location:', error);
      throw new Error('Failed to geocode location');
    }
  }

  /**
    * Get pending events for admin review
    */
  async getPendingEvents(status?: ApprovalStatus) {
    try {
      let query: any = {};

      if (status) {
        query.approvalStatus = status;
      }

      const events = await EventModel.find(query)
        .populate('createdBy')
        .sort({ createdAt: -1 });

      return events;
    } catch (error: any) {
      throw new GraphQLError(`Error fetching pending events: ${error.message}`);
    }
  }

  /**
   * Approve an event
   */
  async approveEvent(id: string) {
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        throw new GraphQLError('Event not found');
      }

      event.approvalStatus = ApprovalStatus.APPROVED;
      await event.save();
      return event;
    } catch (error: any) {
      throw new GraphQLError(`Error approving event: ${error.message}`);
    }
  }

  /**
   * Reject a event
   */
  async rejectEvent(id: string) {
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        throw new GraphQLError('Event not found');
      }

      event.approvalStatus = ApprovalStatus.REJECTED;
      await event.save();
      return event;
    } catch (error: any) {
      throw new GraphQLError(`Error rejecting event: ${error.message}`);
    }
  }
}

export const eventProvider = new EventProvider();
