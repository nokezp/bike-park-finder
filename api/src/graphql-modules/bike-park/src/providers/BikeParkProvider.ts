import { GraphQLError } from 'graphql';
import { WeatherService } from '../../../../services/weatherService.js';
import { BikeParkFilter } from '../../../../core/generated-models.js';
import { ReviewModel } from '../../../review/src/models/ReviewModel.js';
import { BikeParkModel } from '../models/BikeParkModel.js';

const DEFAULT_RESULTS_PER_PAGE = 15;
const WEATHER_UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes
const DEFAULT_SEARCH_RADIUS_KM = 50;

export class BikeParkProvider {
  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  /**
   * Get bike parks with filtering and pagination
   */
  async getBikeParks(filter?: BikeParkFilter) {
    try {
      const skip = filter?.skip ?? 0;
      const take = filter?.take ?? DEFAULT_RESULTS_PER_PAGE;

      // Build filter query
      const query: any = {};
      let sort: any = { createdAt: -1 }; // Default sort
      if (filter) {
        // Text search for location or name
        if (filter.location) {
          query.location = { $regex: filter.location, $options: 'i' };
        }
        if (filter.name) {
          query.name = { $regex: filter.name, $options: 'i' };
        }

        // Exact match for difficulty
        if (filter.difficulty && filter.difficulty !== 'All') {
          query.difficulty = filter.difficulty;
        }

        // Features filter - match any of the provided features
        if (filter.features && filter.features.length > 0 && !filter.features.includes('All')) {
          query.features = { $in: filter.features };
        }

        // Amenities filter - match all provided facilities
        if (filter.facilities && filter.facilities.length > 0) {
          query.facilities = { $all: filter.facilities };
        }

        // Sort order
        if (filter.sortBy) {
          if (filter.sortBy === 'Rating') {
            sort = { rating: -1 };
          } else if (filter.sortBy === 'Name') {
            sort = { name: 1 };
          }
          // Distance sorting will be handled after database query
        }
      }

      // Fetch parks without pagination first if coordinates search is used
      let bikeParks;
      let totalCount;

      // Special handling for location-based search with coordinates
      if (filter?.coordinates) {
        // Get all matching parks first
        bikeParks = await BikeParkModel.find(query).sort(sort);

        // Filter by distance
        const { latitude, longitude, radius = DEFAULT_SEARCH_RADIUS_KM } = filter.coordinates;

        bikeParks = bikeParks.filter((park) => {
          if (!park.coordinates || !park.coordinates.latitude || !park.coordinates.longitude) {
            return false;
          }

          const distance = this.calculateDistance(
            latitude, 
            longitude, 
            park.coordinates.latitude, 
            park.coordinates.longitude
          );

          // Add distance to park object for sorting
          (park as any).distance = distance;

          // Include only parks within radius
          return distance <= (radius ?? 0);
        });

        // Sort by distance if required
        if (filter.sortBy === 'Distance') {
          bikeParks.sort((a: any, b: any) => a.distance - b.distance);
        }

        totalCount = bikeParks.length;

        // Apply pagination manually
        bikeParks = bikeParks.slice(skip, skip + take);
      } else {
        // Regular database query with pagination
        totalCount = await BikeParkModel.countDocuments(query);
        bikeParks = await BikeParkModel.find(query).skip(skip).limit(take).sort(sort);
      }

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / take);
      const hasNextPage = skip < totalPages;

      return {
        bikeParks,
        totalCount,
        currentPage: skip,
        totalPages,
        hasNextPage,
      };
    } catch (error: any) {
      throw new GraphQLError(`Error fetching bike parks: ${error.message}`);
    }
  }

  /**
   * Get a single bike park by ID
   */
  async getBikeParkById(id: string) {
    try {
      const bikePark = await BikeParkModel.findById(id);
      if (!bikePark) {
        throw new GraphQLError('Bike park not found');
      }
      return bikePark;
    } catch (error: any) {
      throw new GraphQLError(`Error fetching bike park: ${error.message}`);
    }
  }

  /**
   * Search bike parks by query string
   */
  async searchBikeParks(query: string) {
    try {
      const bikeParks = await BikeParkModel.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      }).limit(10);
      return bikeParks;
    } catch (error: any) {
      throw new GraphQLError(`Error searching bike parks: ${error.message}`);
    }
  }

  /**
   * Get bike parks by viewport coordinates
   */
  async getBikeParksByViewport(
    viewport: {
      northEast: { latitude: number; longitude: number };
      southWest: { latitude: number; longitude: number };
    },
    searchQuery?: string
  ) {
    try {
      let query: any = {};
      const coord = {
        'coordinates.latitude': {
          $gte: viewport.southWest.latitude,
          $lte: viewport.northEast.latitude,
        },
        'coordinates.longitude': {
          $gte: viewport.southWest.longitude,
          $lte: viewport.northEast.longitude,
        },
      };

      if (searchQuery) {
        query = { location: { $regex: searchQuery, $options: 'i' } };
      } else {
        query = coord;
      }

      const bikeParks = await BikeParkModel.find(query);
      return bikeParks;
    } catch (error: any) {
      console.error('Error fetching bike parks by viewport:', error);
      throw new Error('Failed to fetch bike parks');
    }
  }

  /**
   * Create a new bike park
   */
  async createBikePark(data: any, userId: string) {
    try {
      const bikePark = new BikeParkModel({
        ...data,
        createdBy: userId,
      });
      await bikePark.save();
      return bikePark;
    } catch (error: any) {
      throw new GraphQLError(`Error creating bike park: ${error.message}`);
    }
  }

  /**
   * Update an existing bike park
   */
  async updateBikePark(id: string, input: any, userId: string, userRole: string) {
    try {
      const bikePark = await BikeParkModel.findById(id);
      if (!bikePark) {
        throw new GraphQLError('Bike park not found');
      }

      // Check if user is admin or creator
      if (userRole !== 'admin' && bikePark.createdBy && bikePark.createdBy.toString() !== userId) {
        throw new GraphQLError('Not authorized to update this bike park');
      }

      Object.assign(bikePark, input);
      await bikePark.save();
      return bikePark;
    } catch (error: any) {
      throw new GraphQLError(`Error updating bike park: ${error.message}`);
    }
  }

  /**
   * Delete a bike park
   */
  async deleteBikePark(id: string, userId: string, userRole: string) {
    try {
      const bikePark = await BikeParkModel.findById(id);
      if (!bikePark) {
        throw new GraphQLError('Bike park not found');
      }

      // Check if user is admin or creator
      if (userRole !== 'admin' && bikePark.createdBy && bikePark.createdBy.toString() !== userId) {
        throw new GraphQLError('Not authorized to delete this bike park');
      }

      await bikePark.deleteOne();
      return true;
    } catch (error: any) {
      throw new GraphQLError(`Error deleting bike park: ${error.message}`);
    }
  }

  /**
   * Get weather for a bike park
   */
  async getBikeParkWeather(bikePark: any) {
    try {
      // Check if weather data needs to be updated
      const now = new Date();
      const lastUpdate = bikePark.weather?.lastUpdated || new Date(0);
      const needsUpdate = now.getTime() - lastUpdate.getTime() > WEATHER_UPDATE_INTERVAL;

      if (!needsUpdate && bikePark.weather) {
        return bikePark.weather;
      }

      if (!bikePark.coordinates?.latitude || !bikePark.coordinates?.longitude) {
        return null;
      }

      // Fetch new weather data
      const [current, forecast] = await Promise.all([
        WeatherService.getCurrentWeather(bikePark.coordinates.latitude, bikePark.coordinates.longitude),
        WeatherService.getForecast(bikePark.coordinates.latitude, bikePark.coordinates.longitude),
      ]);

      // Update bike park with new weather data
      const updatedBikePark = await BikeParkModel.findByIdAndUpdate(
        bikePark._id,
        {
          weather: {
            current,
            forecast,
            lastUpdated: now,
          },
        },
        { new: true },
      );

      if (!updatedBikePark) {
        console.error('Failed to update bike park with weather data');
        throw new GraphQLError('Failed to update bike park weather');
      }

      return updatedBikePark.weather;
    } catch (error: any) {
      console.error(`Error in weather resolver for bike park ${bikePark._id}:`, error);
      return null;
    }
  }

  /**
   * Calculate rating for a bike park
   */
  async calculateBikeParkRating(bikePark: any) {
    try {
      if (!bikePark.reviews || bikePark.reviews.length === 0) {
        return 0;
      }

      const reviews = await ReviewModel.find({ bikePark: Object(bikePark.id) });
      const reviewRatings = reviews?.map((review) => review.rating);
      const totalRating = reviewRatings.reduce((sum: number, rating: number) => sum + rating, 0);
      const averageRating = totalRating / reviewRatings.length;
      
      return Number(averageRating.toFixed(1));
    } catch (error: any) {
      console.error(`Error calculating rating for bike park ${bikePark._id}:`, error);
      return 0;
    }
  }

  /**
   * Get reviews for a bike park
   */
  async getBikeParkReviews(bikePark: any) {
    try {
      const reviews = await ReviewModel.find({ bikePark: Object(bikePark.id) });
      return reviews;
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
}

export const bikeParkProvider = new BikeParkProvider();
