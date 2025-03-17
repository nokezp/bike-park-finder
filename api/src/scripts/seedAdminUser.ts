import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const adminUser = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
  firstName: 'Admin',
  lastName: 'User',
  isAdmin: true
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Check if admin user exists
      const existingAdmin = await User.findOne({ email: adminUser.email });
      
      if (existingAdmin) {
        console.log('Admin user already exists');
        return;
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);
      
      // Create admin user
      const admin = new User({
        ...adminUser,
        password: hashedPassword
      });
      
      await admin.save();
      console.log('Admin user created successfully');
      
    } catch (error) {
      console.error('Error seeding admin user:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 