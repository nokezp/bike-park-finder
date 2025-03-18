import 'dotenv/config';
import mongoose from 'mongoose';
import { seedUsers } from './users.js';
import { seedBikeParks } from './bikeParks.js';
import { seedTrails } from './trails.js';
import { seedEvents } from './events.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder';

async function seed() {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Database cleared');

    // Seed users
    console.log('🌱 Seeding users...');
    const adminUser = await seedUsers();
    console.log('✅ Users seeded');

    // Seed bike parks
    console.log('🌱 Seeding bike parks...');
    const bikeParks = await seedBikeParks(adminUser.id);
    console.log('✅ Bike parks seeded');

    // Seed trails
    console.log('🌱 Seeding trails...');
    await seedTrails(bikeParks);
    console.log('✅ Trails seeded');

    // Seed events
    console.log('🌱 Seeding events...');
    await seedEvents(bikeParks);
    console.log('✅ Events seeded');

    console.log('✨ All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed(); 