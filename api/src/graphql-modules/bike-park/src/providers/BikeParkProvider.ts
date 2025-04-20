import { GraphQLError } from 'graphql';
import { WeatherService } from '../../../../services/weatherService.js';
import { ApprovedStatus, BikeParkFilter, CreateBikeParkInput } from '../../../../core/generated-models.js';
import { ReviewModel } from '../../../review/src/models/ReviewModel.js';
import { BikeParkModel } from '../models/BikeParkModel.js';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { finished } from 'stream/promises';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { AuthContext } from '../../../../utils/auth.js';

const DEFAULT_RESULTS_PER_PAGE = 15;
const WEATHER_UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes
const DEFAULT_SEARCH_RADIUS_KM = 500;

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

      // Build aggregation pipeline
      const pipeline: any[] = [
        {
          $match: {
            approvedStatus: { $nin: [ApprovedStatus.REJECTED, ApprovedStatus.WAITING_FOR_APPROVAL] },
          },
        },
      ];

      if (filter) {
        // Text search for location or name
        if (filter.location) {
          pipeline.push({
            $match: { location: { $regex: filter.location, $options: 'i' } },
          });
        }
        if (filter.name) {
          pipeline.push({
            $match: { name: { $regex: filter.name, $options: 'i' } },
          });
        }

        // Exact match for difficulty
        if (filter.difficulty && filter.difficulty !== 'all') {
          pipeline.push({
            $match: { difficulty: filter.difficulty },
          });
        }

        // Features filter - match any of the provided features
        if (filter.features && filter.features.length > 0 && !filter.features.includes('All')) {
          pipeline.push({
            $match: { features: { $all: filter.features } },
          });
        }

        // Amenities filter - match all provided facilities
        if (filter.facilities && filter.facilities.length > 0) {
          pipeline.push({
            $match: { facilities: { $all: filter.facilities } },
          });
        }

        // Sort order
        if (filter.sortBy) {
          if (filter.sortBy === 'rating') {
            pipeline.push({
              $lookup: {
                from: 'reviews', // Assuming the reviews collection is named 'reviews'
                localField: '_id',
                foreignField: 'bikePark',
                as: 'reviews',
              },
            });
            pipeline.push({
              $addFields: {
                averageRating: {
                  $cond: {
                    if: { $gt: [{ $size: '$reviews' }, 0] },
                    then: { $avg: '$reviews.rating' },
                    else: 0,
                  },
                },
              },
            });
            pipeline.push({ $sort: { averageRating: -1 } });
          }
        }
      }

      // Special handling for location-based search with coordinates
      if (filter?.coordinates) {
        const { latitude, longitude, radius = DEFAULT_SEARCH_RADIUS_KM } = filter.coordinates;

        pipeline.push({
          $addFields: {
            distance: {
              $multiply: [
                6371, // Earth's radius in km
                {
                  $acos: {
                    $add: [
                      {
                        $multiply: [
                          { $sin: { $degreesToRadians: latitude } },
                          { $sin: { $degreesToRadians: '$coordinates.latitude' } },
                        ],
                      },
                      {
                        $multiply: [
                          { $cos: { $degreesToRadians: latitude } },
                          { $cos: { $degreesToRadians: '$coordinates.latitude' } },
                          { $cos: { $subtract: [{ $degreesToRadians: '$coordinates.longitude' }, { $degreesToRadians: longitude }] } },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        });

        pipeline.push({
          $match: {
            distance: { $lte: radius },
          },
        });

        if (filter.sortBy === 'distance') {
          pipeline.push({ $sort: { distance: 1 } });
        }
      }

      // Pagination
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: take });

      console.log(pipeline);

      // Count total documents
      const countPipeline = [...pipeline];
      countPipeline.pop(); // Remove $skip and $limit for count
      countPipeline.pop();
      countPipeline.push({ $count: 'totalCount' });

      const [bikeParks, countResult] = await Promise.all([
        BikeParkModel.aggregate(pipeline),
        BikeParkModel.aggregate(countPipeline),
      ]);

      const totalCount = countResult[0]?.totalCount || 0;
      const totalPages = Math.ceil(totalCount / take);
      const hasNextPage = skip + take < totalCount;

      return {
        bikeParks: bikeParks?.map(park => ({ ...park, id: park._id })),
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
  async createBikePark(data: CreateBikeParkInput, currentUser: AuthContext) {
    try {
      if (!currentUser?.user) {
        throw new GraphQLError('User is not authenticated!');
      }

      if (!data.name) {
        throw new GraphQLError('Name is required');
      }

      if (!data.location) {
        throw new GraphQLError('Location is required');
      }

      if (!data.coordinates || !data.coordinates.latitude || !data.coordinates.longitude) {
        throw new GraphQLError('Coordinates (latitude and longitude) are required');
      }

      // Create the bike park with proper timestamps
      const bikePark = new BikeParkModel({
        ...data,
        createdBy: currentUser.user?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(currentUser.user.role === "admin" ? { approvedStatus: ApprovedStatus.APPROVED } : { approvedStatus: ApprovedStatus.WAITING_FOR_APPROVAL })
      });

      // Log the bike park data before saving for debugging
      console.log("Creating bike park with data:", JSON.stringify(bikePark, null, 2));

      await bikePark.save();
      return bikePark;
    } catch (error: any) {
      console.error("Error creating bike park:", error);

      // Provide more specific error messages for validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors)
          .map((err: any) => err.message)
          .join(', ');
        throw new GraphQLError(`Validation error: ${validationErrors}`);
      }

      throw new GraphQLError(`Error creating bike park: ${error.message}`);
    }
  }

  /**
   * Update an existing bike park
   */
  async updateBikePark(id: string, input: any, currentUser: AuthContext) {
    try {
      const bikePark = await BikeParkModel.findById(id);
      if (!bikePark) {
        throw new GraphQLError('Bike park not found');
      }

      // Check if user is admin or creator
      if (currentUser.user?.role !== 'admin' || bikePark.createdBy && bikePark.createdBy.toString() !== currentUser.user?.id) {
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
  async deleteBikePark(id: string, currentUser: AuthContext) {
    try {
      const bikePark = await BikeParkModel.findById(id);
      if (!bikePark) {
        throw new GraphQLError('Bike park not found');
      }

      // Check if user is admin or creator
      if (currentUser.user?.role !== 'admin' || bikePark.createdBy && bikePark.createdBy.toString() !== currentUser.user?.id) {
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

  async getMostCommonFeatures(limit?: number) {
    const aggregation: any[] = [
      { $unwind: '$features' },
      { $group: { _id: '$features', docs: { $addToSet: '$_id' } } },
      { $project: { feature: '$_id', count: { $size: '$docs' } } },
      { $sort: { count: -1 } },
    ];

    if (limit) {
      aggregation.push({ $limit: limit });
    }

    const result = await BikeParkModel.aggregate(aggregation);

    return result?.map(({ _id }) => (_id))
  }

  async getMostCommonFacilities(limit?: number) {
    const aggregation: any[] = [
      { $unwind: '$facilities' },
      { $group: { _id: '$facilities', docs: { $addToSet: '$_id' } } },
      { $project: { feature: '$_id', count: { $size: '$docs' } } },
      { $sort: { count: -1 } },
    ];

    if (limit) {
      aggregation.push({ $limit: limit });
    }

    const result = await BikeParkModel.aggregate(aggregation);

    return result?.map(({ _id }) => (_id))
  }

  async getMostCommonRules(limit?: number) {
    const aggregation: any[] = [
      { $unwind: '$rules' },
      { $group: { _id: '$rules', docs: { $addToSet: '$_id' } } },
      { $project: { feature: '$_id', count: { $size: '$docs' } } },
      { $sort: { count: -1 } },
    ];

    if (limit) {
      aggregation.push({ $limit: limit });
    }

    const result = await BikeParkModel.aggregate(aggregation);

    return result?.map(({ _id }) => (_id))
  }

  /**
   * Upload an image to AWS S3 or local storage
   */
  async uploadImage(file: any) {
    try {
      // Check if AWS S3 credentials are configured
      const useS3 = process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY &&
        process.env.S3_BUCKET;

      if (useS3) {
        // Configure AWS SDK
        AWS.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION || 'us-east-1'
        });

        const s3 = new AWS.S3();

        // Generate a unique key for the file
        const fileExtension = path.extname(file.name);
        const key = `uploads/${uuidv4()}${fileExtension}`;
        const blob = new Blob(file.blobParts, { type: file.type });
        const buffer = await blob.arrayBuffer();
        const stream = Readable.from(Buffer.from(buffer));

        // Upload to S3
        const uploadParams = {
          Bucket: process.env.S3_BUCKET as string,
          Key: key,
          Body: stream,
          ContentType: file.type
        };

        const result = await s3.upload(uploadParams).promise();

        return {
          url: result.Location,
          key: result.Key
        };
      } else {
        // Fallback to local storage if S3 is not configured
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate a unique filename
        const fileExtension = path.extname(filename);
        const uniqueFilename = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        // Save file to local storage
        const writeStream = createWriteStream(filePath);
        stream.pipe(writeStream);
        await finished(writeStream);

        // Generate URL for local file
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
        const fileUrl = `${baseUrl}/uploads/${uniqueFilename}`;

        return {
          url: fileUrl,
          key: uniqueFilename
        };
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new GraphQLError(`Error uploading image: ${error.message}`);
    }
  }
}

export const bikeParkProvider = new BikeParkProvider();
