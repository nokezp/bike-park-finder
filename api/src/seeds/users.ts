import { User } from '../models/index.js';

export async function seedUsers() {
  // Create admin user
  const adminUser = new User({
    username: 'admin',
    email: 'admin@bikepark.com',
    password: 'Admin123!',
    name: 'Admin User',
    role: 'admin'
  });

  // Create regular user
  const regularUser = new User({
    username: 'user',
    email: 'user@example.com',
    password: 'User123!',
    name: 'Regular User',
    role: 'user'
  });

  // Save users
  await Promise.all([
    adminUser.save(),
    regularUser.save()
  ]);

  return adminUser;
} 