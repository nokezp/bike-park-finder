import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../models/index.js';
import { BikePark } from '../models/index.js';
import { Trail } from '../models/index.js';
import { Event } from '../models/index.js';

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
      Trail.deleteMany({}),
      Event.deleteMany({})
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

    await Trail.create(trails);
    console.log('✅ Trails generated');

    // Generate events
    console.log('📅 Generating events...');
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const events = createdBikeParks.flatMap(bikePark => {
      if (bikePark.name === 'Whistler Mountain Bike Park') {
        return [
          {
            name: 'Crankworx Whistler',
            description: 'The ultimate mountain biking festival featuring competitions and demos',
            date: new Date(currentDate.getTime() + 30 * oneDay),
            type: 'competition',
            status: 'scheduled',
            capacity: 5000,
            registrationDeadline: new Date(currentDate.getTime() + 25 * oneDay),
            bikeParkId: bikePark._id
          },
          {
            name: 'Beginner Skills Clinic',
            description: 'Learn the basics of mountain biking with certified instructors',
            date: new Date(currentDate.getTime() + 7 * oneDay),
            type: 'clinic',
            status: 'scheduled',
            capacity: 20,
            registrationDeadline: new Date(currentDate.getTime() + 5 * oneDay),
            bikeParkId: bikePark._id
          }
        ];
      }
      if (bikePark.name === 'Highland Mountain Bike Park') {
        return [
          {
            name: 'Highland Throwdown',
            description: 'Annual slopestyle competition with pro riders',
            date: new Date(currentDate.getTime() + 45 * oneDay),
            type: 'competition',
            status: 'scheduled',
            capacity: 1000,
            registrationDeadline: new Date(currentDate.getTime() + 40 * oneDay),
            bikeParkId: bikePark._id
          }
        ];
      }
      if (bikePark.name === 'Bike Park Wales') {
        return [
          {
            name: 'Welsh Open',
            description: 'National downhill racing series round',
            date: new Date(currentDate.getTime() + 60 * oneDay),
            type: 'competition',
            status: 'scheduled',
            capacity: 200,
            registrationDeadline: new Date(currentDate.getTime() + 55 * oneDay),
            bikeParkId: bikePark._id
          },
          {
            name: 'Women\'s Ride Day',
            description: 'A day dedicated to women riders with workshops and group rides',
            date: new Date(currentDate.getTime() + 14 * oneDay),
            type: 'social',
            status: 'scheduled',
            capacity: 50,
            registrationDeadline: new Date(currentDate.getTime() + 12 * oneDay),
            bikeParkId: bikePark._id
          }
        ];
      }
      return [];
    });

    await Event.create(events);
    console.log('✅ Events generated');

    console.log('✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

generateMockDb(); 