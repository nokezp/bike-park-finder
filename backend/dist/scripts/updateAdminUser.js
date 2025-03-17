const mongoose = require('mongoose');
const User = require('../../dist/models/User').default;
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Find user with email admin@example.com
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminUser) {
      console.log('Admin user not found');
      process.exit(1);
    }
    
    // Update isAdmin flag
    adminUser.isAdmin = true;
    await adminUser.save();
    
    console.log('Admin user updated successfully');
    console.log(adminUser);
    
  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 