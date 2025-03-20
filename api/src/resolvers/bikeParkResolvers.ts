import { GraphQLError } from 'graphql';
import { WeatherService } from '../services/weatherService.js';
import { BikePark } from '../models/BikePark.js';
import { Document } from 'mongoose';
import { AuthContext } from '../utils/auth.js';

interface Context {
  user?: {
    id: string;
  };
}

interface CreateBikeParkInput {
  name: string;
  description?: string;
  location?: string;
  features?: string[];
  difficulty?: string;
  address?: string;
  coordinates?: { latitude: number; longitude: number };
  imageUrl?: string;
  openingHours?: { [key: string]: string };
  contact?: { phone?: string; email?: string };
  price?: { amount: number; currency: string };
  facilities?: string[];
  rules?: string[];
  photos?: string[];
  videos?: string[];
  website?: string;
  socialMedia?: { [key: string]: string };
  status?: string;
}

interface IBikePark {
  _id: string;
  name: string;
  createdBy?: string;
  createdAt?: string;
  [key: string]: any;
}

interface BikeParkFilter {
  location?: string;
  name?: string;
  difficulty?: string;
}

interface PaginationInput {
  page: number;
  limit: number;
}

const WEATHER_UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes

export const bikeParkResolvers = {
  Query: {
    bikeParks: async (
      _: unknown,
      { filter, pagination }: { filter?: BikeParkFilter; pagination: PaginationInput },
      context: AuthContext
    ) => {
      try {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        // Build filter query
        const query: any = {};
        if (filter) {
          if (filter.location) {
            query.location = { $regex: filter.location, $options: 'i' };
          }
          if (filter.name) {
            query.name = { $regex: filter.name, $options: 'i' };
          }
          if (filter.difficulty) {
            query.difficulty = filter.difficulty;
          }
        }

        // Get total count for pagination
        const totalCount = await BikePark.countDocuments(query);

        // Fetch paginated results
        const bikeParks = await BikePark.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;

        return {
          bikeParks,
          totalCount,
          currentPage: page,
          totalPages,
          hasNextPage
        };
      } catch (error: any) {
        throw new GraphQLError(`Error fetching bike parks: ${error.message}`);
      }
    },

    bikePark: async (_: unknown, { id }: { id: string }, context: AuthContext) => {
      try {
        const bikePark = await BikePark.findById(id);
        if (!bikePark) {
          throw new GraphQLError('Bike park not found');
        }
        return bikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error fetching bike park: ${error.message}`);
      }
    },

    searchBikeParks: async (_: unknown, { query }: { query: string }, context: AuthContext) => {
      try {
        const bikeParks = await BikePark.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }).limit(10);
        return bikeParks;
      } catch (error: any) {
        throw new GraphQLError(`Error searching bike parks: ${error.message}`);
      }
    }
  },

  Mutation: {
    createBikePark: async (
      _: unknown,
      args: any,
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const bikePark = new BikePark({
          ...args,
          createdBy: context.user.id
        });
        await bikePark.save();
        return bikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error creating bike park: ${error.message}`);
      }
    },

    updateBikePark: async (
      _: unknown,
      { id, input }: { id: string; input: any },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const bikePark = await BikePark.findById(id);
        if (!bikePark) {
          throw new GraphQLError('Bike park not found');
        }

        // Check if user is admin or creator
        if (context.user.role !== 'admin' && bikePark.createdBy && bikePark.createdBy.toString() !== context.user.id) {
          throw new GraphQLError('Not authorized to update this bike park');
        }

        Object.assign(bikePark, input);
        await bikePark.save();
        return bikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error updating bike park: ${error.message}`);
      }
    },

    deleteBikePark: async (
      _: unknown,
      { id }: { id: string },
      context: AuthContext
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const bikePark = await BikePark.findById(id);
        if (!bikePark) {
          throw new GraphQLError('Bike park not found');
        }

        // Check if user is admin or creator
        if (context.user.role !== 'admin' && bikePark.createdBy && bikePark.createdBy.toString() !== context.user.id) {
          throw new GraphQLError('Not authorized to delete this bike park');
        }

        await bikePark.deleteOne();
        return true;
      } catch (error: any) {
        throw new GraphQLError(`Error deleting bike park: ${error.message}`);
      }
    }
  },

  BikePark: {
    weather: async (bikePark: any) => {
      try {
        console.log('Weather resolver called for bike park:', bikePark._id);
        console.log('Bike park coordinates:', bikePark.coordinates);

        // Check if weather data needs to be updated
        const now = new Date();
        const lastUpdate = bikePark.weather?.lastUpdated || new Date(0);
        const needsUpdate = now.getTime() - lastUpdate.getTime() > WEATHER_UPDATE_INTERVAL;

        if (!needsUpdate && bikePark.weather) {
          console.log('Returning cached weather data');
          return bikePark.weather;
        }

        if (!bikePark.coordinates?.latitude || !bikePark.coordinates?.longitude) {
          console.log('No coordinates found for bike park');
          return null;
        }

        console.log('Fetching new weather data for coordinates:', bikePark.coordinates.latitude, bikePark.coordinates.longitude);
        
        // Fetch new weather data
        const [current, forecast] = await Promise.all([
          WeatherService.getCurrentWeather(bikePark.coordinates.latitude, bikePark.coordinates.longitude),
          WeatherService.getForecast(bikePark.coordinates.latitude, bikePark.coordinates.longitude)
        ]);

        console.log('Weather data fetched successfully');

        // Update bike park with new weather data
        const updatedBikePark = await BikePark.findByIdAndUpdate(
          bikePark._id,
          {
            weather: {
              current,
              forecast,
              lastUpdated: now
            }
          },
          { new: true }
        );

        if (!updatedBikePark) {
          console.error('Failed to update bike park with weather data');
          throw new GraphQLError('Failed to update bike park weather');
        }

        console.log('Weather data updated successfully');
        return updatedBikePark.weather;
      } catch (error: any) {
        console.error(`Error in weather resolver for bike park ${bikePark._id}:`, error);
        return null;
      }
    },
    rating: async (bikePark: any) => {
      try {
        if (!bikePark.reviews || bikePark.reviews.length === 0) {
          return 0;
        }
        
        const totalRating = bikePark.reviews.reduce((sum: number, review: any) => {
          return sum + (review.rating || 0);
        }, 0);
        
        const averageRating = totalRating / bikePark.reviews.length;
        return Number(averageRating.toFixed(1)); // Round to 1 decimal place
      } catch (error: any) {
        console.error(`Error calculating rating for bike park ${bikePark._id}:`, error);
        return 0;
      }
    }
  }
}; 