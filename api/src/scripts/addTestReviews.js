import mongoose from 'mongoose';
import { connectDB } from '../utils/db.js';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';
import { BikePark } from '../models/BikePark.js';

async function addTestReviews() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Get a bike park
    const bikePark = await BikePark.findOne();
    if (!bikePark) {
      console.error('No bike park found');
      process.exit(1);
    }

    // Get a user
    const user = await User.findOne();
    if (!user) {
      console.error('No user found');
      process.exit(1);
    }

    // Delete existing reviews for this bike park
    await Review.deleteMany({ bikePark: bikePark._id });
    console.log('Deleted existing reviews');

    // Create 10 test reviews
    const reviews = [];
    for (let i = 1; i <= 10; i++) {
      reviews.push({
        title: `Test Review ${i}`,
        comment: `This is test review number ${i}. It contains some text to test the pagination functionality.`,
        rating: Math.floor(Math.random() * 5) + 1,
        bikePark: bikePark._id,
        createdBy: user._id,
        visitDate: new Date(),
        trailDifficulty: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)],
        createdAt: new Date(Date.now() - i * 86400000), // Each review is 1 day older
        updatedAt: new Date()
      });
    }

    await Review.insertMany(reviews);
    console.log('Added 10 test reviews');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addTestReviews();
