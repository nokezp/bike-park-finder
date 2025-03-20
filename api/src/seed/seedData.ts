import mongoose from 'mongoose';
import { BikePark } from '../models/BikePark.js';
import { Event } from '../models/Event.js';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';
import { Trail } from '../models/Trail.js';

interface IBikeParkSeed {
  name: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  status: 'open' | 'closed' | 'maintenance';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  features: string[];
  facilities: string[];
  openingHours: {
    [key: string]: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  rules: string[];
  photos: string[];
  videos: string[];
  website: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// German Bike Parks
const germanBikeParks: IBikeParkSeed[] = [
  {
    name: "Bikepark Winterberg",
    description: "One of Germany's largest bike parks with diverse trails for all skill levels",
    location: "Winterberg, Germany",
    coordinates: { latitude: 51.1948, longitude: 8.5225 },
    imageUrl: "https://example.com/winterberg.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Downhill", "Northshore", "Dirt Lines"],
    facilities: ["Bike Rental", "Bike School", "Workshop", "Restaurant"],
    openingHours: {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-18:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+49-2981-92000",
      email: "info@bikepark-winterberg.de"
    },
    price: {
      amount: 35,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Protective Gear Recommended"],
    photos: ["https://example.com/winterberg1.jpg", "https://example.com/winterberg2.jpg"],
    videos: ["https://example.com/winterberg-video.mp4"],
    website: "https://www.bikepark-winterberg.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkwinterberg",
      instagram: "https://instagram.com/bikeparkwinterberg"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more German bike parks...
];

// Austrian Bike Parks
const austrianBikeParks: IBikeParkSeed[] = [
  {
    name: "Bikepark Saalbach",
    description: "Austria's largest bike park network with over 70km of trails",
    location: "Saalbach-Hinterglemm, Austria",
    coordinates: { latitude: 47.3892, longitude: 12.6384 },
    imageUrl: "https://example.com/saalbach.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Freeride", "Downhill", "Flow Country", "Single Trails"],
    facilities: ["Bike Rental", "Bike School", "Service Station", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+43-6541-6271",
      email: "info@saalbach.com"
    },
    price: {
      amount: 45,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Back Protector Recommended"],
    photos: ["https://example.com/saalbach1.jpg", "https://example.com/saalbach2.jpg"],
    videos: ["https://example.com/saalbach-video.mp4"],
    website: "https://www.saalbach.com/en/summer/bike",
    socialMedia: {
      facebook: "https://facebook.com/bikesaalbach",
      instagram: "https://instagram.com/bikesaalbach"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more Austrian bike parks...
];

// French Bike Parks
const frenchBikeParks: IBikeParkSeed[] = [
  {
    name: "Les Gets Bike Park",
    description: "World-class bike park in the French Alps with UCI World Cup history",
    location: "Les Gets, France",
    coordinates: { latitude: 46.1539, longitude: 6.6667 },
    imageUrl: "https://example.com/lesgets.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup DH Track", "Jump Park", "Flow Trails", "Technical Trails"],
    facilities: ["Bike Shop", "Bike School", "Repair Center", "Cafe"],
    openingHours: {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-18:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+33-450-75-80-80",
      email: "info@lesgets.com"
    },
    price: {
      amount: 40,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Protection Mandatory"],
    photos: ["https://example.com/lesgets1.jpg", "https://example.com/lesgets2.jpg"],
    videos: ["https://example.com/lesgets-video.mp4"],
    website: "https://www.lesgets.com/en/summer/mountain-biking",
    socialMedia: {
      facebook: "https://facebook.com/bikelesgets",
      instagram: "https://instagram.com/bikelesgets"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more French bike parks...
];

// Italian Bike Parks
const italianBikeParks: IBikeParkSeed[] = [
  {
    name: "Bike Park Mottolino",
    description: "Premier Italian bike park in Livigno with world-class facilities",
    location: "Livigno, Italy",
    coordinates: { latitude: 46.5196, longitude: 10.1367 },
    imageUrl: "https://example.com/mottolino.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Downhill Tracks", "Flow Lines", "Dirt Jumps", "Skills Area"],
    facilities: ["Bike Rental", "Bike School", "Workshop", "Restaurant"],
    openingHours: {
      monday: "09:00-17:30",
      tuesday: "09:00-17:30",
      wednesday: "09:00-17:30",
      thursday: "09:00-17:30",
      friday: "09:00-17:30",
      saturday: "09:00-17:30",
      sunday: "09:00-17:30"
    },
    contact: {
      phone: "+39-0342-970025",
      email: "info@mottolino.com"
    },
    price: {
      amount: 38,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Full Protection Recommended"],
    photos: ["https://example.com/mottolino1.jpg", "https://example.com/mottolino2.jpg"],
    videos: ["https://example.com/mottolino-video.mp4"],
    website: "https://www.mottolino.com/en/bike-park",
    socialMedia: {
      facebook: "https://facebook.com/mottolinobikepark",
      instagram: "https://instagram.com/mottolinobikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more Italian bike parks...
];

// UK Bike Parks
const ukBikeParks: IBikeParkSeed[] = [
  {
    name: "BikePark Wales",
    description: "The UK's premier mountain bike park with trails for all abilities",
    location: "Merthyr Tydfil, Wales, UK",
    coordinates: { latitude: 51.7359, longitude: -3.3673 },
    imageUrl: "https://example.com/bikeparkwales.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Trail Center", "Uplift Service", "Skills Area", "Jump Lines"],
    facilities: ["Bike Shop", "Cafe", "Bike Hire", "Coaching"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1685-709450",
      email: "ride@bikeparkwales.com"
    },
    price: {
      amount: 35,
      currency: "GBP"
    },
    rules: ["Helmet Mandatory", "Gloves Required", "Full Face Recommended"],
    photos: ["https://example.com/bikeparkwales1.jpg", "https://example.com/bikeparkwales2.jpg"],
    videos: ["https://example.com/bikeparkwales-video.mp4"],
    website: "https://www.bikeparkwales.com",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkwales",
      instagram: "https://instagram.com/bikeparkwales"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more UK bike parks...
];

// US Bike Parks
const usBikeParks: IBikeParkSeed[] = [
  {
    name: "Whistler Mountain Bike Park",
    description: "The world's most famous bike park featuring over 80km of lift-serviced trails",
    location: "Whistler, BC, Canada",
    coordinates: { latitude: 50.1163, longitude: -122.9574 },
    imageUrl: "https://example.com/whistler.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Downhill Trails", "Jump Lines", "Technical Trails", "Beginner Area"],
    facilities: ["Bike Rental", "Bike School", "Repair Shop", "Restaurant"],
    openingHours: {
      monday: "10:00-17:00",
      tuesday: "10:00-17:00",
      wednesday: "10:00-17:00",
      thursday: "10:00-17:00",
      friday: "10:00-17:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+1-604-967-8950",
      email: "info@whistlerbikepark.com"
    },
    price: {
      amount: 89,
      currency: "CAD"
    },
    rules: ["Helmet Required", "Full Face Helmet Recommended", "Protective Gear Recommended"],
    photos: ["https://example.com/whistler1.jpg", "https://example.com/whistler2.jpg"],
    videos: ["https://example.com/whistler-video.mp4"],
    website: "https://www.whistlerblackcomb.com/explore-the-resort/activities-and-events/whistler-mountain-bike-park/whistler-mountain-bike-park.aspx",
    socialMedia: {
      facebook: "https://facebook.com/whistlerbikepark",
      instagram: "https://instagram.com/whistlerbikepark",
      youtube: "https://youtube.com/whistlerbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more US bike parks...
];

// Australian Bike Parks
const australianBikeParks: IBikeParkSeed[] = [
  {
    name: "Thredbo Mountain Bike Park",
    description: "Australia's premier alpine bike park with the country's longest descent",
    location: "Thredbo, NSW, Australia",
    coordinates: { latitude: -36.5037, longitude: 148.3039 },
    imageUrl: "https://example.com/thredbo.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Gravity Trails", "Flow Trails", "Skills Park", "Cross Country"],
    facilities: ["Bike Shop", "Rental", "Lessons", "Cafe"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "09:00-16:30",
      sunday: "09:00-16:30"
    },
    contact: {
      phone: "+61-2-6459-4100",
      email: "info@thredbo.com.au"
    },
    price: {
      amount: 89,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Protective Gear Mandatory"],
    photos: ["https://example.com/thredbo1.jpg", "https://example.com/thredbo2.jpg"],
    videos: ["https://example.com/thredbo-video.mp4"],
    website: "https://www.thredbo.com.au/activities/biking/",
    socialMedia: {
      facebook: "https://facebook.com/thredbo",
      instagram: "https://instagram.com/thredboresort"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 9 more Australian bike parks...
];

// Bosnian Bike Parks
const bosnianBikeParks: IBikeParkSeed[] = [
  {
    name: "Jahorina Bike Park",
    description: "Bosnia's largest mountain bike park with stunning mountain views",
    location: "Jahorina, Bosnia and Herzegovina",
    coordinates: { latitude: 43.7418, longitude: 18.5683 },
    imageUrl: "https://example.com/jahorina.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Downhill Trails", "Cross Country", "Scenic Routes"],
    facilities: ["Bike Rental", "Basic Repairs", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+387-57-270-090",
      email: "info@jahorina.org"
    },
    price: {
      amount: 25,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Basic Protection Recommended"],
    photos: ["https://example.com/jahorina1.jpg", "https://example.com/jahorina2.jpg"],
    videos: ["https://example.com/jahorina-video.mp4"],
    website: "https://www.jahorina.org",
    socialMedia: {
      facebook: "https://facebook.com/jahorina",
      instagram: "https://instagram.com/jahorina_official"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 4 more Bosnian bike parks...
];

// Croatian Bike Parks
const croatianBikeParks: IBikeParkSeed[] = [
  {
    name: "Sljeme Bike Park",
    description: "Zagreb's mountain bike park with diverse trails and city views",
    location: "Sljeme, Zagreb, Croatia",
    coordinates: { latitude: 45.9283, longitude: 15.9739 },
    imageUrl: "https://example.com/sljeme.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Technical Sections", "Skills Area"],
    facilities: ["Bike Rental", "Service Station", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+385-1-4821-506",
      email: "info@sljeme.hr"
    },
    price: {
      amount: 30,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Protective Gear Recommended"],
    photos: ["https://example.com/sljeme1.jpg", "https://example.com/sljeme2.jpg"],
    videos: ["https://example.com/sljeme-video.mp4"],
    website: "https://www.sljeme.hr",
    socialMedia: {
      facebook: "https://facebook.com/sljemebikepark",
      instagram: "https://instagram.com/sljemebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 4 more Croatian bike parks...
];

// Serbian Bike Parks
const serbianBikeParks: IBikeParkSeed[] = [
  {
    name: "Kopaonik Bike Park",
    description: "Serbia's premier mountain bike destination with varied terrain",
    location: "Kopaonik, Serbia",
    coordinates: { latitude: 43.2853, longitude: 20.8115 },
    imageUrl: "https://example.com/kopaonik.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Downhill Trails", "Cross Country Routes", "Beginner Area"],
    facilities: ["Bike Rental", "Basic Repairs", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+381-36-5471-111",
      email: "info@kopaonik.rs"
    },
    price: {
      amount: 25,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Basic Protection Recommended"],
    photos: ["https://example.com/kopaonik1.jpg", "https://example.com/kopaonik2.jpg"],
    videos: ["https://example.com/kopaonik-video.mp4"],
    website: "https://www.kopaonik.rs",
    socialMedia: {
      facebook: "https://facebook.com/kopaonikbikepark",
      instagram: "https://instagram.com/kopaonikbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add 4 more Serbian bike parks...
];

const eventData = {
  name: "Whistler Crankworx",
  description: "The biggest slopestyle and freeride mountain bike festival",
  location: "Whistler Bike Park",
  startDate: new Date("2024-08-05"),
  endDate: new Date("2024-08-15"),
  type: "Festival",
  status: "upcoming",
  category: "Professional",
  disciplines: ["Slopestyle", "Downhill", "Enduro"],
  registrationDeadline: new Date("2024-07-15"),
  maxParticipants: 500,
  currentParticipants: 0,
  price: {
    amount: 299.99,
    currency: "USD"
  },
  prizes: {
    totalAmount: 100000,
    currency: "USD",
    distribution: [
      { place: 1, amount: 50000 },
      { place: 2, amount: 30000 },
      { place: 3, amount: 20000 }
    ]
  },
  sponsors: ["Red Bull", "SRAM", "Fox Racing"],
  contact: {
    email: "crankworx@whistler.com",
    phone: "+1-604-555-0123"
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Trail data
const trailData = [
  {
    name: "A-Line",
    description: "Whistler's most famous jump trail, featuring perfectly sculpted tabletops and berms",
    bikePark: "Whistler Mountain Bike Park",
    difficulty: "advanced",
    type: "downhill",
    length: 3.2, // in kilometers
    elevation: {
      gain: 0,
      loss: 350
    },
    features: ["Jumps", "Berms", "Drops", "Wood Features"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 5,
    photos: ["https://example.com/aline1.jpg", "https://example.com/aline2.jpg"],
    videos: ["https://example.com/aline-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Dirt Merchant",
    description: "Advanced jump line with massive features and steep sections",
    bikePark: "Whistler Mountain Bike Park",
    difficulty: "pro",
    type: "downhill",
    length: 2.8,
    elevation: {
      gain: 0,
      loss: 320
    },
    features: ["Large Jumps", "Step-downs", "Hip Jumps", "Gap Jumps"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 5,
    photos: ["https://example.com/dirtmerchant1.jpg", "https://example.com/dirtmerchant2.jpg"],
    videos: ["https://example.com/dirtmerchant-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Pro Line",
    description: "Bikepark Winterberg's most challenging trail with massive features",
    bikePark: "Bikepark Winterberg",
    difficulty: "pro",
    type: "downhill",
    length: 2.1,
    elevation: {
      gain: 0,
      loss: 280
    },
    features: ["Big Jumps", "Technical Sections", "Rock Gardens", "Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.8,
    photos: ["https://example.com/proline1.jpg", "https://example.com/proline2.jpg"],
    videos: ["https://example.com/proline-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "X-Line",
    description: "Saalbach's signature downhill track with World Cup heritage",
    bikePark: "Bikepark Saalbach",
    difficulty: "pro",
    type: "downhill",
    length: 4.5,
    elevation: {
      gain: 0,
      loss: 450
    },
    features: ["Rock Gardens", "Root Sections", "Steep Terrain", "Technical Features"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.9,
    photos: ["https://example.com/xline1.jpg", "https://example.com/xline2.jpg"],
    videos: ["https://example.com/xline-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Flow Country",
    description: "A flowy trail perfect for intermediate riders to progress",
    bikePark: "Bikepark Saalbach",
    difficulty: "intermediate",
    type: "flow",
    length: 5.2,
    elevation: {
      gain: 50,
      loss: 480
    },
    features: ["Berms", "Small Jumps", "Rollers", "Natural Features"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.7,
    photos: ["https://example.com/flowcountry1.jpg", "https://example.com/flowcountry2.jpg"],
    videos: ["https://example.com/flowcountry-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "La Roue Libre",
    description: "Les Gets' signature flow trail with stunning Alpine views",
    bikePark: "Les Gets Bike Park",
    difficulty: "intermediate",
    type: "flow",
    length: 4.8,
    elevation: {
      gain: 0,
      loss: 420
    },
    features: ["Berms", "Tables", "Step-ups", "Natural Features"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6,
    photos: ["https://example.com/roulibre1.jpg", "https://example.com/roulibre2.jpg"],
    videos: ["https://example.com/roulibre-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Livigno Line",
    description: "Mottolino's showcase trail combining flow and technical features",
    bikePark: "Bike Park Mottolino",
    difficulty: "advanced",
    type: "technical",
    length: 3.9,
    elevation: {
      gain: 0,
      loss: 380
    },
    features: ["Jumps", "Rock Gardens", "Wooden Features", "Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.8,
    photos: ["https://example.com/livignoline1.jpg", "https://example.com/livignoline2.jpg"],
    videos: ["https://example.com/livignoline-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Cannonball",
    description: "Thredbo's signature downhill trail with a mix of technical features",
    bikePark: "Thredbo Mountain Bike Park",
    difficulty: "advanced",
    type: "downhill",
    length: 3.5,
    elevation: {
      gain: 0,
      loss: 400
    },
    features: ["Rock Gardens", "Jumps", "Drops", "Technical Sections"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.7,
    photos: ["https://example.com/cannonball1.jpg", "https://example.com/cannonball2.jpg"],
    videos: ["https://example.com/cannonball-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rookie Trail",
    description: "Perfect beginner trail to start your mountain biking journey",
    bikePark: "BikePark Wales",
    difficulty: "beginner",
    type: "flow",
    length: 2.5,
    elevation: {
      gain: 0,
      loss: 180
    },
    features: ["Small Berms", "Mini Rollers", "Wide Trail", "Smooth Surface"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.5,
    photos: ["https://example.com/rookie1.jpg", "https://example.com/rookie2.jpg"],
    videos: ["https://example.com/rookie-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jahorina Express",
    description: "Fast and flowing trail with beautiful Bosnian mountain views",
    bikePark: "Jahorina Bike Park",
    difficulty: "intermediate",
    type: "flow",
    length: 3.8,
    elevation: {
      gain: 0,
      loss: 340
    },
    features: ["Berms", "Small Jumps", "Natural Features", "Scenic Views"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6,
    photos: ["https://example.com/jahorina1.jpg", "https://example.com/jahorina2.jpg"],
    videos: ["https://example.com/jahorina-video.mp4"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    // Clear existing data
    await Promise.all([
      Review.deleteMany({}),
      Event.deleteMany({}),
      Trail.deleteMany({}),
      BikePark.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create admin user first
    const adminUser = await User.create({
      username: "admin",
      email: "admin@bikepark.com",
      password: "Admin123!@#",
      role: "admin",
      profile: {
        fullName: "Admin User",
        location: "Whistler, Canada",
        ridingStyles: ["Downhill", "Enduro", "Freeride"],
        skillLevel: "Pro",
        preferredBikes: ["Downhill", "Enduro"],
        totalRides: 250,
        totalReviews: 45,
        socialMedia: {
          instagram: "admin_rider",
          strava: "admin_strava"
        },
        isVerified: true,
        notifications: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create regular user
    const regularUser = await User.create({
      username: "john_rider",
      email: "john@example.com",
      password: "JohnRider123!",
      role: "user",
      profile: {
        fullName: "John Smith",
        location: "Vancouver, Canada",
        ridingStyles: ["Trail", "Enduro"],
        skillLevel: "Advanced",
        preferredBikes: ["Trail", "Enduro"],
        totalRides: 120,
        totalReviews: 28,
        socialMedia: {
          instagram: "john_rides",
          youtube: "johnsmtb",
          strava: "john_strava"
        },
        isVerified: true,
        notifications: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Insert all bike parks with admin user as creator
    const allBikeParks = [
      ...germanBikeParks,
      ...austrianBikeParks,
      ...frenchBikeParks,
      ...italianBikeParks,
      ...ukBikeParks,
      ...usBikeParks,
      ...australianBikeParks,
      ...bosnianBikeParks,
      ...croatianBikeParks,
      ...serbianBikeParks
    ];

    const createdBikeParks = await BikePark.create(
      allBikeParks.map(park => ({
        ...park,
        createdBy: adminUser._id
      }))
    );

    // Insert event with admin user as creator
    const createdEvent = await Event.create({
      ...eventData,
      createdBy: adminUser._id,
      bikePark: createdBikeParks[0]._id
    });

    // Create reviews distributed between users
    const reviews = [
      {
        title: "Epic Downhill Paradise",
        content: "Amazing bike park with world-class trails!",
        rating: 5,
        difficulty: "advanced",
        technicalRating: 5,
        scenicRating: 5,
        maintenanceRating: 4,
        bikeUsed: "Downhill",
        rideDate: new Date(),
        conditions: {
          weather: "sunny",
          trailCondition: "dry"
        },
        photos: ["https://example.com/review1.jpg"],
        videos: ["https://example.com/review1.mp4"],
        likes: 0,
        bikePark: createdBikeParks[0]._id,
        createdBy: adminUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Great Trail Variety",
        content: "Great variety of trails for all skill levels.",
        rating: 4,
        difficulty: "intermediate",
        technicalRating: 4,
        scenicRating: 5,
        maintenanceRating: 4,
        bikeUsed: "Trail",
        rideDate: new Date(),
        conditions: {
          weather: "cloudy",
          trailCondition: "dry"
        },
        photos: ["https://example.com/review2.jpg"],
        videos: ["https://example.com/review2.mp4"],
        likes: 0,
        bikePark: createdBikeParks[0]._id,
        createdBy: regularUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const createdReviews = await Review.create(reviews);

    // Update bike park with reviews
    await BikePark.findByIdAndUpdate(
      createdBikeParks[0]._id,
      { $push: { reviews: { $each: createdReviews.map(r => r._id) } } }
    );

    // Update user stats
    await Promise.all([
      User.findByIdAndUpdate(
        adminUser._id,
        { 'profile.totalReviews': 1 }
      ),
      User.findByIdAndUpdate(
        regularUser._id,
        { 'profile.totalReviews': 1 }
      )
    ]);

    // Insert trails with references to bike parks
    const createdTrails = await Trail.create(
      trailData.map(trail => {
        const bikePark = createdBikeParks.find(park => park.name === trail.bikePark);
        const { bikePark: bikeParkName, ...trailWithoutBikePark } = trail;
        return {
          ...trailWithoutBikePark,
          bikeParkId: bikePark?._id,
          createdBy: adminUser._id
        };
      })
    );

    // Update bike parks with their trails
    await Promise.all(
      createdBikeParks.map(async park => {
        const parkTrails = createdTrails.filter(trail => trail.bikeParkId?.toString() === park._id.toString());
        if (parkTrails.length > 0) {
          await BikePark.findByIdAndUpdate(
            park._id,
            { $push: { trails: { $each: parkTrails.map(t => t._id) } } }
          );
        }
      })
    );

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};