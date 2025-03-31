import 'dotenv/config';
import mongoose from 'mongoose';
import { seedUsers } from './users.js';
import { seedBikeParks } from './bikeParks.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder-mac';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    // Clear existing data
    await mongoose.connection?.db?.dropDatabase();
    // Seed users
    const adminUser = await seedUsers();
    // Seed bike parks
    const bikeParks: any = await seedBikeParks(adminUser.id);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed(); 