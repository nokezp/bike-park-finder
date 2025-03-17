import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event';
import { BikePark } from '../models/BikePark';

dotenv.config();

const initialEvents = [
  {
    bikeParkId: null, // Will be set dynamically
    name: 'Enduro World Series 2024',
    description: 'The world\'s premier enduro mountain bike series comes to Whistler. Watch the best riders compete on challenging trails.',
    startDate: new Date('2024-08-15'),
    endDate: new Date('2024-08-18'),
    eventType: 'competition',
    imageUrl: 'https://example.com/ews-whistler.jpg',
    externalUrl: 'https://www.enduroworldseries.com/events/whistler-2024'
  },
  {
    bikeParkId: null,
    name: 'Beginner Skills Camp',
    description: 'Learn the fundamentals of mountain biking in a safe, controlled environment. Perfect for newcomers to the sport.',
    startDate: new Date('2024-06-10'),
    endDate: new Date('2024-06-12'),
    eventType: 'camp',
    imageUrl: 'https://example.com/beginner-camp.jpg',
    externalUrl: 'https://www.bikeparkwales.com/events/beginner-camp'
  },
  {
    bikeParkId: null,
    name: 'Trail Maintenance Day',
    description: 'Join us for a day of trail maintenance and improvements. Help keep our trails in top condition.',
    startDate: new Date('2024-05-15'),
    endDate: new Date('2024-05-15'),
    eventType: 'maintenance',
    imageUrl: 'https://example.com/maintenance-day.jpg',
    externalUrl: 'https://www.trestlebikepark.com/events/maintenance'
  },
  {
    bikeParkId: null,
    name: 'Demo Day with Specialized',
    description: 'Test the latest Specialized mountain bikes on our trails. Free demos available all day.',
    startDate: new Date('2024-07-20'),
    endDate: new Date('2024-07-20'),
    eventType: 'demo',
    imageUrl: 'https://example.com/specialized-demo.jpg',
    externalUrl: 'https://www.highlandmountain.com/events/specialized-demo'
  },
  {
    bikeParkId: null,
    name: 'Women\'s Weekend',
    description: 'A weekend dedicated to women in mountain biking. Clinics, group rides, and social events.',
    startDate: new Date('2024-09-05'),
    endDate: new Date('2024-09-07'),
    eventType: 'camp',
    imageUrl: 'https://example.com/womens-weekend.jpg',
    externalUrl: 'https://www.mountaincreekbikepark.com/events/womens-weekend'
  },
  {
    bikeParkId: null,
    name: 'Downhill National Championships',
    description: 'National championship event featuring the country\'s top downhill riders.',
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-07-17'),
    eventType: 'competition',
    imageUrl: 'https://example.com/dh-nationals.jpg',
    externalUrl: 'https://www.snowshoebikepark.com/events/dh-nationals'
  },
  {
    bikeParkId: null,
    name: 'Kids Summer Camp',
    description: 'A week-long summer camp for young riders. Learn skills, make friends, and have fun!',
    startDate: new Date('2024-08-05'),
    endDate: new Date('2024-08-09'),
    eventType: 'camp',
    imageUrl: 'https://example.com/kids-camp.jpg',
    externalUrl: 'https://www.thundermountainbikepark.com/events/kids-camp'
  },
  {
    bikeParkId: null,
    name: 'Trail Building Workshop',
    description: 'Learn the art and science of building sustainable mountain bike trails.',
    startDate: new Date('2024-06-25'),
    endDate: new Date('2024-06-26'),
    eventType: 'maintenance',
    imageUrl: 'https://example.com/trail-building.jpg',
    externalUrl: 'https://www.windrockbikepark.com/events/trail-building'
  },
  {
    bikeParkId: null,
    name: 'E-Bike Demo Day',
    description: 'Experience the latest e-bike technology from multiple manufacturers.',
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-09-15'),
    eventType: 'demo',
    imageUrl: 'https://example.com/ebike-demo.jpg',
    externalUrl: 'https://www.angelfirebikepark.com/events/ebike-demo'
  },
  {
    bikeParkId: null,
    name: 'End of Season Party',
    description: 'Celebrate another great season with fellow riders. BBQ, live music, and group rides.',
    startDate: new Date('2024-10-05'),
    endDate: new Date('2024-10-05'),
    eventType: 'other',
    imageUrl: 'https://example.com/end-season-party.jpg',
    externalUrl: 'https://www.crestedbuttebikepark.com/events/end-season'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing events
      await Event.deleteMany({});
      console.log('Cleared existing events');

      // Get all bike parks
      const bikeParks = await BikePark.find({});
      
      // Assign random bike parks to events
      const eventsWithParks = initialEvents.map(event => ({
        ...event,
        bikeParkId: bikeParks[Math.floor(Math.random() * bikeParks.length)]._id
      }));
      
      // Insert new events
      const events = await Event.insertMany(eventsWithParks);
      console.log(`Successfully seeded ${events.length} events`);
      
      // Log the created events
      events.forEach(event => {
        console.log(`Created event: ${event.name} (${event.eventType})`);
      });
      
    } catch (error) {
      console.error('Error seeding events:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 