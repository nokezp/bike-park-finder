const mongoose = require('mongoose');
const User = require('../../dist/models/User').default;
require('dotenv').config();

// Define BikePark schema
const bikeParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'All Levels'],
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create BikePark model
const BikePark = mongoose.model('BikePark', bikeParkSchema);

// Initial bike parks data from the frontend
const initialBikeParks = [
  {
    name: 'Mountain Creek Bike Park',
    location: 'Vernon, NJ',
    difficulty: 'Advanced',
    features: ['Jumps', 'Drops', 'Technical'],
    description: 'A downhill mountain bike park with a variety of trails for all skill levels.',
    coordinates: {
      latitude: 41.1803,
      longitude: -74.5134
    }
  },
  {
    name: 'Highland Mountain Bike Park',
    location: 'Northfield, NH',
    difficulty: 'Intermediate',
    features: ['Berms', 'Jumps', 'Flow'],
    description: 'A dedicated mountain bike park with lift access and trails for all abilities.',
    coordinates: {
      latitude: 43.4442,
      longitude: -71.6298
    }
  },
  // Austrian Bike Parks
  {
    name: 'Bikepark Semmering',
    location: 'Semmering, Austria',
    difficulty: 'Intermediate',
    features: ['Jumps', 'Berms', 'Flow Trails'],
    description: 'One of Austria\'s premier bike parks with diverse trails and stunning Alpine views.',
    coordinates: {
      latitude: 47.6297,
      longitude: 15.8297
    }
  },
  {
    name: 'Bikepark Leogang',
    location: 'Leogang, Austria',
    difficulty: 'Advanced',
    features: ['Technical', 'Drops', 'Jumps', 'World Cup Track'],
    description: 'Home to World Cup downhill races with challenging terrain and excellent facilities.',
    coordinates: {
      latitude: 47.4258,
      longitude: 12.7823
    }
  },
  {
    name: 'Bikepark Schladming',
    location: 'Schladming, Austria',
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jumps', 'Berms', 'Lift Access'],
    description: 'Extensive trail network in the heart of the Austrian Alps with options for all skill levels.',
    coordinates: {
      latitude: 47.3922,
      longitude: 13.6890
    }
  },
  {
    name: 'Bikepark Innsbruck',
    location: 'Innsbruck, Austria',
    difficulty: 'Advanced',
    features: ['Technical', 'Natural Terrain', 'Alpine Trails'],
    description: 'Urban-accessible bike park with challenging alpine terrain and breathtaking mountain views.',
    coordinates: {
      latitude: 47.2692,
      longitude: 11.4041
    }
  },
  {
    name: 'Bikepark Wagrain',
    location: 'Wagrain, Austria',
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Skills Area', 'Family-Friendly'],
    description: 'Family-oriented bike park with excellent beginner facilities and progression options.',
    coordinates: {
      latitude: 47.3319,
      longitude: 13.3050
    }
  },
  // German Bike Parks
  {
    name: 'Bikepark Winterberg',
    location: 'Winterberg, Germany',
    difficulty: 'Intermediate',
    features: ['Downhill', 'Freeride', 'Jumps', 'Northshore'],
    description: 'One of Germany\'s largest bike parks with diverse trails and excellent infrastructure.',
    coordinates: {
      latitude: 51.1950,
      longitude: 8.5222
    }
  },
  {
    name: 'Bikepark Geisskopf',
    location: 'Bischofsmais, Germany',
    difficulty: 'Advanced',
    features: ['Downhill', 'Freeride', 'Drops', 'Technical'],
    description: 'Bavarian bike park with challenging terrain and famous for its technical sections.',
    coordinates: {
      latitude: 48.9167,
      longitude: 13.0833
    }
  },
  {
    name: 'Bikepark Harz',
    location: 'Braunlage, Germany',
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jumps', 'Natural Terrain'],
    description: 'Located in the Harz mountains with varied terrain and beautiful forest trails.',
    coordinates: {
      latitude: 51.7333,
      longitude: 10.6167
    }
  },
  {
    name: 'Bikepark Albstadt',
    location: 'Albstadt, Germany',
    difficulty: 'Advanced',
    features: ['XC Trails', 'Technical', 'World Cup Track'],
    description: 'Home to World Cup cross-country races with technical climbs and descents.',
    coordinates: {
      latitude: 48.2147,
      longitude: 9.0139
    }
  },
  {
    name: 'Bikepark Todtnau',
    location: 'Todtnau, Germany',
    difficulty: 'Expert',
    features: ['Downhill', 'Steep', 'Technical', 'Roots'],
    description: 'Germany\'s oldest downhill track with extremely challenging terrain in the Black Forest.',
    coordinates: {
      latitude: 47.8333,
      longitude: 7.9500
    }
  },
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Find admin user to set as creator
    console.log('Looking for admin users...');
    const allUsers = await User.find({});
    console.log('All users:', allUsers);
    
    const adminUser = await User.findOne({ isAdmin: true });
    console.log('Admin user:', adminUser);
    
    if (!adminUser) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }
    
    // Check if bike parks already exist
    const existingParks = await BikePark.find({});
    const existingCount = existingParks.length;
    
    if (existingCount > 0) {
      console.log(`${existingCount} bike parks already exist in the database.`);
      const shouldContinue = process.argv.includes('--force');
      
      if (!shouldContinue) {
        console.log('Use --force flag to add bike parks anyway.');
        process.exit(0);
      }
    }
    
    // Prepare bike parks with admin user as creator
    const bikeParksWithCreator = initialBikeParks.map(park => ({
      ...park,
      createdBy: adminUser._id,
      amenities: park.amenities || [],
      images: park.images || []
    }));
    
    // Insert bike parks
    const result = await BikePark.insertMany(bikeParksWithCreator);
    console.log(`Successfully added ${result.length} bike parks to the database.`);
    
  } catch (error) {
    console.error('Error seeding bike parks:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 