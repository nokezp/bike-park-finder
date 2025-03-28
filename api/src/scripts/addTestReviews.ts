import mongoose from 'mongoose';
import { connectDB } from '../utils/db';
import { ReviewModel } from '../graphql-modules/review/src/models/ReviewModel';
import { UserModel } from '../graphql-modules/auth/src/models/UserModel';
import { BikeParkModel } from '../graphql-modules/bike-park/src/models/BikeParkModel';

async function addTestReviews() {
  try {
    await connectDB();

    // Get a bike park
    const bikePark = await BikeParkModel.findOne();
    if (!bikePark) {
      console.error('No bike park found');
      process.exit(1);
    }

    // Get a user
    const user = await UserModel.findOne();
    if (!user) {
      console.error('No user found');
      process.exit(1);
    }

    // Delete existing reviews for this bike park
    await ReviewModel.deleteMany({ bikePark: bikePark._id });

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

    await ReviewModel.insertMany(reviews);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addTestReviews();
