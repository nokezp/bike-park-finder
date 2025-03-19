import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../models/index.js';
import { BikePark } from '../models/BikePark.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder';

async function generateMockDb() {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      BikePark.deleteMany({}),
    ]);
    console.log('✅ Database cleared');

    // Generate users
    console.log('👥 Generating users...');
    const adminUser = new User({
      username: 'admin',
      email: 'admin@bikepark.com',
      password: 'Admin123!',
      name: 'Admin User',
      role: 'admin'
    });

    const regularUser = new User({
      username: 'user',
      email: 'user@example.com',
      password: 'User123!',
      name: 'Regular User',
      role: 'user'
    });

    await Promise.all([
      adminUser.save(),
      regularUser.save()
    ]);
    console.log('✅ Users generated');

    // Generate bike parks
    console.log('🏔️ Generating bike parks...');
    const bikeParks = [
      {
        name: 'Whistler Mountain Bike Park',
        description: 'World-renowned bike park featuring over 70 trails across 4 mountain zones',
        location: 'Whistler, British Columbia, Canada',
        coordinates: {
          latitude: 50.1163,
          longitude: -122.9574
        },
        difficulty: 'easy',
        features: ['jumps', 'drops', 'berms', 'technical', 'flow trails', 'wooden features'],
        amenities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop', 'lift access'],
        createdBy: adminUser._id
      },
      {
        name: 'Highland Mountain Bike Park',
        description: 'Dedicated lift-access mountain bike park with progression-based trails',
        location: 'Northfield, New Hampshire, USA',
        coordinates: {
          latitude: 43.4505,
          longitude: -71.6163
        },
        difficulty: 'medium',
        features: ['jumps', 'drops', 'berms', 'flow trails', 'skills area'],
        amenities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop'],
        createdBy: adminUser._id
      },
      {
        name: 'Bike Park Wales',
        description: 'The UK\'s premier mountain bike park with trails for all abilities',
        location: 'Merthyr Tydfil, Wales, UK',
        coordinates: {
          latitude: 51.7397,
          longitude: -3.3812
        },
        difficulty: 'hard',
        features: ['jumps', 'drops', 'berms', 'technical', 'flow trails'],
        amenities: ['parking', 'bike rentals', 'lessons', 'cafe', 'bike shop', 'uplift service'],
        createdBy: adminUser._id
      }
    ];

    const createdBikeParks = await BikePark.create(bikeParks);
    console.log('✅ Bike parks generated');

    // Generate trails
    console.log('🚲 Generating trails...');
    const trails = createdBikeParks.flatMap(bikePark => {
      if (bikePark.name === 'Whistler Mountain Bike Park') {
        return [
          {
            name: 'A-Line',
            description: 'Whistler\'s most famous jump trail, featuring perfectly sculpted tabletops',
            difficulty: 'advanced',
            length: 3.4,
            elevation: 375,
            features: ['jumps', 'berms', 'flow'],
            status: 'open',
            bikeParkId: bikePark._id
          },
          {
            name: 'B-Line',
            description: 'A beginner-friendly flow trail perfect for learning',
            difficulty: 'beginner',
            length: 2.8,
            elevation: 325,
            features: ['berms', 'flow', 'small jumps'],
            status: 'open',
            bikeParkId: bikePark._id
          }
        ];
      }
      if (bikePark.name === 'Highland Mountain Bike Park') {
        return [
          {
            name: 'Happy Hour',
            description: 'A flowy intermediate jump trail',
            difficulty: 'intermediate',
            length: 1.2,
            elevation: 200,
            features: ['jumps', 'berms', 'flow'],
            status: 'open',
            bikeParkId: bikePark._id
          },
          {
            name: 'NE Style',
            description: 'Technical trail with rocks and roots',
            difficulty: 'advanced',
            length: 0.8,
            elevation: 180,
            features: ['technical', 'rocks', 'roots'],
            status: 'open',
            bikeParkId: bikePark._id
          }
        ];
      }
      if (bikePark.name === 'Bike Park Wales') {
        return [
          {
            name: 'Terry\'s Belly',
            description: 'Fast and flowy red trail with big berms',
            difficulty: 'intermediate',
            length: 2.1,
            elevation: 250,
            features: ['berms', 'flow', 'jumps'],
            status: 'open',
            bikeParkId: bikePark._id
          },
          {
            name: 'Dai Hard',
            description: 'Technical black trail with challenging features',
            difficulty: 'expert',
            length: 1.5,
            elevation: 220,
            features: ['technical', 'drops', 'rock gardens'],
            status: 'open',
            bikeParkId: bikePark._id
          }
        ];
      }
      return [];
    });

    console.log('✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

generateMockDb(); 