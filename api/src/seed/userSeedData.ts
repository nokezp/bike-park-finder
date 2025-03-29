// Create admin user first
const adminUser = {
  username: 'admin',
  email: 'admin@bikepark.com',
  password: 'Test@123',
  role: 'admin',
  profile: {
    firstName: 'Admin',
    lastName: 'User',
    location: 'Marktheidenfeld, Germany',
    preferences: {
      skillLevel: 'Pro',
      ridingStyles: ['Downhill', 'Enduro', 'Freeride'],
      preferredBikes: ['Downhill', 'Enduro'],
    },
    socialMedia: {
      instagram: 'admin_rider',
      strava: 'admin_strava',
    },
  },
  stats: {
    totalRides: 250,
    totalReviews: 45,
  },
  isVerified: true,
  notifications: {
    email: true,
    push: true
  },
};

// Create regular user
const regularUser = {
  username: 'john_rider',
  email: 'john@example.com',
  password: 'Tesrt@123',
  role: 'user',
  profile: {
    firstName: 'John',
    lastName: 'Smith',
    location: 'Graz, Austria',
    preferences: {
      skillLevel: 'Advanced',
      ridingStyles: ['Trail', 'Enduro'],
      preferredBikes: ['Trail', 'Enduro'],
    },
    socialMedia: {
      instagram: 'john_rides',
      youtube: 'johnsmtb',
      strava: 'john_strava',
    },
  },
  stats: {
    totalRides: 120,
    totalReviews: 28,
  },
  isVerified: true,
  notifications: {
    email: true,
    push: true
  },
}

export const usersSeedData = [adminUser, regularUser];