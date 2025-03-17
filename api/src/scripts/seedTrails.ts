import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trail from '../models/Trail';
import { BikePark } from '../models/BikePark';

dotenv.config();

const initialTrails = [
  {
    bikeParkId: null, // Will be set dynamically
    name: 'Whistler Gondola',
    description: 'Main gondola providing access to the upper mountain trails. Modern 8-person cabins with bike racks.',
    capacity: 8,
    type: 'gondola',
    status: 'operational',
    operatingHours: '10:00 AM - 8:00 PM',
    imageUrl: 'https://example.com/whistler-gondola.jpg',
    notes: 'Bike racks available in each cabin'
  },
  {
    bikeParkId: null,
    name: 'Peak Express Chairlift',
    description: 'High-speed quad chairlift serving the peak trails. Features bike carriers for easy loading.',
    capacity: 4,
    type: 'chairlift',
    status: 'operational',
    operatingHours: '10:00 AM - 7:00 PM',
    imageUrl: 'https://example.com/peak-express.jpg',
    notes: 'Bike carriers available on every chair'
  },
  {
    bikeParkId: null,
    name: 'Shuttle Service',
    description: 'Regular shuttle service between base area and mid-mountain. Customized for bike transport.',
    capacity: 20,
    type: 'shuttle',
    status: 'operational',
    operatingHours: '9:00 AM - 5:00 PM',
    imageUrl: 'https://example.com/shuttle-service.jpg',
    notes: 'Bike racks on all shuttles'
  },
  {
    bikeParkId: null,
    name: 'Village Gondola',
    description: 'Scenic gondola connecting the village to the mid-mountain area. Spacious cabins for bikes.',
    capacity: 6,
    type: 'gondola',
    status: 'maintenance',
    operatingHours: '9:00 AM - 6:00 PM',
    imageUrl: 'https://example.com/village-gondola.jpg',
    notes: 'Currently undergoing maintenance'
  },
  {
    bikeParkId: null,
    name: 'Express Chair',
    description: 'Fast access to the upper mountain trails. Modern detachable chairlift with bike carriers.',
    capacity: 4,
    type: 'chairlift',
    status: 'operational',
    operatingHours: '10:00 AM - 7:00 PM',
    imageUrl: 'https://example.com/express-chair.jpg',
    notes: 'Bike carriers on every chair'
  },
  {
    bikeParkId: null,
    name: 'Trailhead Shuttle',
    description: 'Regular shuttle service to various trailheads throughout the park.',
    capacity: 15,
    type: 'shuttle',
    status: 'operational',
    operatingHours: '9:00 AM - 5:00 PM',
    imageUrl: 'https://example.com/trailhead-shuttle.jpg',
    notes: 'Stops at all major trailheads'
  },
  {
    bikeParkId: null,
    name: 'Summit Gondola',
    description: 'High-capacity gondola providing access to the summit trails. Modern 10-person cabins.',
    capacity: 10,
    type: 'gondola',
    status: 'operational',
    operatingHours: '10:00 AM - 7:00 PM',
    imageUrl: 'https://example.com/summit-gondola.jpg',
    notes: 'Large bike storage area in each cabin'
  },
  {
    bikeParkId: null,
    name: 'Mid-Mountain Chair',
    description: 'Classic chairlift serving the mid-mountain area. Features bike carriers.',
    capacity: 2,
    type: 'chairlift',
    status: 'maintenance',
    operatingHours: '10:00 AM - 6:00 PM',
    imageUrl: 'https://example.com/mid-mountain-chair.jpg',
    notes: 'Scheduled maintenance in progress'
  },
  {
    bikeParkId: null,
    name: 'Park Shuttle',
    description: 'Internal shuttle service connecting different areas of the bike park.',
    capacity: 12,
    type: 'shuttle',
    status: 'operational',
    operatingHours: '9:00 AM - 5:00 PM',
    imageUrl: 'https://example.com/park-shuttle.jpg',
    notes: 'Frequent service throughout the day'
  },
  {
    bikeParkId: null,
    name: 'Express Gondola',
    description: 'High-speed gondola providing quick access to the upper mountain.',
    capacity: 8,
    type: 'gondola',
    status: 'closed',
    operatingHours: '10:00 AM - 7:00 PM',
    imageUrl: 'https://example.com/express-gondola.jpg',
    notes: 'Temporarily closed for upgrades'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing trails
      await Trail.deleteMany({});
      console.log('Cleared existing trails');

      // Get all bike parks
      const bikeParks = await BikePark.find({});
      
      // Assign random bike parks to trails
      const trailsWithParks = initialTrails.map(trail => ({
        ...trail,
        bikeParkId: bikeParks[Math.floor(Math.random() * bikeParks.length)]._id
      }));
      
      // Insert new trails
      const trails = await Trail.insertMany(trailsWithParks);
      console.log(`Successfully seeded ${trails.length} trails`);
      
      // Log the created trails
      trails.forEach(trail => {
        console.log(`Created trail: ${trail.name} (${trail.type})`);
      });
      
    } catch (error) {
      console.error('Error seeding trails:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 