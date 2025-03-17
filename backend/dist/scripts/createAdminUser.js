const mongoose = require('mongoose');
const User = require('../../dist/models/User').default;
require('dotenv').config();

// Admin user data
const adminUser = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123',
  isAdmin: true
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const newAdmin = new User(adminUser);
    await newAdmin.save();
    
    console.log('Admin user created successfully');
    console.log(`Username: ${adminUser.username}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${adminUser.password}`);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 