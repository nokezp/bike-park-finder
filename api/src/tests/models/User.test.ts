import mongoose from 'mongoose';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { User } from '../../models/User';

describe('User Model', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);

    expect(user._id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
    expect(user.isAdmin).toBe(false);
  });

  it('should fail to create a user with duplicate email', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    await User.create(userData);

    try {
      await User.create(userData);
      fail('Should have thrown an error');
    } catch (error) {
      if (error instanceof mongoose.mongo.MongoError) {
        expect(error.code).toBe(11000); // MongoDB duplicate key error code
      } else {
        fail('Expected MongoError');
      }
    }
  });

  it('should hash password before saving', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);
    expect(user.password).not.toBe(userData.password);
  });

  it('should compare passwords correctly', async () => {
    const userData = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });

  it('should update user profile', async () => {
    const user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { username: 'updateduser', bio: 'New bio' },
      { new: true }
    );

    expect(updatedUser?.username).toBe('updateduser');
    expect(updatedUser?.bio).toBe('New bio');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await User.findByIdAndDelete(user._id);

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
}); 