// Create admin user first
const adminUser = {
  username: 'admin',
  email: 'admin@bikepark.com',
  password: 'Admin123!@#',
  role: 'admin',
  profile: {
    fullName: 'Admin User',
    location: 'Whistler, Canada',
    ridingStyles: ['Downhill', 'Enduro', 'Freeride'],
    skillLevel: 'Pro',
    preferredBikes: ['Downhill', 'Enduro'],
    totalRides: 250,
    totalReviews: 45,
    socialMedia: {
      instagram: 'admin_rider',
      strava: 'admin_strava',
    },
    isVerified: true,
    notifications: true,
  }
};

// Create regular user
const regularUser = {
  username: 'john_rider',
  email: 'john@example.com',
  password: 'JohnRider123!',
  role: 'user',
  profile: {
    fullName: 'John Smith',
    location: 'Vancouver, Canada',
    ridingStyles: ['Trail', 'Enduro'],
    skillLevel: 'Advanced',
    preferredBikes: ['Trail', 'Enduro'],
    totalRides: 120,
    totalReviews: 28,
    socialMedia: {
      instagram: 'john_rides',
      youtube: 'johnsmtb',
      strava: 'john_strava',
    },
    isVerified: true,
    notifications: true,
  }
}

export const usersSeedData = [adminUser, regularUser];