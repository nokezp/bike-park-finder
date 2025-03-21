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
  {
    name: "Bikepark Geisskopf",
    description: "Famous bike park in Bavaria with spectacular views and challenging trails",
    location: "Bischofsmais, Germany",
    coordinates: { latitude: 48.9167, longitude: 13.0833 },
    imageUrl: "https://example.com/geisskopf.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Downhill", "Freeride", "Slopestyle", "Dirt Jump"],
    facilities: ["Bike Shop", "Rental Service", "Restaurant", "Parking"],
    openingHours: {
      monday: "09:30-17:00",
      tuesday: "09:30-17:00",
      wednesday: "09:30-17:00",
      thursday: "09:30-17:00",
      friday: "09:30-17:00",
      saturday: "09:30-17:00",
      sunday: "09:30-17:00"
    },
    contact: {
      phone: "+49-9920-903040",
      email: "info@geisskopf-bikepark.de"
    },
    price: {
      amount: 32,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Back Protector Required", "Full Face Recommended"],
    photos: ["https://example.com/geisskopf1.jpg", "https://example.com/geisskopf2.jpg"],
    videos: ["https://example.com/geisskopf-video.mp4"],
    website: "https://www.bikepark-geisskopf.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkgeisskopf",
      instagram: "https://instagram.com/bikeparkgeisskopf"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Harz",
    description: "Scenic bike park in the Harz mountains with trails for all abilities",
    location: "Braunlage, Germany",
    coordinates: { latitude: 51.7333, longitude: 10.6167 },
    imageUrl: "https://example.com/harz.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trail", "Single Trails", "Jump Line", "Skills Area"],
    facilities: ["Bike Rental", "Service Station", "Cafe", "Lift"],
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
      phone: "+49-5520-999930",
      email: "info@bikepark-harz.de"
    },
    price: {
      amount: 30,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Respect Nature", "Follow Trail Signs"],
    photos: ["https://example.com/harz1.jpg", "https://example.com/harz2.jpg"],
    videos: ["https://example.com/harz-video.mp4"],
    website: "https://www.bikepark-braunlage.de",
    socialMedia: {
      facebook: "https://facebook.com/bikepark.harz",
      instagram: "https://instagram.com/bikepark.harz"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Hahnenklee",
    description: "Family-friendly bike park with a mix of natural and built features",
    location: "Goslar-Hahnenklee, Germany",
    coordinates: { latitude: 51.8667, longitude: 10.3333 },
    imageUrl: "https://example.com/hahnenklee.jpg",
    status: "open",
    difficulty: "beginner",
    features: ["Beginner Trail", "Family Line", "Flow Country Trail", "Pump Track"],
    facilities: ["Bike School", "Equipment Rental", "First Aid Station", "Parking"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:30-16:30",
      sunday: "09:30-16:30"
    },
    contact: {
      phone: "+49-5325-51040",
      email: "info@bikepark-hahnenklee.de"
    },
    price: {
      amount: 28,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Beginners Welcome", "Group Discounts Available"],
    photos: ["https://example.com/hahnenklee1.jpg", "https://example.com/hahnenklee2.jpg"],
    videos: ["https://example.com/hahnenklee-video.mp4"],
    website: "https://www.bikepark-hahnenklee.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkhahnenklee",
      instagram: "https://instagram.com/bikeparkhahnenklee"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Todtnau",
    description: "Historic bike park in the Black Forest with challenging downhill tracks",
    location: "Todtnau, Germany",
    coordinates: { latitude: 47.8333, longitude: 7.9333 },
    imageUrl: "https://example.com/todtnau.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup DH Track", "Pro Line", "Expert Trail", "Technical Sections"],
    facilities: ["Pro Shop", "Bike Service", "Restaurant", "Camping Area"],
    openingHours: {
      monday: "closed",
      tuesday: "10:00-18:00",
      wednesday: "10:00-18:00",
      thursday: "10:00-18:00",
      friday: "10:00-18:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+49-7671-96920",
      email: "info@bikepark-todtnau.de"
    },
    price: {
      amount: 35,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Body Protection Mandatory", "Expert Riders Only"],
    photos: ["https://example.com/todtnau1.jpg", "https://example.com/todtnau2.jpg"],
    videos: ["https://example.com/todtnau-video.mp4"],
    website: "https://www.bikepark-todtnau.de",
    socialMedia: {
      facebook: "https://facebook.com/bikepark.todtnau",
      instagram: "https://instagram.com/bikepark.todtnau"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Willingen",
    description: "Modern bike park with extensive trail network and excellent facilities",
    location: "Willingen, Germany",
    coordinates: { latitude: 51.2967, longitude: 8.6083 },
    imageUrl: "https://example.com/willingen.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Freeride", "Continental Track", "Flow Country", "Kids Area"],
    facilities: ["Bike Academy", "Rental Center", "Hotel", "Spa"],
    openingHours: {
      monday: "09:30-17:30",
      tuesday: "09:30-17:30",
      wednesday: "09:30-17:30",
      thursday: "09:30-17:30",
      friday: "09:30-17:30",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+49-5632-96990",
      email: "info@bikepark-willingen.de"
    },
    price: {
      amount: 33,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Respect Other Riders", "No Unauthorized Building"],
    photos: ["https://example.com/willingen1.jpg", "https://example.com/willingen2.jpg"],
    videos: ["https://example.com/willingen-video.mp4"],
    website: "https://www.bikepark-willingen.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkwillingen",
      instagram: "https://instagram.com/bikeparkwillingen"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Serfaus-Fiss-Ladis",
    description: "High-altitude bike park with breathtaking Alpine views",
    location: "Serfaus, Germany",
    coordinates: { latitude: 47.0333, longitude: 10.6000 },
    imageUrl: "https://example.com/serfaus.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Panorama Trail", "Family Line", "Jump Line", "Skills Park"],
    facilities: ["Bike School", "Rental Shop", "Mountain Restaurant", "Gondola"],
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
      phone: "+49-5476-6239",
      email: "info@bikepark-serfaus.de"
    },
    price: {
      amount: 40,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Stay on Marked Trails", "Respect Alpine Environment"],
    photos: ["https://example.com/serfaus1.jpg", "https://example.com/serfaus2.jpg"],
    videos: ["https://example.com/serfaus-video.mp4"],
    website: "https://www.bikepark-serfaus.com",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkserfaus",
      instagram: "https://instagram.com/bikeparkserfaus"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Bad Wildbad",
    description: "Technical bike park known for its challenging downhill courses",
    location: "Bad Wildbad, Germany",
    coordinates: { latitude: 48.7500, longitude: 8.5500 },
    imageUrl: "https://example.com/badwildbad.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["DH Track", "IXS Track", "Northshore", "Rock Garden"],
    facilities: ["Bike Service", "Equipment Shop", "Cafe", "Shuttle Service"],
    openingHours: {
      monday: "closed",
      tuesday: "10:00-17:00",
      wednesday: "10:00-17:00",
      thursday: "10:00-17:00",
      friday: "10:00-17:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+49-7081-92530",
      email: "info@bikepark-badwildbad.de"
    },
    price: {
      amount: 32,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Protective Gear Mandatory", "Advanced Riders Only"],
    photos: ["https://example.com/badwildbad1.jpg", "https://example.com/badwildbad2.jpg"],
    videos: ["https://example.com/badwildbad-video.mp4"],
    website: "https://www.bikepark-badwildbad.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkbadwildbad",
      instagram: "https://instagram.com/bikeparkbadwildbad"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Ochsenkopf",
    description: "Natural bike park in the Fichtel Mountains with diverse terrain",
    location: "Fichtelberg, Germany",
    coordinates: { latitude: 50.0333, longitude: 11.8000 },
    imageUrl: "https://example.com/ochsenkopf.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Natural Trail", "Flow Line", "Skills Area", "Cross Country"],
    facilities: ["Bike Rental", "Workshop", "Kiosk", "Parking"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+49-9276-603960",
      email: "info@bikepark-ochsenkopf.de"
    },
    price: {
      amount: 28,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Nature Conservation", "Trail Etiquette"],
    photos: ["https://example.com/ochsenkopf1.jpg", "https://example.com/ochsenkopf2.jpg"],
    videos: ["https://example.com/ochsenkopf-video.mp4"],
    website: "https://www.bikepark-ochsenkopf.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkochsenkopf",
      instagram: "https://instagram.com/bikeparkochsenkopf"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Schöneck",
    description: "Modern bike park with a focus on progression and learning",
    location: "Schöneck, Germany",
    coordinates: { latitude: 50.3833, longitude: 12.3167 },
    imageUrl: "https://example.com/schoneck.jpg",
    status: "open",
    difficulty: "beginner",
    features: ["Learning Area", "Blue Line", "Red Line", "Pump Track"],
    facilities: ["Bike School", "Rental Station", "Restaurant", "Shop"],
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
      phone: "+49-37464-17666",
      email: "info@bikepark-schoeneck.de"
    },
    price: {
      amount: 25,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Beginner Friendly", "Coaching Available"],
    photos: ["https://example.com/schoneck1.jpg", "https://example.com/schoneck2.jpg"],
    videos: ["https://example.com/schoneck-video.mp4"],
    website: "https://www.bikepark-schoeneck.de",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkschoeneck",
      instagram: "https://instagram.com/bikeparkschoeneck"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Bikepark Leogang",
    description: "World Cup venue known for its technical downhill tracks and modern facilities",
    location: "Leogang, Austria",
    coordinates: { latitude: 47.4258, longitude: 12.7481 },
    imageUrl: "https://example.com/leogang.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup Track", "Pro Line", "Flow Trail", "Northshore"],
    facilities: ["Pro Shop", "Bike School", "Service Center", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:30",
      sunday: "09:00-17:30"
    },
    contact: {
      phone: "+43-6583-8219",
      email: "info@bikepark-leogang.com"
    },
    price: {
      amount: 47,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Protection Mandatory", "No Solo Riding on Pro Lines"],
    photos: ["https://example.com/leogang1.jpg", "https://example.com/leogang2.jpg"],
    videos: ["https://example.com/leogang-video.mp4"],
    website: "https://www.bikepark-leogang.com",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkLeogang",
      instagram: "https://instagram.com/bikepark_leogang"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Schladming",
    description: "Extensive bike park with stunning views of the Dachstein mountains",
    location: "Schladming, Austria",
    coordinates: { latitude: 47.3950, longitude: 13.6891 },
    imageUrl: "https://example.com/schladming.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Downhill Tracks", "Flow Country Trail", "Pump Track", "Skills Area"],
    facilities: ["Bike Rental", "Bike School", "Workshop", "Mountain Restaurant"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+43-3687-23310",
      email: "info@bikepark-schladming.at"
    },
    price: {
      amount: 42,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Protective Gear Recommended", "Follow Trail Signs"],
    photos: ["https://example.com/schladming1.jpg", "https://example.com/schladming2.jpg"],
    videos: ["https://example.com/schladming-video.mp4"],
    website: "https://www.bikepark-schladming.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkSchladming",
      instagram: "https://instagram.com/bikepark_schladming"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Innsbruck",
    description: "Urban bike park with easy access from the city center",
    location: "Innsbruck, Austria",
    coordinates: { latitude: 47.2692, longitude: 11.4041 },
    imageUrl: "https://example.com/innsbruck.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["City View Trail", "Jump Line", "Skills Park", "Urban Features"],
    facilities: ["Bike Shop", "Training Area", "Cafe", "City Shuttle"],
    openingHours: {
      monday: "10:00-19:00",
      tuesday: "10:00-19:00",
      wednesday: "10:00-19:00",
      thursday: "10:00-19:00",
      friday: "10:00-19:00",
      saturday: "09:00-19:00",
      sunday: "09:00-19:00"
    },
    contact: {
      phone: "+43-512-53560",
      email: "info@bikepark-innsbruck.at"
    },
    price: {
      amount: 35,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Urban Riding Etiquette", "Respect Local Residents"],
    photos: ["https://example.com/innsbruck1.jpg", "https://example.com/innsbruck2.jpg"],
    videos: ["https://example.com/innsbruck-video.mp4"],
    website: "https://www.bikepark-innsbruck.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkInnsbruck",
      instagram: "https://instagram.com/bikepark_innsbruck"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Wagrain",
    description: "Family-friendly bike park with progressive learning areas",
    location: "Wagrain, Austria",
    coordinates: { latitude: 47.3319, longitude: 13.3039 },
    imageUrl: "https://example.com/wagrain.jpg",
    status: "open",
    difficulty: "beginner",
    features: ["Learning Trail", "Family Line", "Easy Jumps", "Practice Area"],
    facilities: ["Beginner School", "Kids Rental", "Family Restaurant", "Practice Lift"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+43-6413-8223",
      email: "info@bikepark-wagrain.at"
    },
    price: {
      amount: 32,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Parents Supervision for Kids", "Beginner-Friendly Environment"],
    photos: ["https://example.com/wagrain1.jpg", "https://example.com/wagrain2.jpg"],
    videos: ["https://example.com/wagrain-video.mp4"],
    website: "https://www.bikepark-wagrain.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkWagrain",
      instagram: "https://instagram.com/bikepark_wagrain"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Semmering",
    description: "Historic bike park with modern trail design near Vienna",
    location: "Semmering, Austria",
    coordinates: { latitude: 47.6297, longitude: 15.8297 },
    imageUrl: "https://example.com/semmering.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Classic DH", "Modern Flow", "Technical Trail", "Old School Line"],
    facilities: ["Historic Lodge", "Bike Service", "Traditional Restaurant", "Vintage Lift"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+43-2664-8038",
      email: "info@bikepark-semmering.at"
    },
    price: {
      amount: 38,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Respect Historic Sites", "Traditional Trail Ethics"],
    photos: ["https://example.com/semmering1.jpg", "https://example.com/semmering2.jpg"],
    videos: ["https://example.com/semmering-video.mp4"],
    website: "https://www.bikepark-semmering.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkSemmering",
      instagram: "https://instagram.com/bikepark_semmering"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Kirchberg",
    description: "Varied terrain with spectacular Kitzbühel Alps views",
    location: "Kirchberg, Austria",
    coordinates: { latitude: 47.4456, longitude: 12.3161 },
    imageUrl: "https://example.com/kirchberg.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Alpine Trail", "Flow Line", "Natural Obstacles", "Scenic Routes"],
    facilities: ["Mountain Station", "Bike Rental", "Alpine Restaurant", "Photo Point"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+43-5357-2000",
      email: "info@bikepark-kirchberg.at"
    },
    price: {
      amount: 39,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Environmental Protection"],
    photos: ["https://example.com/kirchberg1.jpg", "https://example.com/kirchberg2.jpg"],
    videos: ["https://example.com/kirchberg-video.mp4"],
    website: "https://www.bikepark-kirchberg.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkKirchberg",
      instagram: "https://instagram.com/bikepark_kirchberg"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Brandnertal",
    description: "Modern bike park with focus on progression and skill development",
    location: "Brand, Austria",
    coordinates: { latitude: 47.1275, longitude: 9.7333 },
    imageUrl: "https://example.com/brandnertal.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Progress Line", "Skills Track", "Jump Garden", "Technique Area"],
    facilities: ["Training Center", "Video Analysis", "Modern Lodge", "Coaching Area"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+43-5559-23140",
      email: "info@bikepark-brandnertal.at"
    },
    price: {
      amount: 36,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Progress-Based Access", "Coaching Available"],
    photos: ["https://example.com/brandnertal1.jpg", "https://example.com/brandnertal2.jpg"],
    videos: ["https://example.com/brandnertal-video.mp4"],
    website: "https://www.bikepark-brandnertal.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkBrandnertal",
      instagram: "https://instagram.com/bikepark_brandnertal"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Zauberberg",
    description: "Magical mountain setting with trails for all abilities",
    location: "Semmering, Austria",
    coordinates: { latitude: 47.6297, longitude: 15.8297 },
    imageUrl: "https://example.com/zauberberg.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Magic Line", "Enchanted Trail", "Forest Jump", "Night Riding"],
    facilities: ["Night Lights", "Forest Lodge", "Mystical Cafe", "Evening Rentals"],
    openingHours: {
      monday: "10:00-22:00",
      tuesday: "10:00-22:00",
      wednesday: "10:00-22:00",
      thursday: "10:00-22:00",
      friday: "10:00-22:00",
      saturday: "09:00-22:00",
      sunday: "09:00-22:00"
    },
    contact: {
      phone: "+43-2664-8038",
      email: "info@bikepark-zauberberg.at"
    },
    price: {
      amount: 40,
      currency: "EUR"
    },
    rules: ["Lights Required for Night Riding", "Helmet Mandatory", "Evening Safety Rules"],
    photos: ["https://example.com/zauberberg1.jpg", "https://example.com/zauberberg2.jpg"],
    videos: ["https://example.com/zauberberg-video.mp4"],
    website: "https://www.bikepark-zauberberg.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkZauberberg",
      instagram: "https://instagram.com/bikepark_zauberberg"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bikepark Tirol",
    description: "Heart of the Alps with diverse riding options",
    location: "Steinach am Brenner, Austria",
    coordinates: { latitude: 47.0793, longitude: 11.4647 },
    imageUrl: "https://example.com/tirol.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine DH", "Glacier View", "Mountain Cross", "High Altitude Line"],
    facilities: ["Mountain Hub", "Altitude Training", "Panorama Restaurant", "Pro Shop"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:30-16:30",
      sunday: "08:30-16:30"
    },
    contact: {
      phone: "+43-5272-6333",
      email: "info@bikepark-tirol.at"
    },
    price: {
      amount: 43,
      currency: "EUR"
    },
    rules: ["High Altitude Safety", "Weather Check Required", "Alpine Equipment Needed"],
    photos: ["https://example.com/tirol1.jpg", "https://example.com/tirol2.jpg"],
    videos: ["https://example.com/tirol-video.mp4"],
    website: "https://www.bikepark-tirol.at",
    socialMedia: {
      facebook: "https://facebook.com/BikeparkTirol",
      instagram: "https://instagram.com/bikepark_tirol"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Bike Park Morzine",
    description: "Part of the Portes du Soleil network with legendary freeride trails",
    location: "Morzine, France",
    coordinates: { latitude: 46.1789, longitude: 6.7089 },
    imageUrl: "https://example.com/morzine.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Freeride Trails", "Natural Singles", "North Shore", "Drop Zone"],
    facilities: ["Bike Shop", "Rental Center", "Skills Area", "Mountain Restaurant"],
    openingHours: {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-18:00",
      saturday: "08:30-18:30",
      sunday: "08:30-18:30"
    },
    contact: {
      phone: "+33-450-74-72-72",
      email: "info@morzine-avoriaz.com"
    },
    price: {
      amount: 38,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Full Protection Recommended", "Respect Trail Signs"],
    photos: ["https://example.com/morzine1.jpg", "https://example.com/morzine2.jpg"],
    videos: ["https://example.com/morzine-video.mp4"],
    website: "https://www.morzine-avoriaz.com",
    socialMedia: {
      facebook: "https://facebook.com/morzinebikepark",
      instagram: "https://instagram.com/morzinebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Châtel",
    description: "Famous for its diverse trail network and international competitions",
    location: "Châtel, France",
    coordinates: { latitude: 46.2697, longitude: 6.8397 },
    imageUrl: "https://example.com/chatel.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Competition Tracks", "Jump Lines", "Wooden Features", "Beginner Area"],
    facilities: ["Bike School", "Equipment Rental", "Repair Shop", "Cafe"],
    openingHours: {
      monday: "09:30-17:30",
      tuesday: "09:30-17:30",
      wednesday: "09:30-17:30",
      thursday: "09:30-17:30",
      friday: "09:30-17:30",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+33-450-73-34-24",
      email: "info@chatel.com"
    },
    price: {
      amount: 35,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Back Protector Required", "Follow Trail Direction"],
    photos: ["https://example.com/chatel1.jpg", "https://example.com/chatel2.jpg"],
    videos: ["https://example.com/chatel-video.mp4"],
    website: "https://www.chatel.com",
    socialMedia: {
      facebook: "https://facebook.com/chatelbikepark",
      instagram: "https://instagram.com/chatelbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Les 2 Alpes Bike Park",
    description: "High-altitude bike park with glacier views and year-round riding",
    location: "Les Deux Alpes, France",
    coordinates: { latitude: 45.0167, longitude: 6.1167 },
    imageUrl: "https://example.com/les2alpes.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Glacier View Trail", "Enduro Lines", "Alpine Single Tracks", "Snow Line"],
    facilities: ["High Altitude Station", "Pro Shop", "Medical Center", "Gondola"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+33-476-79-22-00",
      email: "info@les2alpes.com"
    },
    price: {
      amount: 42,
      currency: "EUR"
    },
    rules: ["Full Face Required", "Alpine Safety Equipment", "Weather Check Mandatory"],
    photos: ["https://example.com/les2alpes1.jpg", "https://example.com/les2alpes2.jpg"],
    videos: ["https://example.com/les2alpes-video.mp4"],
    website: "https://www.les2alpes.com",
    socialMedia: {
      facebook: "https://facebook.com/les2alpesbikepark",
      instagram: "https://instagram.com/les2alpesbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park La Bresse",
    description: "The Vosges mountains' premier bike park with technical trails",
    location: "La Bresse, France",
    coordinates: { latitude: 48.0047, longitude: 6.8789 },
    imageUrl: "https://example.com/labresse.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Technical DH", "Rock Gardens", "Forest Lines", "Race Track"],
    facilities: ["Bike Wash", "Technical Area", "Restaurant", "Parking"],
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
      phone: "+33-329-25-68-78",
      email: "info@labresse.fr"
    },
    price: {
      amount: 32,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Protection Mandatory", "Trail Etiquette"],
    photos: ["https://example.com/labresse1.jpg", "https://example.com/labresse2.jpg"],
    videos: ["https://example.com/labresse-video.mp4"],
    website: "https://www.labresse.fr",
    socialMedia: {
      facebook: "https://facebook.com/labressebikepark",
      instagram: "https://instagram.com/labressebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Val d'Isère",
    description: "High-alpine bike park with stunning mountain scenery",
    location: "Val d'Isère, France",
    coordinates: { latitude: 45.4500, longitude: 6.9000 },
    imageUrl: "https://example.com/valdisere.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Alpine Trails", "Flow Lines", "Panoramic Routes", "Skills Park"],
    facilities: ["Alpine Center", "Bike Rental", "Mountain Restaurant", "First Aid"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+33-479-06-00-35",
      email: "info@valdisere.com"
    },
    price: {
      amount: 37,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Mountain Safety Rules", "Environmental Protection"],
    photos: ["https://example.com/valdisere1.jpg", "https://example.com/valdisere2.jpg"],
    videos: ["https://example.com/valdisere-video.mp4"],
    website: "https://www.valdisere.com",
    socialMedia: {
      facebook: "https://facebook.com/valdiserebikepark",
      instagram: "https://instagram.com/valdiserebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Les Arcs",
    description: "Extensive network of trails in the Paradiski area",
    location: "Les Arcs, France",
    coordinates: { latitude: 45.5722, longitude: 6.7833 },
    imageUrl: "https://example.com/lesarcs.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Enduro Trails", "Family Lines", "Cross-Country", "Pump Track"],
    facilities: ["Bike Center", "Training Area", "Restaurant", "Shop"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-17:30",
      sunday: "09:00-17:30"
    },
    contact: {
      phone: "+33-479-07-12-57",
      email: "info@lesarcs.com"
    },
    price: {
      amount: 34,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Trail Map Required", "Respect Nature"],
    photos: ["https://example.com/lesarcs1.jpg", "https://example.com/lesarcs2.jpg"],
    videos: ["https://example.com/lesarcs-video.mp4"],
    website: "https://www.lesarcs.com",
    socialMedia: {
      facebook: "https://facebook.com/lesarcsbikepark",
      instagram: "https://instagram.com/lesarcsbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Alpe d'Huez",
    description: "Famous Tour de France climb turned mountain bike paradise",
    location: "Alpe d'Huez, France",
    coordinates: { latitude: 45.0906, longitude: 6.0706 },
    imageUrl: "https://example.com/alpedhuez.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Tour de France Trail", "DH Tracks", "Enduro Routes", "XC Trails"],
    facilities: ["Historic Center", "Bike Service", "Cafe", "Museum"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+33-476-11-44-44",
      email: "info@alpedhuez.com"
    },
    price: {
      amount: 36,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Historic Trail Respect", "Cycling Heritage"],
    photos: ["https://example.com/alpedhuez1.jpg", "https://example.com/alpedhuez2.jpg"],
    videos: ["https://example.com/alpedhuez-video.mp4"],
    website: "https://www.alpedhuez.com",
    socialMedia: {
      facebook: "https://facebook.com/alpedhuezbikepark",
      instagram: "https://instagram.com/alpedhuezbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Font-Romeu",
    description: "Pyrenean bike park with Mediterranean climate",
    location: "Font-Romeu, France",
    coordinates: { latitude: 42.5069, longitude: 2.0347 },
    imageUrl: "https://example.com/fontromeu.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Mediterranean Trails", "Sun Trail", "Mountain Cross", "Learning Area"],
    facilities: ["Sun Terrace", "Bike School", "Mediterranean Restaurant", "Shop"],
    openingHours: {
      monday: "09:30-17:30",
      tuesday: "09:30-17:30",
      wednesday: "09:30-17:30",
      thursday: "09:30-17:30",
      friday: "09:30-17:30",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+33-468-30-68-30",
      email: "info@font-romeu.fr"
    },
    price: {
      amount: 33,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Sun Protection", "Water Required"],
    photos: ["https://example.com/fontromeu1.jpg", "https://example.com/fontromeu2.jpg"],
    videos: ["https://example.com/fontromeu-video.mp4"],
    website: "https://www.font-romeu.fr",
    socialMedia: {
      facebook: "https://facebook.com/fontromeubike",
      instagram: "https://instagram.com/fontromeubike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Super-Besse",
    description: "Volcanic terrain bike park in the Massif Central",
    location: "Super-Besse, France",
    coordinates: { latitude: 45.5117, longitude: 2.8442 },
    imageUrl: "https://example.com/superbesse.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Volcanic Trail", "Lava Line", "Crater Jump", "Volcanic Flow"],
    facilities: ["Volcanic Center", "Unique Terrain Park", "Themed Restaurant", "Geology Station"],
    openingHours: {
      monday: "09:30-17:00",
      tuesday: "09:30-17:00",
      wednesday: "09:30-17:00",
      thursday: "09:30-17:00",
      friday: "09:30-17:00",
      saturday: "09:00-17:30",
      sunday: "09:00-17:30"
    },
    contact: {
      phone: "+33-473-79-60-03",
      email: "info@superbesse.com"
    },
    price: {
      amount: 31,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Volcanic Rock Warning", "Stay on Marked Trails"],
    photos: ["https://example.com/superbesse1.jpg", "https://example.com/superbesse2.jpg"],
    videos: ["https://example.com/superbesse-video.mp4"],
    website: "https://www.superbesse.com",
    socialMedia: {
      facebook: "https://facebook.com/superbessebikepark",
      instagram: "https://instagram.com/superbessebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Bike Park Val di Sole",
    description: "Home of the UCI Mountain Bike World Cup with legendary downhill tracks",
    location: "Val di Sole, Trentino, Italy",
    coordinates: { latitude: 46.3167, longitude: 10.6833 },
    imageUrl: "https://example.com/valdisole.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup Track", "Pro Lines", "Technical DH", "Training Area"],
    facilities: ["Pro Workshop", "Race Support", "Medical Center", "Athletes' Area"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+39-0463-903160",
      email: "info@valdisolebikepark.com"
    },
    price: {
      amount: 42,
      currency: "EUR"
    },
    rules: ["Full Face Mandatory", "Protection Required", "Race Rules Apply"],
    photos: ["https://example.com/valdisole1.jpg", "https://example.com/valdisole2.jpg"],
    videos: ["https://example.com/valdisole-video.mp4"],
    website: "https://www.valdisolebikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/valdisolebike",
      instagram: "https://instagram.com/valdisolebike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Pila",
    description: "Scenic bike park in the Aosta Valley with stunning Mont Blanc views",
    location: "Pila, Aosta Valley, Italy",
    coordinates: { latitude: 45.7333, longitude: 7.3167 },
    imageUrl: "https://example.com/pila.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine DH", "Freeride", "Natural Trails", "Panoramic Routes"],
    facilities: ["Bike School", "Equipment Rental", "Mountain Restaurant", "Photo Point"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+39-0165-521148",
      email: "info@pila.it"
    },
    price: {
      amount: 35,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Environmental Protection"],
    photos: ["https://example.com/pila1.jpg", "https://example.com/pila2.jpg"],
    videos: ["https://example.com/pila-video.mp4"],
    website: "https://www.pila.it",
    socialMedia: {
      facebook: "https://facebook.com/pilabikepark",
      instagram: "https://instagram.com/pilabikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Dolomiti Paganella",
    description: "Modern bike park in the heart of the Dolomites with varied terrain",
    location: "Andalo, Trentino, Italy",
    coordinates: { latitude: 46.1667, longitude: 11.0000 },
    imageUrl: "https://example.com/paganella.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Lines", "Jump Park", "Skills Area", "Family Trails"],
    facilities: ["Bike Academy", "Rental Center", "Service Point", "Kids Area"],
    openingHours: {
      monday: "09:00-17:30",
      tuesday: "09:00-17:30",
      wednesday: "09:00-17:30",
      thursday: "09:00-17:30",
      friday: "09:00-17:30",
      saturday: "08:30-18:00",
      sunday: "08:30-18:00"
    },
    contact: {
      phone: "+39-0461-585588",
      email: "info@paganellabike.com"
    },
    price: {
      amount: 38,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Respect Nature", "Follow Trail Signs"],
    photos: ["https://example.com/paganella1.jpg", "https://example.com/paganella2.jpg"],
    videos: ["https://example.com/paganella-video.mp4"],
    website: "https://www.paganellabike.com",
    socialMedia: {
      facebook: "https://facebook.com/paganellabike",
      instagram: "https://instagram.com/paganellabike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Bardonecchia",
    description: "Historic bike park near the French border with Olympic heritage",
    location: "Bardonecchia, Piedmont, Italy",
    coordinates: { latitude: 45.0833, longitude: 6.7000 },
    imageUrl: "https://example.com/bardonecchia.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Olympic Track", "Technical Trails", "Cross-Border Routes", "Training Zones"],
    facilities: ["Olympic Center", "Bike Shop", "Medical Station", "International Lodge"],
    openingHours: {
      monday: "09:30-17:00",
      tuesday: "09:30-17:00",
      wednesday: "09:30-17:00",
      thursday: "09:30-17:00",
      friday: "09:30-17:00",
      saturday: "09:00-17:30",
      sunday: "09:00-17:30"
    },
    contact: {
      phone: "+39-0122-99137",
      email: "info@bardonecchiabike.com"
    },
    price: {
      amount: 36,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Olympic Rules Apply", "International Standards"],
    photos: ["https://example.com/bardonecchia1.jpg", "https://example.com/bardonecchia2.jpg"],
    videos: ["https://example.com/bardonecchia-video.mp4"],
    website: "https://www.bardonecchiabike.com",
    socialMedia: {
      facebook: "https://facebook.com/bardonecchiabike",
      instagram: "https://instagram.com/bardonecchiabike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park San Romedio",
    description: "Family-friendly bike park in South Tyrol with progressive learning",
    location: "San Romedio, South Tyrol, Italy",
    coordinates: { latitude: 46.3667, longitude: 11.1833 },
    imageUrl: "https://example.com/sanromedio.jpg",
    status: "open",
    difficulty: "beginner",
    features: ["Learning Trails", "Progressive Lines", "Kids Zone", "Practice Areas"],
    facilities: ["Family Center", "Beginner School", "Safe Zone", "Children's Area"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+39-0463-530310",
      email: "info@sanromediobike.it"
    },
    price: {
      amount: 30,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Family-Friendly Environment", "Safety First"],
    photos: ["https://example.com/sanromedio1.jpg", "https://example.com/sanromedio2.jpg"],
    videos: ["https://example.com/sanromedio-video.mp4"],
    website: "https://www.sanromediobike.it",
    socialMedia: {
      facebook: "https://facebook.com/sanromediobike",
      instagram: "https://instagram.com/sanromediobike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Monte Tamaro",
    description: "Swiss-Italian border bike park with unique terrain features",
    location: "Monte Tamaro, Ticino, Italy",
    coordinates: { latitude: 46.1000, longitude: 8.8667 },
    imageUrl: "https://example.com/tamaro.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Border Trail", "Alpine Flow", "Lake View Track", "International Line"],
    facilities: ["International Hub", "Customs Point", "Lake View Restaurant", "Border Shop"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+39-091-946-2228",
      email: "info@tamarobike.com"
    },
    price: {
      amount: 39,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Cross-Border Rules", "Lake Protection"],
    photos: ["https://example.com/tamaro1.jpg", "https://example.com/tamaro2.jpg"],
    videos: ["https://example.com/tamaro-video.mp4"],
    website: "https://www.tamarobike.com",
    socialMedia: {
      facebook: "https://facebook.com/tamarobikepark",
      instagram: "https://instagram.com/tamarobikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Etna",
    description: "Volcanic bike park with unique lava trail features",
    location: "Mount Etna, Sicily, Italy",
    coordinates: { latitude: 37.7500, longitude: 14.9933 },
    imageUrl: "https://example.com/etna.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Volcanic Trails", "Lava Flow Lines", "Crater Views", "Ash Jumps"],
    facilities: ["Volcano Center", "Geological Station", "Safety Hub", "Emergency Point"],
    openingHours: {
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "08:00-16:00",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "08:00-16:30",
      sunday: "08:00-16:30"
    },
    contact: {
      phone: "+39-095-914-1280",
      email: "info@etnabikepark.it"
    },
    price: {
      amount: 40,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Volcanic Safety Rules", "Guide Required"],
    photos: ["https://example.com/etna1.jpg", "https://example.com/etna2.jpg"],
    videos: ["https://example.com/etna-video.mp4"],
    website: "https://www.etnabikepark.it",
    socialMedia: {
      facebook: "https://facebook.com/etnabikepark",
      instagram: "https://instagram.com/etnabikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Sestriere",
    description: "High-altitude bike park in the Piedmont region with Olympic history",
    location: "Sestriere, Piedmont, Italy",
    coordinates: { latitude: 44.9578, longitude: 6.8786 },
    imageUrl: "https://example.com/sestriere.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Olympic Routes", "High Altitude Lines", "Competition Track", "Training Zones"],
    facilities: ["Olympic Village", "Pro Shop", "High Altitude Center", "Training Camp"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "08:30-17:00",
      sunday: "08:30-17:00"
    },
    contact: {
      phone: "+39-0122-755444",
      email: "info@sestrierebikepark.com"
    },
    price: {
      amount: 41,
      currency: "EUR"
    },
    rules: ["Full Face Required", "High Altitude Protocol", "Competition Standards"],
    photos: ["https://example.com/sestriere1.jpg", "https://example.com/sestriere2.jpg"],
    videos: ["https://example.com/sestriere-video.mp4"],
    website: "https://www.sestrierebikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/sestrierebikepark",
      instagram: "https://instagram.com/sestrierebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Madesimo",
    description: "Alpine bike park near Lake Como with stunning mountain scenery",
    location: "Madesimo, Lombardy, Italy",
    coordinates: { latitude: 46.4333, longitude: 9.3500 },
    imageUrl: "https://example.com/madesimo.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Lake View Trails", "Alpine Routes", "Mountain Cross", "Scenic Lines"],
    facilities: ["Lake Center", "Alpine School", "Panorama Restaurant", "Mountain Hub"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+39-0343-53015",
      email: "info@madesimopark.it"
    },
    price: {
      amount: 37,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Lake Protection Rules", "Mountain Safety"],
    photos: ["https://example.com/madesimo1.jpg", "https://example.com/madesimo2.jpg"],
    videos: ["https://example.com/madesimo-video.mp4"],
    website: "https://www.madesimopark.it",
    socialMedia: {
      facebook: "https://facebook.com/madesimopark",
      instagram: "https://instagram.com/madesimopark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Revolution Bike Park",
    description: "Legendary Welsh bike park known for its extreme downhill tracks",
    location: "Llangynog, Wales, UK",
    coordinates: { latitude: 52.8261, longitude: -3.4291 },
    imageUrl: "https://example.com/revolution.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Extreme DH", "Pro Lines", "Big Jumps", "Technical Sections"],
    facilities: ["Uplift Service", "Basic Shop", "Parking", "First Aid"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1691-860360",
      email: "ride@revolutionbikepark.co.uk"
    },
    price: {
      amount: 40,
      currency: "GBP"
    },
    rules: ["Full Face Mandatory", "Body Armor Required", "Advanced Riders Only"],
    photos: ["https://example.com/revolution1.jpg", "https://example.com/revolution2.jpg"],
    videos: ["https://example.com/revolution-video.mp4"],
    website: "https://www.revolutionbikepark.co.uk",
    socialMedia: {
      facebook: "https://facebook.com/revolutionbikepark",
      instagram: "https://instagram.com/revolutionbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Fort William",
    description: "Home of the UCI Mountain Bike World Cup with legendary downhill track",
    location: "Fort William, Scotland, UK",
    coordinates: { latitude: 56.8198, longitude: -5.1052 },
    imageUrl: "https://example.com/fortwilliam.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup Track", "Gondola Access", "Training Area", "Pro Lines"],
    facilities: ["Pro Shop", "Bike Hire", "Cafe", "World Cup Facilities"],
    openingHours: {
      monday: "10:00-16:30",
      tuesday: "10:00-16:30",
      wednesday: "10:00-16:30",
      thursday: "10:00-16:30",
      friday: "10:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1397-705825",
      email: "info@fortwilliambikepark.co.uk"
    },
    price: {
      amount: 37,
      currency: "GBP"
    },
    rules: ["Full Face Required", "Protection Mandatory", "World Cup Standards"],
    photos: ["https://example.com/fortwilliam1.jpg", "https://example.com/fortwilliam2.jpg"],
    videos: ["https://example.com/fortwilliam-video.mp4"],
    website: "https://www.fortwilliambikepark.co.uk",
    socialMedia: {
      facebook: "https://facebook.com/fortwilliambikepark",
      instagram: "https://instagram.com/fortwilliambikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Scotland",
    description: "Purpose-built bike park in the Scottish Borders with progressive features",
    location: "Innerleithen, Scotland, UK",
    coordinates: { latitude: 55.6167, longitude: -3.0667 },
    imageUrl: "https://example.com/bikeparkscotland.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Jump Lines", "Flow Trails", "Skills Area", "Progressive Features"],
    facilities: ["Shop", "Coaching", "Cafe", "Parking"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1896-831429",
      email: "info@bikeparkscotland.com"
    },
    price: {
      amount: 32,
      currency: "GBP"
    },
    rules: ["Helmet Required", "Gloves Recommended", "Progressive System"],
    photos: ["https://example.com/bikeparkscotland1.jpg", "https://example.com/bikeparkscotland2.jpg"],
    videos: ["https://example.com/bikeparkscotland-video.mp4"],
    website: "https://www.bikeparkscotland.com",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkscotland",
      instagram: "https://instagram.com/bikeparkscotland"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Antur Stiniog",
    description: "Welsh gravity bike park with stunning Snowdonia views",
    location: "Blaenau Ffestiniog, Wales, UK",
    coordinates: { latitude: 52.9958, longitude: -3.9425 },
    imageUrl: "https://example.com/anturstiniog.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Downhill Tracks", "Rocky Terrain", "Welsh Slate", "Natural Features"],
    facilities: ["Uplift Service", "Bike Shop", "Cafe", "Training Area"],
    openingHours: {
      monday: "closed",
      tuesday: "10:00-16:00",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1766-832214",
      email: "ride@anturstiniog.com"
    },
    price: {
      amount: 35,
      currency: "GBP"
    },
    rules: ["Full Face Required", "Body Protection Mandatory", "Welsh Weather Ready"],
    photos: ["https://example.com/anturstiniog1.jpg", "https://example.com/anturstiniog2.jpg"],
    videos: ["https://example.com/anturstiniog-video.mp4"],
    website: "https://www.anturstiniog.com",
    socialMedia: {
      facebook: "https://facebook.com/anturstiniog",
      instagram: "https://instagram.com/anturstiniog"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bike Park Cornwall",
    description: "South West's premier bike park with coastal influence",
    location: "Newquay, Cornwall, UK",
    coordinates: { latitude: 50.4155, longitude: -5.0734 },
    imageUrl: "https://example.com/bikeparkcornwall.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Coastal Trails", "Jump Lines", "Flow Tracks", "Learning Area"],
    facilities: ["Bike Hire", "Beach Cafe", "Shop", "Coaching"],
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
      phone: "+44-1637-859294",
      email: "info@bikeparkcornwall.com"
    },
    price: {
      amount: 30,
      currency: "GBP"
    },
    rules: ["Helmet Required", "Coastal Protection", "Beach Etiquette"],
    photos: ["https://example.com/bikeparkcornwall1.jpg", "https://example.com/bikeparkcornwall2.jpg"],
    videos: ["https://example.com/bikeparkcornwall-video.mp4"],
    website: "https://www.bikeparkcornwall.com",
    socialMedia: {
      facebook: "https://facebook.com/bikeparkcornwall",
      instagram: "https://instagram.com/bikeparkcornwall"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Dyfi Bike Park",
    description: "Dan Atherton's legendary bike park with world-class features",
    location: "Machynlleth, Wales, UK",
    coordinates: { latitude: 52.5847, longitude: -3.8524 },
    imageUrl: "https://example.com/dyfi.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Pro Lines", "Atherton Features", "Natural Terrain", "Big Mountain"],
    facilities: ["Pro Shop", "Coaching", "Uplift", "Athlete Zone"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1654-703965",
      email: "ride@dyfibikpark.com"
    },
    price: {
      amount: 45,
      currency: "GBP"
    },
    rules: ["Full Face Required", "Advanced Skills Required", "Pro Standards"],
    photos: ["https://example.com/dyfi1.jpg", "https://example.com/dyfi2.jpg"],
    videos: ["https://example.com/dyfi-video.mp4"],
    website: "https://www.dyfibikpark.com",
    socialMedia: {
      facebook: "https://facebook.com/dyfibikpark",
      instagram: "https://instagram.com/dyfibikpark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Wind Hill B1kepark",
    description: "Modern bike park with focus on progression and skills development",
    location: "Longleat, Wiltshire, UK",
    coordinates: { latitude: 51.1855, longitude: -2.2766 },
    imageUrl: "https://example.com/windhill.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Progressive Jumps", "Skills Area", "Flow Trails", "Training Zone"],
    facilities: ["Skills Center", "Bike Shop", "Cafe", "Training Facility"],
    openingHours: {
      monday: "closed",
      tuesday: "10:00-16:00",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+44-1985-844907",
      email: "info@windhillbikepark.com"
    },
    price: {
      amount: 33,
      currency: "GBP"
    },
    rules: ["Helmet Required", "Progress Check", "Skills Assessment"],
    photos: ["https://example.com/windhill1.jpg", "https://example.com/windhill2.jpg"],
    videos: ["https://example.com/windhill-video.mp4"],
    website: "https://www.windhillbikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/windhillbikepark",
      instagram: "https://instagram.com/windhillbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Chicksands Bike Park",
    description: "Historic dirt jump and freeride facility in Bedfordshire",
    location: "Chicksands, Bedfordshire, UK",
    coordinates: { latitude: 52.0391, longitude: -0.3750 },
    imageUrl: "https://example.com/chicksands.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Dirt Jumps", "Freeride Area", "Pump Track", "Old School Lines"],
    facilities: ["Basic Shop", "Parking", "Rest Area", "Training Zone"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "12:00-20:00",
      thursday: "12:00-20:00",
      friday: "12:00-20:00",
      saturday: "10:00-20:00",
      sunday: "10:00-20:00"
    },
    contact: {
      phone: "+44-1462-816990",
      email: "jump@chicksandsbikepark.com"
    },
    price: {
      amount: 25,
      currency: "GBP"
    },
    rules: ["Helmet Required", "Jump Etiquette", "Session Rules"],
    photos: ["https://example.com/chicksands1.jpg", "https://example.com/chicksands2.jpg"],
    videos: ["https://example.com/chicksands-video.mp4"],
    website: "https://www.chicksandsbikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/chicksandsbikepark",
      instagram: "https://instagram.com/chicksandsbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Hamsterley Forest Bike Park",
    description: "Natural forest bike park in County Durham with diverse trails",
    location: "Hamsterley Forest, County Durham, UK",
    coordinates: { latitude: 54.6833, longitude: -1.9000 },
    imageUrl: "https://example.com/hamsterley.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Forest Trails", "Natural Features", "XC Routes", "Skills Area"],
    facilities: ["Forest Center", "Bike Hire", "Cafe", "Forest Shop"],
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
      phone: "+44-1388-488312",
      email: "info@hamsterleyforest.com"
    },
    price: {
      amount: 28,
      currency: "GBP"
    },
    rules: ["Helmet Required", "Forest Rules", "Wildlife Protection"],
    photos: ["https://example.com/hamsterley1.jpg", "https://example.com/hamsterley2.jpg"],
    videos: ["https://example.com/hamsterley-video.mp4"],
    website: "https://www.hamsterleyforest.com",
    socialMedia: {
      facebook: "https://facebook.com/hamsterleyforest",
      instagram: "https://instagram.com/hamsterleyforest"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Angel Fire Bike Park",
    description: "New Mexico's premier bike park with high-altitude riding",
    location: "Angel Fire, New Mexico, USA",
    coordinates: { latitude: 36.3874, longitude: -105.2724 },
    imageUrl: "https://example.com/angelfire.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["High Altitude DH", "Flow Trails", "Technical Terrain", "Jump Lines"],
    facilities: ["Bike Shop", "Rental Center", "Lodge", "Medical Center"],
    openingHours: {
      monday: "10:00-16:30",
      tuesday: "10:00-16:30",
      wednesday: "10:00-16:30",
      thursday: "10:00-16:30",
      friday: "10:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-575-377-4320",
      email: "bikepark@angelfireresort.com"
    },
    price: {
      amount: 49,
      currency: "USD"
    },
    rules: ["Full Face Required", "High Altitude Warning", "Safety Equipment Mandatory"],
    photos: ["https://example.com/angelfire1.jpg", "https://example.com/angelfire2.jpg"],
    videos: ["https://example.com/angelfire-video.mp4"],
    website: "https://www.angelfireresort.com/bike",
    socialMedia: {
      facebook: "https://facebook.com/angelfirebikepark",
      instagram: "https://instagram.com/angelfirebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Highland Mountain Bike Park",
    description: "Dedicated bike park in New Hampshire with world-class facilities",
    location: "Northfield, New Hampshire, USA",
    coordinates: { latitude: 43.4445, longitude: -71.6090 },
    imageUrl: "https://example.com/highland.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Pro Jump Lines", "Learning Center", "Expert DH", "Progression Park"],
    facilities: ["Highland Training Center", "Pro Shop", "Cafe", "Coaching"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-603-286-7677",
      email: "info@highlandmountain.com"
    },
    price: {
      amount: 52,
      currency: "USD"
    },
    rules: ["Full Face Required", "Progression System", "Safety First"],
    photos: ["https://example.com/highland1.jpg", "https://example.com/highland2.jpg"],
    videos: ["https://example.com/highland-video.mp4"],
    website: "https://www.highlandmountain.com",
    socialMedia: {
      facebook: "https://facebook.com/highlandmountain",
      instagram: "https://instagram.com/highlandmountain",
      youtube: "https://youtube.com/highlandmountain"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Trestle Bike Park",
    description: "Colorado's premier bike park at Winter Park Resort",
    location: "Winter Park, Colorado, USA",
    coordinates: { latitude: 39.8868, longitude: -105.7625 },
    imageUrl: "https://example.com/trestle.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine DH", "Jump Trails", "Technical Routes", "Learning Zone"],
    facilities: ["Trestle Shop", "Rental Fleet", "Training Center", "Alpine Lodge"],
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
      phone: "+1-970-726-1564",
      email: "bikepark@winterparkresort.com"
    },
    price: {
      amount: 55,
      currency: "USD"
    },
    rules: ["Full Face Required", "Alpine Safety", "Trail Etiquette"],
    photos: ["https://example.com/trestle1.jpg", "https://example.com/trestle2.jpg"],
    videos: ["https://example.com/trestle-video.mp4"],
    website: "https://www.trestlebikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/trestlebikepark",
      instagram: "https://instagram.com/trestlebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mammoth Bike Park",
    description: "California's largest bike park with volcanic terrain",
    location: "Mammoth Lakes, California, USA",
    coordinates: { latitude: 37.6308, longitude: -119.0326 },
    imageUrl: "https://example.com/mammoth.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Volcanic DH", "Pro Lines", "Enduro Trails", "Beginner Zone"],
    facilities: ["Pro Shop", "High Altitude Center", "Medical Station", "Training Area"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:30-16:30",
      sunday: "08:30-16:30"
    },
    contact: {
      phone: "+1-760-934-2571",
      email: "bikepark@mammothmountain.com"
    },
    price: {
      amount: 59,
      currency: "USD"
    },
    rules: ["Full Face Required", "High Altitude Protocol", "Safety Gear Mandatory"],
    photos: ["https://example.com/mammoth1.jpg", "https://example.com/mammoth2.jpg"],
    videos: ["https://example.com/mammoth-video.mp4"],
    website: "https://www.mammothmountain.com/summer/bike-park",
    socialMedia: {
      facebook: "https://facebook.com/mammothbikepark",
      instagram: "https://instagram.com/mammothbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mountain Creek Bike Park",
    description: "East Coast's premier gravity park with diverse terrain",
    location: "Vernon, New Jersey, USA",
    coordinates: { latitude: 41.1819, longitude: -74.5134 },
    imageUrl: "https://example.com/mountaincreek.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["East Coast DH", "Technical Trails", "Drop Zone", "Skills Park"],
    facilities: ["Bike Shop", "Rental Center", "Training Facility", "First Aid"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-973-827-2000",
      email: "bikepark@mountaincreek.com"
    },
    price: {
      amount: 45,
      currency: "USD"
    },
    rules: ["Full Face Required", "East Coast Rules", "Protection Mandatory"],
    photos: ["https://example.com/mountaincreek1.jpg", "https://example.com/mountaincreek2.jpg"],
    videos: ["https://example.com/mountaincreek-video.mp4"],
    website: "https://www.mountaincreekbikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/mountaincreekbike",
      instagram: "https://instagram.com/mountaincreekbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Stevens Pass Bike Park",
    description: "Pacific Northwest bike park with legendary terrain",
    location: "Stevens Pass, Washington, USA",
    coordinates: { latitude: 47.7446, longitude: -121.0890 },
    imageUrl: "https://example.com/stevenspass.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["PNW Style", "Root Sections", "Technical DH", "Flow Trails"],
    facilities: ["Northwest Shop", "Repair Station", "Lodge", "Training Center"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-206-812-4510",
      email: "bikepark@stevenspass.com"
    },
    price: {
      amount: 48,
      currency: "USD"
    },
    rules: ["Full Face Required", "PNW Protocol", "Rain or Shine"],
    photos: ["https://example.com/stevenspass1.jpg", "https://example.com/stevenspass2.jpg"],
    videos: ["https://example.com/stevenspass-video.mp4"],
    website: "https://www.stevenspass.com/bike",
    socialMedia: {
      facebook: "https://facebook.com/stevenspassbike",
      instagram: "https://instagram.com/stevenspassbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Spider Mountain Bike Park",
    description: "Texas' only lift-served bike park with year-round riding",
    location: "Burnet, Texas, USA",
    coordinates: { latitude: 30.7577, longitude: -98.4189 },
    imageUrl: "https://example.com/spidermountain.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Texas Style", "Desert Lines", "Flow Trails", "Learning Area"],
    facilities: ["Texas Shop", "Cooling Station", "Cafe", "Training Zone"],
    openingHours: {
      monday: "closed",
      tuesday: "closed",
      wednesday: "10:00-17:00",
      thursday: "10:00-17:00",
      friday: "10:00-17:00",
      saturday: "09:00-18:00",
      sunday: "09:00-18:00"
    },
    contact: {
      phone: "+1-512-756-4878",
      email: "ride@spidermountain.com"
    },
    price: {
      amount: 42,
      currency: "USD"
    },
    rules: ["Helmet Required", "Heat Protocol", "Stay Hydrated"],
    photos: ["https://example.com/spidermountain1.jpg", "https://example.com/spidermountain2.jpg"],
    videos: ["https://example.com/spidermountain-video.mp4"],
    website: "https://www.spidermountain.com",
    socialMedia: {
      facebook: "https://facebook.com/spidermountainbike",
      instagram: "https://instagram.com/spidermountainbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Killington Bike Park",
    description: "Vermont's largest bike park with East Coast charm",
    location: "Killington, Vermont, USA",
    coordinates: { latitude: 43.6045, longitude: -72.8201 },
    imageUrl: "https://example.com/killington.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["East Coast Tech", "Flow Trails", "Drop Zone", "Skills Area"],
    facilities: ["Beast Shop", "Rental Center", "Lodge", "Training Facility"],
    openingHours: {
      monday: "10:00-16:00",
      tuesday: "10:00-16:00",
      wednesday: "10:00-16:00",
      thursday: "10:00-16:00",
      friday: "10:00-16:00",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-802-422-6200",
      email: "bikepark@killington.com"
    },
    price: {
      amount: 50,
      currency: "USD"
    },
    rules: ["Full Face Required", "Vermont Rules", "Trail Respect"],
    photos: ["https://example.com/killington1.jpg", "https://example.com/killington2.jpg"],
    videos: ["https://example.com/killington-video.mp4"],
    website: "https://www.killington.com/bike",
    socialMedia: {
      facebook: "https://facebook.com/killingtonbike",
      instagram: "https://instagram.com/killingtonbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Snowshoe Bike Park",
    description: "East Coast's largest bike park with World Cup history",
    location: "Snowshoe, West Virginia, USA",
    coordinates: { latitude: 38.4019, longitude: -79.9937 },
    imageUrl: "https://example.com/snowshoe.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Cup Track", "Eastern DH", "Flow Trails", "Skills Park"],
    facilities: ["Pro Shop", "World Cup Center", "Lodge", "Training Facility"],
    openingHours: {
      monday: "10:00-16:30",
      tuesday: "10:00-16:30",
      wednesday: "10:00-16:30",
      thursday: "10:00-16:30",
      friday: "10:00-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+1-304-572-1000",
      email: "bikepark@snowshoemtn.com"
    },
    price: {
      amount: 47,
      currency: "USD"
    },
    rules: ["Full Face Required", "World Cup Standards", "Safety First"],
    photos: ["https://example.com/snowshoe1.jpg", "https://example.com/snowshoe2.jpg"],
    videos: ["https://example.com/snowshoe-video.mp4"],
    website: "https://www.snowshoemtn.com/bike",
    socialMedia: {
      facebook: "https://facebook.com/snowshoebikepark",
      instagram: "https://instagram.com/snowshoebikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Australian Bike Parks
const australianBikeParks: IBikeParkSeed[] = [
  {
    name: "Thredbo MTB Park",
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
  {
    name: "Falls Creek Bike Park",
    description: "Victoria's premier alpine bike park with diverse terrain",
    location: "Falls Creek, Victoria, Australia",
    coordinates: { latitude: -36.8607, longitude: 147.2828 },
    imageUrl: "https://example.com/fallscreek.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine DH", "Flow Trails", "Technical Terrain", "Cross Country"],
    facilities: ["Bike Shop", "Rental Center", "Alpine Lodge", "Training Area"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+61-3-5758-1200",
      email: "bike@fallscreek.com.au"
    },
    price: {
      amount: 85,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Sun Protection"],
    photos: ["https://example.com/fallscreek1.jpg", "https://example.com/fallscreek2.jpg"],
    videos: ["https://example.com/fallscreek-video.mp4"],
    website: "https://www.fallscreek.com.au/bike",
    socialMedia: {
      facebook: "https://facebook.com/fallscreekbikepark",
      instagram: "https://instagram.com/fallscreekbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mt Buller Bike Park",
    description: "Historic Victorian bike park with world-class trails",
    location: "Mt Buller, Victoria, Australia",
    coordinates: { latitude: -37.1467, longitude: 146.4460 },
    imageUrl: "https://example.com/mtbuller.jpg",
    status: "open",
    difficulty: "pro",
    features: ["World Trail Design", "Epic Descents", "Skills Park", "XC Network"],
    facilities: ["Pro Shop", "Bike School", "Medical Center", "Village Access"],
    openingHours: {
      monday: "09:30-16:30",
      tuesday: "09:30-16:30",
      wednesday: "09:30-16:30",
      thursday: "09:30-16:30",
      friday: "09:30-16:30",
      saturday: "09:00-17:00",
      sunday: "09:00-17:00"
    },
    contact: {
      phone: "+61-3-5777-6077",
      email: "bike@mtbuller.com.au"
    },
    price: {
      amount: 82,
      currency: "AUD"
    },
    rules: ["Full Face Required", "Alpine Protocol", "Village Rules"],
    photos: ["https://example.com/mtbuller1.jpg", "https://example.com/mtbuller2.jpg"],
    videos: ["https://example.com/mtbuller-video.mp4"],
    website: "https://www.mtbuller.com.au/bike",
    socialMedia: {
      facebook: "https://facebook.com/mtbullerbikepark",
      instagram: "https://instagram.com/mtbullerbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Blue Derby Mountain Bike Park",
    description: "Tasmania's world-renowned trail network",
    location: "Derby, Tasmania, Australia",
    coordinates: { latitude: -41.1500, longitude: 147.8000 },
    imageUrl: "https://example.com/bluederby.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Trail Network", "Natural Features", "Flow Trails", "Technical Sections"],
    facilities: ["Trail Center", "Bike Shop", "Cafe", "Shuttle Service"],
    openingHours: {
      monday: "08:00-18:00",
      tuesday: "08:00-18:00",
      wednesday: "08:00-18:00",
      thursday: "08:00-18:00",
      friday: "08:00-18:00",
      saturday: "08:00-18:00",
      sunday: "08:00-18:00"
    },
    contact: {
      phone: "+61-3-6354-2345",
      email: "ride@bluederby.com.au"
    },
    price: {
      amount: 75,
      currency: "AUD"
    },
    rules: ["Trail Etiquette", "Environmental Care", "Safety First"],
    photos: ["https://example.com/bluederby1.jpg", "https://example.com/bluederby2.jpg"],
    videos: ["https://example.com/bluederby-video.mp4"],
    website: "https://www.ridebluederby.com.au",
    socialMedia: {
      facebook: "https://facebook.com/bluederbytrails",
      instagram: "https://instagram.com/bluederbytrails"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Maydena Bike Park",
    description: "Tasmania's gravity-focused bike park with massive vertical",
    location: "Maydena, Tasmania, Australia",
    coordinates: { latitude: -42.7528, longitude: 146.6011 },
    imageUrl: "https://example.com/maydena.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Gravity Trails", "Wilderness Setting", "Jump Lines", "Skills Zone"],
    facilities: ["Base Lodge", "Pro Shop", "Cafe", "Shuttle Service"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+61-3-6288-1191",
      email: "ride@maydenabikepark.com"
    },
    price: {
      amount: 89,
      currency: "AUD"
    },
    rules: ["Full Face Required", "Wilderness Protocol", "Safety Gear Mandatory"],
    photos: ["https://example.com/maydena1.jpg", "https://example.com/maydena2.jpg"],
    videos: ["https://example.com/maydena-video.mp4"],
    website: "https://www.maydenabikepark.com",
    socialMedia: {
      facebook: "https://facebook.com/maydenabike",
      instagram: "https://instagram.com/maydenabike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mt Stromlo Mountain Bike Park",
    description: "Canberra's Olympic-level bike park",
    location: "Canberra, ACT, Australia",
    coordinates: { latitude: -35.3167, longitude: 149.0000 },
    imageUrl: "https://example.com/stromlo.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["World Cup Track", "XC Trails", "Skills Park", "Race Venue"],
    facilities: ["Olympic Center", "Bike Shop", "Cafe", "Training Facility"],
    openingHours: {
      monday: "sunrise-sunset",
      tuesday: "sunrise-sunset",
      wednesday: "sunrise-sunset",
      thursday: "sunrise-sunset",
      friday: "sunrise-sunset",
      saturday: "sunrise-sunset",
      sunday: "sunrise-sunset"
    },
    contact: {
      phone: "+61-2-6207-8000",
      email: "info@stromloforestpark.com.au"
    },
    price: {
      amount: 0,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Trail Respect", "No Night Riding"],
    photos: ["https://example.com/stromlo1.jpg", "https://example.com/stromlo2.jpg"],
    videos: ["https://example.com/stromlo-video.mp4"],
    website: "https://www.stromloforestpark.com.au",
    socialMedia: {
      facebook: "https://facebook.com/stromlomtb",
      instagram: "https://instagram.com/stromlomtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "You Yangs Mountain Bike Park",
    description: "Melbourne's favorite mountain bike destination",
    location: "Little River, Victoria, Australia",
    coordinates: { latitude: -37.9500, longitude: 144.4167 },
    imageUrl: "https://example.com/youyangs.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["XC Network", "Technical Trails", "Rock Gardens", "Skills Area"],
    facilities: ["Trail Head", "Parking", "Picnic Area", "Information Center"],
    openingHours: {
      monday: "sunrise-sunset",
      tuesday: "sunrise-sunset",
      wednesday: "sunrise-sunset",
      thursday: "sunrise-sunset",
      friday: "sunrise-sunset",
      saturday: "sunrise-sunset",
      sunday: "sunrise-sunset"
    },
    contact: {
      phone: "+61-3-9250-1000",
      email: "info@youyangs.org"
    },
    price: {
      amount: 0,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Leave No Trace", "Wildlife Protection"],
    photos: ["https://example.com/youyangs1.jpg", "https://example.com/youyangs2.jpg"],
    videos: ["https://example.com/youyangs-video.mp4"],
    website: "https://www.parks.vic.gov.au/youyangs",
    socialMedia: {
      facebook: "https://facebook.com/youyangsmtb",
      instagram: "https://instagram.com/youyangsmtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Fox Creek Bike Park",
    description: "Adelaide Hills' premier mountain bike destination",
    location: "Fox Creek, South Australia, Australia",
    coordinates: { latitude: -35.0167, longitude: 138.7333 },
    imageUrl: "https://example.com/foxcreek.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Technical DH", "Jump Lines", "XC Network"],
    facilities: ["Trail Head", "Basic Facilities", "Parking", "Information Board"],
    openingHours: {
      monday: "sunrise-sunset",
      tuesday: "sunrise-sunset",
      wednesday: "sunrise-sunset",
      thursday: "sunrise-sunset",
      friday: "sunrise-sunset",
      saturday: "sunrise-sunset",
      sunday: "sunrise-sunset"
    },
    contact: {
      phone: "+61-8-8339-2444",
      email: "info@foxcreekbikepark.org.au"
    },
    price: {
      amount: 10,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Fire Danger Awareness", "Trail Etiquette"],
    photos: ["https://example.com/foxcreek1.jpg", "https://example.com/foxcreek2.jpg"],
    videos: ["https://example.com/foxcreek-video.mp4"],
    website: "https://www.foxcreekbikepark.org.au",
    socialMedia: {
      facebook: "https://facebook.com/foxcreekmtb",
      instagram: "https://instagram.com/foxcreekmtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Awaba Mountain Bike Park",
    description: "Hunter Valley's diverse trail network",
    location: "Awaba, New South Wales, Australia",
    coordinates: { latitude: -32.9833, longitude: 151.5667 },
    imageUrl: "https://example.com/awaba.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["XC Trails", "Technical Sections", "Skills Area", "Race Venue"],
    facilities: ["Trail Head", "Parking", "Basic Amenities", "Information Point"],
    openingHours: {
      monday: "sunrise-sunset",
      tuesday: "sunrise-sunset",
      wednesday: "sunrise-sunset",
      thursday: "sunrise-sunset",
      friday: "sunrise-sunset",
      saturday: "sunrise-sunset",
      sunday: "sunrise-sunset"
    },
    contact: {
      phone: "+61-2-4959-0000",
      email: "info@awababikepark.com.au"
    },
    price: {
      amount: 10,
      currency: "AUD"
    },
    rules: ["Helmet Required", "HMBA Membership", "Trail Care"],
    photos: ["https://example.com/awaba1.jpg", "https://example.com/awaba2.jpg"],
    videos: ["https://example.com/awaba-video.mp4"],
    website: "https://www.awababikepark.com.au",
    socialMedia: {
      facebook: "https://facebook.com/awabamtb",
      instagram: "https://instagram.com/awabamtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Falls Creek Bike Park",
    description: "Victoria's premier alpine bike park with diverse terrain",
    location: "Falls Creek, Victoria, Australia",
    coordinates: { latitude: -36.8607, longitude: 147.2828 },
    imageUrl: "https://example.com/fallscreek.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine DH", "Flow Trails", "Technical Terrain", "Cross Country"],
    facilities: ["Bike Shop", "Rental Center", "Alpine Lodge", "Training Area"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+61-3-5758-1200",
      email: "bike@fallscreek.com.au"
    },
    price: {
      amount: 85,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Sun Protection"],
    photos: ["https://example.com/fallscreek1.jpg", "https://example.com/fallscreek2.jpg"],
    videos: ["https://example.com/fallscreek-video.mp4"],
    website: "https://www.fallscreek.com.au/bike",
    socialMedia: {
      facebook: "https://facebook.com/fallscreekbikepark",
      instagram: "https://instagram.com/fallscreekbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bright Mystic Mountain Bike Park",
    description: "Alpine valley's premier bike park with year-round riding",
    location: "Bright, Victoria, Australia",
    coordinates: { latitude: -36.7303, longitude: 146.9588 },
    imageUrl: "https://example.com/mystic.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Jump Lines", "Skills Area", "Alpine Views"],
    facilities: ["Bike Shop", "Cafe", "Shuttle Service", "Training Area"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-17:30",
      sunday: "08:30-17:30"
    },
    contact: {
      phone: "+61-3-5755-1234",
      email: "ride@mysticpark.com.au"
    },
    price: {
      amount: 65,
      currency: "AUD"
    },
    rules: ["Helmet Required", "Trail Etiquette", "Environmental Care"],
    photos: ["https://example.com/mystic1.jpg", "https://example.com/mystic2.jpg"],
    videos: ["https://example.com/mystic-video.mp4"],
    website: "https://www.mysticmtb.com.au",
    socialMedia: {
      facebook: "https://facebook.com/mysticmtb",
      instagram: "https://instagram.com/mysticmtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Bjelašnica Bike Park",
    description: "Olympic mountain bike park with stunning Sarajevo views",
    location: "Bjelašnica, Sarajevo, Bosnia and Herzegovina",
    coordinates: { latitude: 43.7167, longitude: 18.2833 },
    imageUrl: "https://example.com/bjelasnica.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine Trails", "Olympic Routes", "Technical Descents", "Cross Country"],
    facilities: ["Bike Rental", "Mountain Lodge", "Service Station", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:00-18:00",
      sunday: "08:00-18:00"
    },
    contact: {
      phone: "+387-33-446-400",
      email: "info@bjelasnica.ba"
    },
    price: {
      amount: 20,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Trail Etiquette"],
    photos: ["https://example.com/bjelasnica1.jpg", "https://example.com/bjelasnica2.jpg"],
    videos: ["https://example.com/bjelasnica-video.mp4"],
    website: "https://www.bjelasnica.ba",
    socialMedia: {
      facebook: "https://facebook.com/bjelasnicabikepark",
      instagram: "https://instagram.com/bjelasnicabike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vlašić Mountain Bike Park",
    description: "Central Bosnia's premier mountain biking destination",
    location: "Vlašić, Travnik, Bosnia and Herzegovina",
    coordinates: { latitude: 44.2667, longitude: 17.6667 },
    imageUrl: "https://example.com/vlasic.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Natural Terrain", "Scenic Routes", "Skills Area"],
    facilities: ["Base Station", "Equipment Rental", "Mountain Hut", "First Aid"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:00-17:00",
      sunday: "08:00-17:00"
    },
    contact: {
      phone: "+387-30-518-555",
      email: "bike@vlasic.com"
    },
    price: {
      amount: 15,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Stay on Marked Trails", "Respect Nature"],
    photos: ["https://example.com/vlasic1.jpg", "https://example.com/vlasic2.jpg"],
    videos: ["https://example.com/vlasic-video.mp4"],
    website: "https://www.vlasic-mtb.ba",
    socialMedia: {
      facebook: "https://facebook.com/vlasicbike",
      instagram: "https://instagram.com/vlasicbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Igman Bike Park",
    description: "Historic Olympic mountain with diverse trail network",
    location: "Igman, Sarajevo, Bosnia and Herzegovina",
    coordinates: { latitude: 43.7667, longitude: 18.2667 },
    imageUrl: "https://example.com/igman.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Olympic Heritage", "Forest Trails", "Jump Lines", "Cross Country"],
    facilities: ["Bike Shop", "Cafe", "Parking", "Information Center"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "08:30-17:00",
      sunday: "08:30-17:00"
    },
    contact: {
      phone: "+387-33-445-200",
      email: "info@igman-bike.ba"
    },
    price: {
      amount: 18,
      currency: "EUR"
    },
    rules: ["Helmet Required", "No Off-Trail Riding", "Respect Wildlife"],
    photos: ["https://example.com/igman1.jpg", "https://example.com/igman2.jpg"],
    videos: ["https://example.com/igman-video.mp4"],
    website: "https://www.igman-bike.ba",
    socialMedia: {
      facebook: "https://facebook.com/igmanbikepark",
      instagram: "https://instagram.com/igmanbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kupres Bike Park",
    description: "High-altitude bike park with pristine mountain trails",
    location: "Kupres, Bosnia and Herzegovina",
    coordinates: { latitude: 43.9833, longitude: 17.2833 },
    imageUrl: "https://example.com/kupres.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine Trails", "Downhill Runs", "Natural Features", "Enduro Routes"],
    facilities: ["Equipment Rental", "Mountain Lodge", "Service Center", "Training Area"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:00-17:00",
      sunday: "08:00-17:00"
    },
    contact: {
      phone: "+387-34-274-100",
      email: "info@kupres-bike.ba"
    },
    price: {
      amount: 22,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Mountain Safety Rules", "Weather Advisory"],
    photos: ["https://example.com/kupres1.jpg", "https://example.com/kupres2.jpg"],
    videos: ["https://example.com/kupres-video.mp4"],
    website: "https://www.kupres-bike.ba",
    socialMedia: {
      facebook: "https://facebook.com/kupresbikepark",
      instagram: "https://instagram.com/kupresbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Učka Bike Park",
    description: "Coastal mountain bike park overlooking the Adriatic Sea",
    location: "Učka, Istria, Croatia",
    coordinates: { latitude: 45.2833, longitude: 14.2000 },
    imageUrl: "https://example.com/ucka.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Coastal Views", "Natural Trails", "Flow Lines", "Technical Sections"],
    facilities: ["Bike Rental", "Service Station", "Mountain Restaurant", "Parking"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:00-18:00",
      sunday: "08:00-18:00"
    },
    contact: {
      phone: "+385-51-293-753",
      email: "info@ucka-bikepark.hr"
    },
    price: {
      amount: 25,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Stay on Marked Trails", "Respect Nature"],
    photos: ["https://example.com/ucka1.jpg", "https://example.com/ucka2.jpg"],
    videos: ["https://example.com/ucka-video.mp4"],
    website: "https://www.ucka-bikepark.hr",
    socialMedia: {
      facebook: "https://facebook.com/uckabikepark",
      instagram: "https://instagram.com/uckabikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Biokovo Bike Park",
    description: "Dramatic mountain bike trails with Mediterranean views",
    location: "Makarska, Croatia",
    coordinates: { latitude: 43.3167, longitude: 17.0500 },
    imageUrl: "https://example.com/biokovo.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Sea View Trails", "Technical Descents", "Natural Features", "Enduro Routes"],
    facilities: ["Equipment Rental", "Guide Service", "First Aid Station", "Viewpoint"],
    openingHours: {
      monday: "08:30-16:30",
      tuesday: "08:30-16:30",
      wednesday: "08:30-16:30",
      thursday: "08:30-16:30",
      friday: "08:30-16:30",
      saturday: "08:00-17:00",
      sunday: "08:00-17:00"
    },
    contact: {
      phone: "+385-21-612-284",
      email: "info@biokovo-bikepark.hr"
    },
    price: {
      amount: 28,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Mountain Safety Protocol", "Weather Check Required"],
    photos: ["https://example.com/biokovo1.jpg", "https://example.com/biokovo2.jpg"],
    videos: ["https://example.com/biokovo-video.mp4"],
    website: "https://www.biokovo-bikepark.hr",
    socialMedia: {
      facebook: "https://facebook.com/biokovobikepark",
      instagram: "https://instagram.com/biokovobike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Velebit Bike Park",
    description: "Wild mountain biking in Croatia's largest mountain range",
    location: "Velebit, Croatia",
    coordinates: { latitude: 44.5333, longitude: 15.2667 },
    imageUrl: "https://example.com/velebit.jpg",
    status: "open",
    difficulty: "pro",
    features: ["Wilderness Trails", "Alpine Routes", "Technical Challenges", "Natural Obstacles"],
    facilities: ["Mountain Huts", "Basic Repairs", "Guide Services", "Emergency Point"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:30-16:30",
      sunday: "08:30-16:30"
    },
    contact: {
      phone: "+385-23-447-700",
      email: "info@velebit-mtb.hr"
    },
    price: {
      amount: 32,
      currency: "EUR"
    },
    rules: ["Full Protection Required", "Guide Recommended", "Weather Dependent Access"],
    photos: ["https://example.com/velebit1.jpg", "https://example.com/velebit2.jpg"],
    videos: ["https://example.com/velebit-video.mp4"],
    website: "https://www.velebit-mtb.hr",
    socialMedia: {
      facebook: "https://facebook.com/velebitbikepark",
      instagram: "https://instagram.com/velebitmtb"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Platak Bike Park",
    description: "Coastal mountain bike center with Kvarner Gulf views",
    location: "Platak, Rijeka, Croatia",
    coordinates: { latitude: 45.4167, longitude: 14.5500 },
    imageUrl: "https://example.com/platak.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Skills Park", "Family Routes", "Scenic Trails"],
    facilities: ["Bike School", "Rental Shop", "Restaurant", "Parking"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:30-18:00",
      sunday: "08:30-18:00"
    },
    contact: {
      phone: "+385-51-836-422",
      email: "info@platak-bikepark.hr"
    },
    price: {
      amount: 22,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Trail Etiquette", "Environmental Care"],
    photos: ["https://example.com/platak1.jpg", "https://example.com/platak2.jpg"],
    videos: ["https://example.com/platak-video.mp4"],
    website: "https://www.platak-bikepark.hr",
    socialMedia: {
      facebook: "https://facebook.com/platakbikepark",
      instagram: "https://instagram.com/platakbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
  {
    name: "Bjelašnica Bike Park",
    description: "Olympic mountain bike park with stunning Sarajevo views",
    location: "Bjelašnica, Sarajevo, Bosnia and Herzegovina",
    coordinates: { latitude: 43.7167, longitude: 18.2833 },
    imageUrl: "https://example.com/bjelasnica.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine Trails", "Olympic Routes", "Technical Descents", "Cross Country"],
    facilities: ["Bike Rental", "Mountain Lodge", "Service Station", "Restaurant"],
    openingHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "08:00-18:00",
      sunday: "08:00-18:00"
    },
    contact: {
      phone: "+387-33-446-400",
      email: "info@bjelasnica.ba"
    },
    price: {
      amount: 20,
      currency: "EUR"
    },
    rules: ["Helmet Required", "Alpine Safety Rules", "Trail Etiquette"],
    photos: ["https://example.com/bjelasnica1.jpg", "https://example.com/bjelasnica2.jpg"],
    videos: ["https://example.com/bjelasnica-video.mp4"],
    website: "https://www.bjelasnica.ba",
    socialMedia: {
      facebook: "https://facebook.com/bjelasnicabikepark",
      instagram: "https://instagram.com/bjelasnicabike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vlašić Mountain Bike Park",
    description: "Central Bosnia's premier mountain biking destination",
    location: "Vlašić, Travnik, Bosnia and Herzegovina",
    coordinates: { latitude: 44.2667, longitude: 17.6667 },
    imageUrl: "https://example.com/vlasic.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Flow Trails", "Natural Terrain", "Scenic Routes", "Skills Area"],
    facilities: ["Base Station", "Equipment Rental", "Mountain Hut", "First Aid"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:00-17:00",
      sunday: "08:00-17:00"
    },
    contact: {
      phone: "+387-30-518-555",
      email: "bike@vlasic.com"
    },
    price: {
      amount: 15,
      currency: "EUR"
    },
    rules: ["Helmet Mandatory", "Stay on Marked Trails", "Respect Nature"],
    photos: ["https://example.com/vlasic1.jpg", "https://example.com/vlasic2.jpg"],
    videos: ["https://example.com/vlasic-video.mp4"],
    website: "https://www.vlasic-mtb.ba",
    socialMedia: {
      facebook: "https://facebook.com/vlasicbike",
      instagram: "https://instagram.com/vlasicbikepark"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Igman Bike Park",
    description: "Historic Olympic mountain with diverse trail network",
    location: "Igman, Sarajevo, Bosnia and Herzegovina",
    coordinates: { latitude: 43.7667, longitude: 18.2667 },
    imageUrl: "https://example.com/igman.jpg",
    status: "open",
    difficulty: "intermediate",
    features: ["Olympic Heritage", "Forest Trails", "Jump Lines", "Cross Country"],
    facilities: ["Bike Shop", "Cafe", "Parking", "Information Center"],
    openingHours: {
      monday: "09:00-16:30",
      tuesday: "09:00-16:30",
      wednesday: "09:00-16:30",
      thursday: "09:00-16:30",
      friday: "09:00-16:30",
      saturday: "08:30-17:00",
      sunday: "08:30-17:00"
    },
    contact: {
      phone: "+387-33-445-200",
      email: "info@igman-bike.ba"
    },
    price: {
      amount: 18,
      currency: "EUR"
    },
    rules: ["Helmet Required", "No Off-Trail Riding", "Respect Wildlife"],
    photos: ["https://example.com/igman1.jpg", "https://example.com/igman2.jpg"],
    videos: ["https://example.com/igman-video.mp4"],
    website: "https://www.igman-bike.ba",
    socialMedia: {
      facebook: "https://facebook.com/igmanbikepark",
      instagram: "https://instagram.com/igmanbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kupres Bike Park",
    description: "High-altitude bike park with pristine mountain trails",
    location: "Kupres, Bosnia and Herzegovina",
    coordinates: { latitude: 43.9833, longitude: 17.2833 },
    imageUrl: "https://example.com/kupres.jpg",
    status: "open",
    difficulty: "advanced",
    features: ["Alpine Trails", "Downhill Runs", "Natural Features", "Enduro Routes"],
    facilities: ["Equipment Rental", "Mountain Lodge", "Service Center", "Training Area"],
    openingHours: {
      monday: "09:00-16:00",
      tuesday: "09:00-16:00",
      wednesday: "09:00-16:00",
      thursday: "09:00-16:00",
      friday: "09:00-16:00",
      saturday: "08:00-17:00",
      sunday: "08:00-17:00"
    },
    contact: {
      phone: "+387-34-274-100",
      email: "info@kupres-bike.ba"
    },
    price: {
      amount: 22,
      currency: "EUR"
    },
    rules: ["Full Face Helmet Required", "Mountain Safety Rules", "Weather Advisory"],
    photos: ["https://example.com/kupres1.jpg", "https://example.com/kupres2.jpg"],
    videos: ["https://example.com/kupres-video.mp4"],
    website: "https://www.kupres-bike.ba",
    socialMedia: {
      facebook: "https://facebook.com/kupresbikepark",
      instagram: "https://instagram.com/kupresbike"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface IEventSeed {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
  category: string;
  disciplines: string[];
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  price: {
    amount: number;
    currency: string;
  };
  prizes: {
    totalAmount: number;
    currency: string;
    distribution: Array<{
      place: number;
      amount: number;
    }>;
  };
  sponsors: string[];
  contact: {
    email: string;
    phone: string;
  };
  bikePark: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const events: IEventSeed[] = [
  {
    name: "Winterberg Downhill Cup 2024",
    description: "Annual downhill competition at Bikepark Winterberg featuring pro and amateur categories",
    location: "Bikepark Winterberg",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-17"),
    type: "competition",
    status: "upcoming",
    category: "downhill",
    disciplines: ["downhill", "freeride"],
    registrationDeadline: new Date("2024-07-01"),
    maxParticipants: 200,
    currentParticipants: 150,
    price: {
      amount: 89.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 5000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 2500 },
        { place: 2, amount: 1500 },
        { place: 3, amount: 1000 }
      ]
    },
    sponsors: ["Red Bull", "Fox Racing", "SRAM", "Trek"],
    contact: {
      email: "events@bikepark-winterberg.de",
      phone: "+49-2981-92000"
    },
    bikePark: "Bikepark Winterberg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Geisskopf Enduro Series",
    description: "Three-day enduro event with multiple stages and categories",
    location: "Bikepark Geisskopf",
    startDate: new Date("2024-08-23"),
    endDate: new Date("2024-08-25"),
    type: "series",
    status: "upcoming",
    category: "enduro",
    disciplines: ["enduro", "trail"],
    registrationDeadline: new Date("2024-08-10"),
    maxParticipants: 150,
    currentParticipants: 98,
    price: {
      amount: 129.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 3000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 1500 },
        { place: 2, amount: 1000 },
        { place: 3, amount: 500 }
      ]
    },
    sponsors: ["Specialized", "Maxxis", "Shimano"],
    contact: {
      email: "events@bikepark-geisskopf.de",
      phone: "+49-9920-903762"
    },
    bikePark: "Bikepark Geisskopf",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kids Bike Festival Winterberg",
    description: "Fun-filled weekend for young riders with coaching, mini-competitions, and games",
    location: "Bikepark Winterberg",
    startDate: new Date("2024-06-29"),
    endDate: new Date("2024-06-30"),
    type: "festival",
    status: "upcoming",
    category: "youth",
    disciplines: ["skills", "fun-race"],
    registrationDeadline: new Date("2024-06-15"),
    maxParticipants: 100,
    currentParticipants: 45,
    price: {
      amount: 49.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 500,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 250 },
        { place: 2, amount: 150 },
        { place: 3, amount: 100 }
      ]
    },
    sponsors: ["YT Industries", "Schwalbe", "iXS"],
    contact: {
      email: "kids@bikepark-winterberg.de",
      phone: "+49-2981-92000"
    },
    bikePark: "Bikepark Winterberg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Harz Mountain Bike Marathon",
    description: "Epic endurance event through the Harz mountains with multiple distance options",
    location: "Bikepark Harz",
    startDate: new Date("2024-09-07"),
    endDate: new Date("2024-09-07"),
    type: "marathon",
    status: "upcoming",
    category: "cross-country",
    disciplines: ["marathon", "cross-country"],
    registrationDeadline: new Date("2024-08-24"),
    maxParticipants: 500,
    currentParticipants: 312,
    price: {
      amount: 69.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 2000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 1000 },
        { place: 2, amount: 600 },
        { place: 3, amount: 400 }
      ]
    },
    sponsors: ["Canyon", "Continental", "PowerBar"],
    contact: {
      email: "marathon@bikepark-harz.de",
      phone: "+49-5320-789123"
    },
    bikePark: "Bikepark Harz",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Black Forest Bike Week",
    description: "Week-long celebration of mountain biking with competitions, workshops, and demos",
    location: "Bikepark Todtnau",
    startDate: new Date("2024-07-22"),
    endDate: new Date("2024-07-28"),
    type: "festival",
    status: "upcoming",
    category: "mixed",
    disciplines: ["downhill", "enduro", "dirt-jump", "slopestyle"],
    registrationDeadline: new Date("2024-07-08"),
    maxParticipants: 1000,
    currentParticipants: 786,
    price: {
      amount: 199.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 10000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 5000 },
        { place: 2, amount: 3000 },
        { place: 3, amount: 2000 }
      ]
    },
    sponsors: ["Santa Cruz", "Industry Nine", "GoPro", "Monster Energy"],
    contact: {
      email: "bikeweek@bikepark-todtnau.de",
      phone: "+49-7671-96210"
    },
    bikePark: "Bikepark Todtnau",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Willingen Bike Festival",
    description: "Three days of racing, demos, and expo featuring the latest bike technology",
    location: "Bikepark Willingen",
    startDate: new Date("2024-06-14"),
    endDate: new Date("2024-06-16"),
    type: "festival",
    status: "upcoming",
    category: "mixed",
    disciplines: ["downhill", "cross-country", "trial", "e-bike"],
    registrationDeadline: new Date("2024-05-31"),
    maxParticipants: 800,
    currentParticipants: 542,
    price: {
      amount: 149.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 7500,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 3500 },
        { place: 2, amount: 2500 },
        { place: 3, amount: 1500 }
      ]
    },
    sponsors: ["Cube Bikes", "DT Swiss", "Oakley", "Red Bull"],
    contact: {
      email: "festival@bikepark-willingen.de",
      phone: "+49-5632-96990"
    },
    bikePark: "Bikepark Willingen",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bad Wildbad DH Pro Challenge",
    description: "Elite downhill competition on one of Germany's most technical tracks",
    location: "Bikepark Bad Wildbad",
    startDate: new Date("2024-08-10"),
    endDate: new Date("2024-08-11"),
    type: "competition",
    status: "upcoming",
    category: "downhill",
    disciplines: ["downhill"],
    registrationDeadline: new Date("2024-07-27"),
    maxParticipants: 150,
    currentParticipants: 112,
    price: {
      amount: 99.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 6000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 3000 },
        { place: 2, amount: 2000 },
        { place: 3, amount: 1000 }
      ]
    },
    sponsors: ["Nukeproof", "Hope Technology", "Five Ten"],
    contact: {
      email: "events@bikepark-bad-wildbad.de",
      phone: "+49-7081-92530"
    },
    bikePark: "Bikepark Bad Wildbad",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ochsenkopf Gravity Games",
    description: "Gravity-focused event featuring downhill and enduro races",
    location: "Bikepark Ochsenkopf",
    startDate: new Date("2024-09-21"),
    endDate: new Date("2024-09-22"),
    type: "competition",
    status: "upcoming",
    category: "gravity",
    disciplines: ["downhill", "enduro"],
    registrationDeadline: new Date("2024-09-07"),
    maxParticipants: 200,
    currentParticipants: 143,
    price: {
      amount: 79.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 4000,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 2000 },
        { place: 2, amount: 1200 },
        { place: 3, amount: 800 }
      ]
    },
    sponsors: ["Propain Bikes", "Magura", "ION"],
    contact: {
      email: "gravity@bikepark-ochsenkopf.de",
      phone: "+49-9277-975132"
    },
    bikePark: "Bikepark Ochsenkopf",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Schöneck Skills Camp",
    description: "Two-day skills development camp with professional coaches",
    location: "Bikepark Schöneck",
    startDate: new Date("2024-07-06"),
    endDate: new Date("2024-07-07"),
    type: "training",
    status: "upcoming",
    category: "skills",
    disciplines: ["skills", "technique"],
    registrationDeadline: new Date("2024-06-22"),
    maxParticipants: 50,
    currentParticipants: 32,
    price: {
      amount: 199.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 0,
      currency: "EUR",
      distribution: []
    },
    sponsors: ["YT Industries", "Endura", "Crankbrothers"],
    contact: {
      email: "skills@bikepark-schoeneck.de",
      phone: "+49-37464-57860"
    },
    bikePark: "Bikepark Schöneck",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Hahnenklee Summer Jam",
    description: "Casual summer event with competitions, BBQ, and night rides",
    location: "Bikepark Hahnenklee",
    startDate: new Date("2024-08-03"),
    endDate: new Date("2024-08-04"),
    type: "festival",
    status: "upcoming",
    category: "fun",
    disciplines: ["fun-race", "best-trick", "whip-off"],
    registrationDeadline: new Date("2024-07-20"),
    maxParticipants: 300,
    currentParticipants: 187,
    price: {
      amount: 59.99,
      currency: "EUR"
    },
    prizes: {
      totalAmount: 1500,
      currency: "EUR",
      distribution: [
        { place: 1, amount: 750 },
        { place: 2, amount: 500 },
        { place: 3, amount: 250 }
      ]
    },
    sponsors: ["DMR Bikes", "Deity Components", "100%"],
    contact: {
      email: "summer@bikepark-hahnenklee.de",
      phone: "+49-5325-2042"
    },
    bikePark: "Bikepark Hahnenklee",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Trail data
const trails = [
  {
    name: "Black Lightning",
    description: "Signature downhill track at Winterberg featuring technical rock gardens and big drops",
    bikePark: "Bikepark Winterberg",
    difficulty: "pro",
    type: "downhill",
    length: 2.8,
    elevation: {
      gain: 0,
      loss: 450
    },
    features: ["Rock Gardens", "Drops", "Gap Jumps", "Technical Sections"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.8
  },
  {
    name: "Flow Country",
    description: "Smooth, flowing trail perfect for beginners and intermediates",
    bikePark: "Bikepark Winterberg",
    difficulty: "beginner",
    type: "flow",
    length: 4.2,
    elevation: {
      gain: 0,
      loss: 320
    },
    features: ["Berms", "Small Jumps", "Rollers", "Wide Track"],
    status: "open",
    conditions: {
      current: "excellent",
      lastUpdated: new Date()
    },
    rating: 4.7
  },
  {
    name: "Geisskopf DH",
    description: "World Cup level downhill track with multiple line choices",
    bikePark: "Bikepark Geisskopf",
    difficulty: "pro",
    type: "downhill",
    length: 2.1,
    elevation: {
      gain: 0,
      loss: 520
    },
    features: ["Rock Gardens", "Step-downs", "Gap Jumps", "North Shore"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.9
  },
  {
    name: "Forest Flow",
    description: "Natural single track through dense Bavarian forest",
    bikePark: "Bikepark Geisskopf",
    difficulty: "intermediate",
    type: "enduro",
    length: 5.6,
    elevation: {
      gain: 50,
      loss: 480
    },
    features: ["Natural Obstacles", "Root Sections", "Berms", "Small Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6
  },
  {
    name: "Harz Lightning",
    description: "Fast and technical track through the Harz mountains",
    bikePark: "Bikepark Harz",
    difficulty: "advanced",
    type: "technical",
    length: 2.4,
    elevation: {
      gain: 0,
      loss: 380
    },
    features: ["Rock Gardens", "Step-downs", "Technical Sections", "Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.7
  },
  {
    name: "Green Monster",
    description: "Beginner-friendly trail with progressive features",
    bikePark: "Bikepark Harz",
    difficulty: "beginner",
    type: "flow",
    length: 3.8,
    elevation: {
      gain: 0,
      loss: 280
    },
    features: ["Table Tops", "Berms", "Rollers", "Small Drops"],
    status: "open",
    conditions: {
      current: "excellent",
      lastUpdated: new Date()
    },
    rating: 4.5
  },
  {
    name: "Black Forest Express",
    description: "High-speed track through the Black Forest",
    bikePark: "Bikepark Todtnau",
    difficulty: "advanced",
    type: "downhill",
    length: 2.9,
    elevation: {
      gain: 0,
      loss: 460
    },
    features: ["Gap Jumps", "Rock Gardens", "High-Speed Sections", "Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.8
  },
  {
    name: "Todtnau Flow",
    description: "Smooth flow trail with progressive jumps",
    bikePark: "Bikepark Todtnau",
    difficulty: "intermediate",
    type: "flow",
    length: 4.1,
    elevation: {
      gain: 0,
      loss: 340
    },
    features: ["Table Tops", "Berms", "Step-ups", "Wall Rides"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6
  },
  {
    name: "Willingen Pro Line",
    description: "Professional-level jump line with massive features",
    bikePark: "Bikepark Willingen",
    difficulty: "pro",
    type: "jump",
    length: 1.2,
    elevation: {
      gain: 0,
      loss: 180
    },
    features: ["Big Jumps", "Step-ups", "Step-downs", "Drops"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.9
  },
  {
    name: "Freeride Paradise",
    description: "Creative freeride line with multiple options",
    bikePark: "Bikepark Willingen",
    difficulty: "advanced",
    type: "technical",
    length: 2.6,
    elevation: {
      gain: 0,
      loss: 320
    },
    features: ["Natural Hits", "Drops", "Hip Jumps", "Wood Features"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.7
  },
  {
    name: "Bad Wildbad DH",
    description: "One of Germany's most technical downhill tracks",
    bikePark: "Bikepark Bad Wildbad",
    difficulty: "pro",
    type: "downhill",
    length: 1.9,
    elevation: {
      gain: 0,
      loss: 420
    },
    features: ["Rock Gardens", "Technical Sections", "Steep Chutes", "Drops"],
    status: "open",
    conditions: {
      current: "challenging",
      lastUpdated: new Date()
    },
    rating: 4.9
  },
  {
    name: "Wild Child",
    description: "Intermediate jump line with progressive features",
    bikePark: "Bikepark Bad Wildbad",
    difficulty: "intermediate",
    type: "jump",
    length: 2.8,
    elevation: {
      gain: 0,
      loss: 310
    },
    features: ["Table Tops", "Step-ups", "Berms", "Small Gaps"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.5
  },
  {
    name: "Gravity Express",
    description: "Fast and flowy downhill track",
    bikePark: "Bikepark Ochsenkopf",
    difficulty: "advanced",
    type: "downhill",
    length: 2.3,
    elevation: {
      gain: 0,
      loss: 390
    },
    features: ["High-Speed Sections", "Jumps", "Berms", "Technical Sections"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.7
  },
  {
    name: "Nature Trail",
    description: "Natural single track with minimal artificial features",
    bikePark: "Bikepark Ochsenkopf",
    difficulty: "intermediate",
    type: "enduro",
    length: 4.7,
    elevation: {
      gain: 80,
      loss: 420
    },
    features: ["Natural Obstacles", "Root Sections", "Rock Gardens", "Stream Crossings"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6
  },
  {
    name: "Progression Line",
    description: "Perfect trail for improving jumping skills",
    bikePark: "Bikepark Schöneck",
    difficulty: "intermediate",
    type: "jump",
    length: 3.2,
    elevation: {
      gain: 0,
      loss: 280
    },
    features: ["Progressive Jumps", "Table Tops", "Berms", "Small Gaps"],
    status: "open",
    conditions: {
      current: "excellent",
      lastUpdated: new Date()
    },
    rating: 4.5
  },
  {
    name: "Skills Area",
    description: "Dedicated skills training area with various features",
    bikePark: "Bikepark Schöneck",
    difficulty: "beginner",
    type: "skills",
    length: 0.8,
    elevation: {
      gain: 0,
      loss: 40
    },
    features: ["Balance Features", "Small Drops", "Pump Track", "Practice Areas"],
    status: "open",
    conditions: {
      current: "excellent",
      lastUpdated: new Date()
    },
    rating: 4.4
  },
  {
    name: "Night Rider",
    description: "Illuminated evening trail with flow features",
    bikePark: "Bikepark Hahnenklee",
    difficulty: "intermediate",
    type: "flow",
    length: 2.6,
    elevation: {
      gain: 0,
      loss: 290
    },
    features: ["Lit Track", "Table Tops", "Berms", "Rollers"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.6
  },
  {
    name: "Harz Enduro",
    description: "Long enduro track with varied terrain",
    bikePark: "Bikepark Hahnenklee",
    difficulty: "advanced",
    type: "enduro",
    length: 6.2,
    elevation: {
      gain: 120,
      loss: 580
    },
    features: ["Technical Climbs", "Fast Descents", "Natural Features", "Rock Gardens"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.8
  },
  {
    name: "Family Line",
    description: "Super beginner-friendly trail for first-timers",
    bikePark: "Bikepark Winterberg",
    difficulty: "beginner",
    type: "flow",
    length: 1.8,
    elevation: {
      gain: 0,
      loss: 120
    },
    features: ["Wide Track", "Small Rollers", "Gentle Berms", "Rest Areas"],
    status: "open",
    conditions: {
      current: "excellent",
      lastUpdated: new Date()
    },
    rating: 4.5
  },
  {
    name: "Pro Jump Line",
    description: "Competition-level slopestyle course",
    bikePark: "Bikepark Winterberg",
    difficulty: "pro",
    type: "jump",
    length: 0.9,
    elevation: {
      gain: 0,
      loss: 140
    },
    features: ["Big Air Jumps", "Step-ups", "Step-downs", "Hip Jumps"],
    status: "open",
    conditions: {
      current: "good",
      lastUpdated: new Date()
    },
    rating: 4.9
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
      trails.map(trail => {
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

     // Insert event with admin user as creator
    const createdEvents = await Event.create(
      events.map(event => {
        const bikePark = createdBikeParks.find(park => park.name === event.bikePark);
        const { bikePark: bikeParkName, ...eventWithoutBikePark } = event;
        return {
          ...eventWithoutBikePark,
          createdBy: adminUser._id,
          bikePark: bikePark?._id
        };
      })
    );

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};