import 'dotenv/config';
import mongoose from 'mongoose';
import { UserModel } from '../graphql-modules/auth/src';
import { BikeParkModel } from '../graphql-modules/bike-park/src';
// import faker from 'faker';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder-mac';

async function generateMockDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Promise.all([
      UserModel.deleteMany({}),
      BikeParkModel.deleteMany({}),
    ]);
    const adminUser = new UserModel({
      username: 'admin',
      email: 'admin@bikepark.com',
      password: 'Admin123!',
      name: 'Admin User',
      role: 'admin'
    });

    const regularUser = new UserModel({
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
    // const bikeParks = [
    //   // {
    //   //   name: faker.company.name() + ' Bike Park',
    //   //   description: faker.lorem.paragraph(),
    //   //   location: faker.location.city() + ', ' + faker.location.country(),
    //   //   coordinates: {
    //   //     latitude: parseFloat(faker.location.latitude()),
    //   //     longitude: parseFloat(faker.location.longitude()),
    //   //   },
    //   //   imageUrl: faker.image.url(),
    //   //   status: faker.helpers.arrayElement(['open', 'closed', 'maintenance']),
    //   //   difficulty: faker.helpers.arrayElement(['beginner', 'intermediate', 'expert']),
    //   //   features: ['jumps', 'drops', 'berms', 'technical', 'flow trails', 'wooden features'],
    //   //   amenities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop', 'lift access'],
    //   //   createdBy: adminUser._id
    //   // },
    //   // {
    //   //   name: faker.company.name() + ' Bike Park',
    //   //   description: faker.lorem.paragraph(),
    //   //   location: faker.location.city() + ', ' + faker.location.country(),
    //   //   coordinates: {
    //   //     latitude: parseFloat(faker.location.latitude()),
    //   //     longitude: parseFloat(faker.location.longitude()),
    //   //   },
    //   //   imageUrl: faker.image.url(),
    //   //   status: faker.helpers.arrayElement(['open', 'closed', 'maintenance']),
    //   //   difficulty: faker.helpers.arrayElement(['beginner', 'intermediate', 'expert']),
    //   //   features: ['jumps', 'drops', 'berms', 'flow trails', 'skills area'],
    //   //   amenities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop'],
    //   //   createdBy: adminUser._id
    //   // },
    //   // {
    //   //   name: faker.company.name() + ' Bike Park',
    //   //   description: faker.lorem.paragraph(),
    //   //   location: faker.location.city() + ', ' + faker.location.country(),
    //   //   coordinates: {
    //   //     latitude: parseFloat(faker.location.latitude()),
    //   //     longitude: parseFloat(faker.location.longitude()),
    //   //   },
    //   //   imageUrl: faker.image.url(),
    //   //   status: faker.helpers.arrayElement(['open', 'closed', 'maintenance']),
    //   //   difficulty: faker.helpers.arrayElement(['beginner', 'intermediate', 'expert']),
    //   //   features: ['jumps', 'drops', 'berms', 'technical', 'flow trails'],
    //   //   amenities: ['parking', 'bike rentals', 'lessons', 'cafe', 'bike shop', 'uplift service'],
    //   //   createdBy: adminUser._id
    //   // }
    // ];

    // const createdBikeParks = await BikePark.create(bikeParks);

    // Generate trails
    // const trails = createdBikeParks.flatMap(bikePark => {
    //   if (bikePark.name === 'Whistler Mountain Bike Park') {
    //     return [
    //       {
    //         name: 'A-Line',
    //         description: 'Whistler\'s most famous jump trail, featuring perfectly sculpted tabletops',
    //         difficulty: 'advanced',
    //         length: 3.4,
    //         elevation: 375,
    //         features: ['jumps', 'berms', 'flow'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       },
    //       {
    //         name: 'B-Line',
    //         description: 'A beginner-friendly flow trail perfect for learning',
    //         difficulty: 'beginner',
    //         length: 2.8,
    //         elevation: 325,
    //         features: ['berms', 'flow', 'small jumps'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       }
    //     ];
    //   }
    //   if (bikePark.name === 'Highland Mountain Bike Park') {
    //     return [
    //       {
    //         name: 'Happy Hour',
    //         description: 'A flowy intermediate jump trail',
    //         difficulty: 'intermediate',
    //         length: 1.2,
    //         elevation: 200,
    //         features: ['jumps', 'berms', 'flow'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       },
    //       {
    //         name: 'NE Style',
    //         description: 'Technical trail with rocks and roots',
    //         difficulty: 'advanced',
    //         length: 0.8,
    //         elevation: 180,
    //         features: ['technical', 'rocks', 'roots'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       }
    //     ];
    //   }
    //   if (bikePark.name === 'Bike Park Wales') {
    //     return [
    //       {
    //         name: 'Terry\'s Belly',
    //         description: 'Fast and flowy red trail with big berms',
    //         difficulty: 'intermediate',
    //         length: 2.1,
    //         elevation: 250,
    //         features: ['berms', 'flow', 'jumps'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       },
    //       {
    //         name: 'Dai Hard',
    //         description: 'Technical black trail with challenging features',
    //         difficulty: 'expert',
    //         length: 1.5,
    //         elevation: 220,
    //         features: ['technical', 'drops', 'rock gardens'],
    //         status: 'open',
    //         bikeParkId: bikePark._id
    //       }
    //     ];
    //   }
    //   return [];
    // });
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

generateMockDb();
