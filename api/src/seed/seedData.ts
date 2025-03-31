import mongoose from 'mongoose';
import { EventModel } from '../graphql-modules/event/src/models/EventModel.js';
import { ReviewModel } from '../graphql-modules/review/src/models/ReviewModel.js';
import { UserModel } from '../graphql-modules/auth/src/models/UserModel.js';
import { TrailModel } from '../graphql-modules/trail/src/models/TrailModel.js';
import { BikeParkModel } from '../graphql-modules/bike-park/src/index.js';
import { bikeParksData } from './bikeParkSeedData.js';
import { eventsSeedData } from './eventSeedData.js';
import { usersSeedData } from './userSeedData.js';
import { reviewsSeedData } from './reviewSeedData.js';
import { trailsSeedData } from './trailSeedData.js';

export const seedDatabase = async (): Promise<void> => {
  try {
    // Clear existing data
    await Promise.all([ReviewModel.deleteMany({}), EventModel.deleteMany({}), TrailModel.deleteMany({}), BikeParkModel.deleteMany({}), UserModel.deleteMany({})]);

    // Create admin user first
    const adminUser = await UserModel.create({
      ...usersSeedData[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create regular user
    const regularUser = await UserModel.create({
      ...usersSeedData[1],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Insert all bike parks with admin user as creator
    const allBikeParks = bikeParksData;

    const createdBikeParks = await BikeParkModel.create(
      allBikeParks.map((park) => ({
        ...park,
        createdBy: adminUser._id,
      })),
    );

    // Create reviews distributed between users
    const reviews = [
      {
        ...reviewsSeedData[0],
        bikePark: createdBikeParks[0]._id,
        createdBy: adminUser._id,
        rideDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ...reviewsSeedData[1],
        bikePark: createdBikeParks[0]._id,
        createdBy: regularUser._id,
        rideDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const createdReviews = await ReviewModel.create(reviews);

    // Update bike park with reviews
    await BikeParkModel.findByIdAndUpdate(createdBikeParks[0]._id, { $push: { reviews: { $each: createdReviews.map((r) => r._id) } } });

    // Update user stats
    await Promise.all([
      UserModel.findByIdAndUpdate(adminUser._id, { 'profile.totalReviews': 1 }),
      UserModel.findByIdAndUpdate(regularUser._id, { 'profile.totalReviews': 1 }),
    ]);

    // Insert trails with references to bike parks
    const createdTrails = await TrailModel.create(
      trailsSeedData.map((trail) => {
        const bikePark = createdBikeParks.find((park) => park.name === trail.bikePark);
        const { bikePark: bikeParkName, ...trailWithoutBikePark } = trail;
        return {
          ...trailWithoutBikePark,
          bikeParkId: bikePark?._id,
          createdBy: adminUser._id,
        };
      }),
    );

    // Update bike parks with their trails
    await Promise.all(
      createdBikeParks.map(async (park) => {
        const parkTrails = createdTrails.filter((trail) => trail.bikeParkId?.toString() === park._id.toString());
        if (parkTrails.length > 0) {
          await BikeParkModel.findByIdAndUpdate(park._id, { $push: { trails: { $each: parkTrails.map((t) => t._id) } } });
        }
      }),
    );

    // Insert event with admin user as creator
    console.log('Inserting events data...');
    console.log('Events data sample:', JSON.stringify(eventsSeedData[0], null, 2));
    const events = await EventModel.insertMany(eventsSeedData);
    console.log(`Successfully inserted ${events.length} events`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
