import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/bike-park-finder-test';

export const connectTestDB = async () => {
  try {
    await mongoose.connect(MONGODB_TEST_URI);
    console.log('Connected to test database');
  } catch (error) {
    console.error('Test database connection error:', error);
    process.exit(1);
  }
};

export const closeTestDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Error closing test database:', error);
  }
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
}; 