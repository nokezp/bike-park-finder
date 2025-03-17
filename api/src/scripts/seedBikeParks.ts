import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BikePark } from '../models/BikePark';
import User from '../models/User';

dotenv.config();

const initialBikeParks = [
  // German Bike Parks
  {
    name: 'Winterberg Bike Park',
    description: 'One of Germany\'s largest bike parks with over 20 trails.',
    location: 'Winterberg, Germany',
    coordinates: {
      latitude: 51.1967,
      longitude: 8.5333
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['winterberg1.jpg', 'winterberg2.jpg'],
    website: 'https://www.winterberg.de/bikepark',
    contactPhone: '+49 2981 92500',
    contactEmail: 'info@winterberg.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €29, Season Pass: €299',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Willingen',
    description: 'Popular bike park in the Sauerland region.',
    location: 'Willingen, Germany',
    coordinates: {
      latitude: 51.2944,
      longitude: 8.6083
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['willingen1.jpg', 'willingen2.jpg'],
    website: 'https://www.bikepark-willingen.de',
    contactPhone: '+49 5632 96640',
    contactEmail: 'info@bikepark-willingen.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €27, Season Pass: €279',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Steinwasen',
    description: 'Family-friendly bike park in the Black Forest.',
    location: 'Steinwasen, Germany',
    coordinates: {
      latitude: 48.0667,
      longitude: 8.0333
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['steinwasen1.jpg', 'steinwasen2.jpg'],
    website: 'https://www.steinwasen-park.de',
    contactPhone: '+49 7682 9280',
    contactEmail: 'info@steinwasen-park.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €25, Season Pass: €249',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Bad Wildbad',
    description: 'Technical trails in the Black Forest.',
    location: 'Bad Wildbad, Germany',
    coordinates: {
      latitude: 48.7500,
      longitude: 8.5500
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['badwildbad1.jpg', 'badwildbad2.jpg'],
    website: 'https://www.bikepark-badwildbad.de',
    contactPhone: '+49 7081 7890',
    contactEmail: 'info@bikepark-badwildbad.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €28, Season Pass: €289',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Spicak',
    description: 'Cross-border bike park between Germany and Czech Republic.',
    location: 'Spicak, Germany',
    coordinates: {
      latitude: 49.1667,
      longitude: 13.2333
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['spicak1.jpg', 'spicak2.jpg'],
    website: 'https://www.bikepark-spicak.de',
    contactPhone: '+49 8562 9890',
    contactEmail: 'info@bikepark-spicak.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €26, Season Pass: €269',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Todtnau',
    description: 'Historic bike park in the Black Forest.',
    location: 'Todtnau, Germany',
    coordinates: {
      latitude: 47.8333,
      longitude: 7.9500
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['todtnau1.jpg', 'todtnau2.jpg'],
    website: 'https://www.bikepark-todtnau.de',
    contactPhone: '+49 7671 9690',
    contactEmail: 'info@bikepark-todtnau.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €27, Season Pass: €279',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Oberhof',
    description: 'Technical trails in Thuringia.',
    location: 'Oberhof, Germany',
    coordinates: {
      latitude: 50.7167,
      longitude: 10.7167
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['oberhof1.jpg', 'oberhof2.jpg'],
    website: 'https://www.bikepark-oberhof.de',
    contactPhone: '+49 36842 22345',
    contactEmail: 'info@bikepark-oberhof.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €28, Season Pass: €289',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Bischofsmais',
    description: 'Family-friendly bike park in Bavaria.',
    location: 'Bischofsmais, Germany',
    coordinates: {
      latitude: 48.9167,
      longitude: 13.0833
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['bischofsmais1.jpg', 'bischofsmais2.jpg'],
    website: 'https://www.bikepark-bischofsmais.de',
    contactPhone: '+49 9920 9400',
    contactEmail: 'info@bikepark-bischofsmais.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €25, Season Pass: €249',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Geisskopf',
    description: 'Technical trails in the Bavarian Forest.',
    location: 'Geisskopf, Germany',
    coordinates: {
      latitude: 48.9167,
      longitude: 13.0833
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['geisskopf1.jpg', 'geisskopf2.jpg'],
    website: 'https://www.bikepark-geisskopf.de',
    contactPhone: '+49 9920 9400',
    contactEmail: 'info@bikepark-geisskopf.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €28, Season Pass: €289',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Bad Tabarz',
    description: 'Flow trails in Thuringia.',
    location: 'Bad Tabarz, Germany',
    coordinates: {
      latitude: 50.8833,
      longitude: 10.5167
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['badtabarz1.jpg', 'badtabarz2.jpg'],
    website: 'https://www.bikepark-badtabarz.de',
    contactPhone: '+49 36259 7890',
    contactEmail: 'info@bikepark-badtabarz.de',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €26, Season Pass: €269',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },

  // Austrian Bike Parks
  {
    name: 'Bikepark Leogang',
    description: 'World-class bike park in the Austrian Alps.',
    location: 'Leogang, Austria',
    coordinates: {
      latitude: 47.4667,
      longitude: 12.7500
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'World Cup Track'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['leogang1.jpg', 'leogang2.jpg'],
    website: 'https://www.bikepark-leogang.com',
    contactPhone: '+43 6583 8215',
    contactEmail: 'info@bikepark-leogang.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €39, Season Pass: €399',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Saalbach',
    description: 'Extensive bike park in the Austrian Alps.',
    location: 'Saalbach, Austria',
    coordinates: {
      latitude: 47.3833,
      longitude: 12.6333
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['saalbach1.jpg', 'saalbach2.jpg'],
    website: 'https://www.bikepark-saalbach.com',
    contactPhone: '+43 6541 6800',
    contactEmail: 'info@bikepark-saalbach.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €37, Season Pass: €379',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Schladming',
    description: 'Technical trails in the Austrian Alps.',
    location: 'Schladming, Austria',
    coordinates: {
      latitude: 47.4000,
      longitude: 13.6833
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['schladming1.jpg', 'schladming2.jpg'],
    website: 'https://www.bikepark-schladming.com',
    contactPhone: '+43 3687 22000',
    contactEmail: 'info@bikepark-schladming.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €35, Season Pass: €359',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Serfaus-Fiss-Ladis',
    description: 'Family-friendly bike park in Tyrol.',
    location: 'Serfaus, Austria',
    coordinates: {
      latitude: 47.0333,
      longitude: 10.6000
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['serfaus1.jpg', 'serfaus2.jpg'],
    website: 'https://www.bikepark-serfaus.com',
    contactPhone: '+43 5476 6239',
    contactEmail: 'info@bikepark-serfaus.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €33, Season Pass: €339',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Zell am See',
    description: 'Scenic bike park in the Austrian Alps.',
    location: 'Zell am See, Austria',
    coordinates: {
      latitude: 47.3167,
      longitude: 12.7833
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['zellamsee1.jpg', 'zellamsee2.jpg'],
    website: 'https://www.bikepark-zellamsee.com',
    contactPhone: '+43 6542 7890',
    contactEmail: 'info@bikepark-zellamsee.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €35, Season Pass: €359',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Mayrhofen',
    description: 'Technical trails in Tyrol.',
    location: 'Mayrhofen, Austria',
    coordinates: {
      latitude: 47.1667,
      longitude: 11.8667
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['mayrhofen1.jpg', 'mayrhofen2.jpg'],
    website: 'https://www.bikepark-mayrhofen.com',
    contactPhone: '+43 5285 6760',
    contactEmail: 'info@bikepark-mayrhofen.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €35, Season Pass: €359',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Sölden',
    description: 'High-altitude bike park in Tyrol.',
    location: 'Sölden, Austria',
    coordinates: {
      latitude: 46.9667,
      longitude: 11.0000
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['soelden1.jpg', 'soelden2.jpg'],
    website: 'https://www.bikepark-soelden.com',
    contactPhone: '+43 5254 2255',
    contactEmail: 'info@bikepark-soelden.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €37, Season Pass: €379',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Ischgl',
    description: 'Family-friendly bike park in Tyrol.',
    location: 'Ischgl, Austria',
    coordinates: {
      latitude: 47.0167,
      longitude: 10.2833
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['ischgl1.jpg', 'ischgl2.jpg'],
    website: 'https://www.bikepark-ischgl.com',
    contactPhone: '+43 5444 6060',
    contactEmail: 'info@bikepark-ischgl.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €33, Season Pass: €339',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark Kitzbühel',
    description: 'Technical trails in Tyrol.',
    location: 'Kitzbühel, Austria',
    coordinates: {
      latitude: 47.4500,
      longitude: 12.3833
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['kitzbuehel1.jpg', 'kitzbuehel2.jpg'],
    website: 'https://www.bikepark-kitzbuehel.com',
    contactPhone: '+43 5356 66660',
    contactEmail: 'info@bikepark-kitzbuehel.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €35, Season Pass: €359',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Bikepark St. Anton',
    description: 'Flow trails in Tyrol.',
    location: 'St. Anton, Austria',
    coordinates: {
      latitude: 47.1333,
      longitude: 10.2667
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['stanton1.jpg', 'stanton2.jpg'],
    website: 'https://www.bikepark-stanton.com',
    contactPhone: '+43 5446 2266',
    contactEmail: 'info@bikepark-stanton.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: €35, Season Pass: €359',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },

  // UK Bike Parks
  {
    name: 'BikePark Wales',
    description: 'Premier bike park in South Wales.',
    location: 'Merthyr Tydfil, Wales, UK',
    coordinates: {
      latitude: 51.7500,
      longitude: -3.3833
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['bikeparkwales1.jpg', 'bikeparkwales2.jpg'],
    website: 'https://www.bikeparkwales.com',
    contactPhone: '+44 1685 377 377',
    contactEmail: 'info@bikeparkwales.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £35, Season Pass: £299',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Forest of Dean',
    description: 'Family-friendly bike park in Gloucestershire.',
    location: 'Forest of Dean, England, UK',
    coordinates: {
      latitude: 51.7833,
      longitude: -2.5500
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['forestofdean1.jpg', 'forestofdean2.jpg'],
    website: 'https://www.forestofdeanbikepark.com',
    contactPhone: '+44 1594 833057',
    contactEmail: 'info@forestofdeanbikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £25, Season Pass: £199',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Revolution Bike Park',
    description: 'Technical trails in the Scottish Highlands.',
    location: 'Fort William, Scotland, UK',
    coordinates: {
      latitude: 56.8167,
      longitude: -5.1167
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['revolution1.jpg', 'revolution2.jpg'],
    website: 'https://www.revolutionbikepark.com',
    contactPhone: '+44 1397 700000',
    contactEmail: 'info@revolutionbikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £35, Season Pass: £299',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Gisburn Forest',
    description: 'Flow trails in Lancashire.',
    location: 'Gisburn, England, UK',
    coordinates: {
      latitude: 53.9167,
      longitude: -2.3333
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['gisburn1.jpg', 'gisburn2.jpg'],
    website: 'https://www.gisburnforest.com',
    contactPhone: '+44 1200 445557',
    contactEmail: 'info@gisburnforest.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £30, Season Pass: £249',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Ae Forest',
    description: 'Technical trails in Scotland.',
    location: 'Ae, Scotland, UK',
    coordinates: {
      latitude: 55.1833,
      longitude: -3.6000
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['aeforest1.jpg', 'aeforest2.jpg'],
    website: 'https://www.aeforest.com',
    contactPhone: '+44 1387 860247',
    contactEmail: 'info@aeforest.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £32, Season Pass: £269',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Coed y Brenin',
    description: 'Family-friendly bike park in Wales.',
    location: 'Dolgellau, Wales, UK',
    coordinates: {
      latitude: 52.7500,
      longitude: -3.9167
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['coedybrenin1.jpg', 'coedybrenin2.jpg'],
    website: 'https://www.coedybrenin.com',
    contactPhone: '+44 1341 440747',
    contactEmail: 'info@coedybrenin.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £25, Season Pass: £199',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Glentress',
    description: 'Flow trails in the Scottish Borders.',
    location: 'Peebles, Scotland, UK',
    coordinates: {
      latitude: 55.6667,
      longitude: -3.2000
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['glentress1.jpg', 'glentress2.jpg'],
    website: 'https://www.glentress.com',
    contactPhone: '+44 1721 721736',
    contactEmail: 'info@glentress.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £30, Season Pass: £249',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Dalby Forest',
    description: 'Technical trails in Yorkshire.',
    location: 'Pickering, England, UK',
    coordinates: {
      latitude: 54.2500,
      longitude: -0.6667
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['dalby1.jpg', 'dalby2.jpg'],
    website: 'https://www.dalbyforest.com',
    contactPhone: '+44 1751 472771',
    contactEmail: 'info@dalbyforest.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £32, Season Pass: £269',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Cannock Chase',
    description: 'Family-friendly bike park in Staffordshire.',
    location: 'Cannock, England, UK',
    coordinates: {
      latitude: 52.7500,
      longitude: -2.0000
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['cannock1.jpg', 'cannock2.jpg'],
    website: 'https://www.cannockchase.com',
    contactPhone: '+44 1543 452551',
    contactEmail: 'info@cannockchase.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £25, Season Pass: £199',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Hamsterley Forest',
    description: 'Flow trails in County Durham.',
    location: 'Bishop Auckland, England, UK',
    coordinates: {
      latitude: 54.6667,
      longitude: -1.9167
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['hamsterley1.jpg', 'hamsterley2.jpg'],
    website: 'https://www.hamsterleyforest.com',
    contactPhone: '+44 1388 488312',
    contactEmail: 'info@hamsterleyforest.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: £30, Season Pass: £249',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },

  // US Bike Parks
  {
    name: 'Whistler Bike Park',
    description: 'World-famous mountain bike park with over 70 trails.',
    location: 'Whistler, British Columbia, USA',
    coordinates: {
      latitude: 50.1163,
      longitude: -122.9574
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'World Cup Track'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['whistler1.jpg', 'whistler2.jpg'],
    website: 'https://www.whistlerbikepark.com',
    contactPhone: '+1 604-932-3434',
    contactEmail: 'info@whistlerbikepark.com',
    hours: '10:00 AM - 8:00 PM',
    pricing: 'Day Pass: $89, Season Pass: $699',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Trestle Bike Park',
    description: 'Premier bike park in Colorado.',
    location: 'Winter Park, Colorado, USA',
    coordinates: {
      latitude: 39.8833,
      longitude: -105.7667
    },
    difficulty: 'All Levels',
    features: ['Flow Trails', 'Technical Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid', 'Bike Wash'],
    images: ['trestle1.jpg', 'trestle2.jpg'],
    website: 'https://www.trestlebikepark.com',
    contactPhone: '+1 970-726-5514',
    contactEmail: 'info@trestlebikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $79, Season Pass: $599',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Highland Mountain Bike Park',
    description: 'Technical trails in New Hampshire.',
    location: 'Northfield, New Hampshire, USA',
    coordinates: {
      latitude: 43.4333,
      longitude: -71.5833
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['highland1.jpg', 'highland2.jpg'],
    website: 'https://www.highlandmountain.com',
    contactPhone: '+1 603-286-7417',
    contactEmail: 'info@highlandmountain.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Mountain Creek Bike Park',
    description: 'Family-friendly bike park in New Jersey.',
    location: 'Vernon, New Jersey, USA',
    coordinates: {
      latitude: 41.1833,
      longitude: -74.5000
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['mountaincreek1.jpg', 'mountaincreek2.jpg'],
    website: 'https://www.mountaincreekbikepark.com',
    contactPhone: '+1 973-827-2000',
    contactEmail: 'info@mountaincreekbikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $59, Season Pass: $399',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Snowshoe Bike Park',
    description: 'Flow trails in West Virginia.',
    location: 'Snowshoe, West Virginia, USA',
    coordinates: {
      latitude: 38.4167,
      longitude: -79.9833
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['snowshoe1.jpg', 'snowshoe2.jpg'],
    website: 'https://www.snowshoebikepark.com',
    contactPhone: '+1 304-572-1000',
    contactEmail: 'info@snowshoebikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Thunder Mountain Bike Park',
    description: 'Technical trails in Massachusetts.',
    location: 'Charlemont, Massachusetts, USA',
    coordinates: {
      latitude: 42.6167,
      longitude: -72.8667
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['thundermountain1.jpg', 'thundermountain2.jpg'],
    website: 'https://www.thundermountainbikepark.com',
    contactPhone: '+1 413-339-6617',
    contactEmail: 'info@thundermountainbikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Windrock Bike Park',
    description: 'Family-friendly bike park in Tennessee.',
    location: 'Oliver Springs, Tennessee, USA',
    coordinates: {
      latitude: 36.0333,
      longitude: -84.3333
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['windrock1.jpg', 'windrock2.jpg'],
    website: 'https://www.windrockbikepark.com',
    contactPhone: '+1 865-435-3492',
    contactEmail: 'info@windrockbikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $59, Season Pass: $399',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Angel Fire Bike Park',
    description: 'Flow trails in New Mexico.',
    location: 'Angel Fire, New Mexico, USA',
    coordinates: {
      latitude: 36.3833,
      longitude: -105.2833
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['angelfire1.jpg', 'angelfire2.jpg'],
    website: 'https://www.angelfirebikepark.com',
    contactPhone: '+1 575-377-6401',
    contactEmail: 'info@angelfirebikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Crested Butte Bike Park',
    description: 'Technical trails in Colorado.',
    location: 'Crested Butte, Colorado, USA',
    coordinates: {
      latitude: 38.8667,
      longitude: -106.9833
    },
    difficulty: 'Advanced',
    features: ['Technical Trails', 'Rock Gardens', 'Steep Sections'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['crestedbutte1.jpg', 'crestedbutte2.jpg'],
    website: 'https://www.crestedbuttebikepark.com',
    contactPhone: '+1 970-349-2334',
    contactEmail: 'info@crestedbuttebikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Big Sky Bike Park',
    description: 'Family-friendly bike park in Montana.',
    location: 'Big Sky, Montana, USA',
    coordinates: {
      latitude: 45.2667,
      longitude: -111.3000
    },
    difficulty: 'Beginner',
    features: ['Flow Trails', 'Beginner Area', 'Family Trails'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['bigsky1.jpg', 'bigsky2.jpg'],
    website: 'https://www.bigskybikepark.com',
    contactPhone: '+1 406-995-5000',
    contactEmail: 'info@bigskybikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $59, Season Pass: $399',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  },
  {
    name: 'Sun Valley Bike Park',
    description: 'Flow trails in Idaho.',
    location: 'Sun Valley, Idaho, USA',
    coordinates: {
      latitude: 43.6833,
      longitude: -114.3500
    },
    difficulty: 'Intermediate',
    features: ['Flow Trails', 'Jump Lines', 'Beginner Area'],
    amenities: ['Bike Rental', 'Lessons', 'Cafeteria', 'First Aid'],
    images: ['sunvalley1.jpg', 'sunvalley2.jpg'],
    website: 'https://www.sunvalleybikepark.com',
    contactPhone: '+1 208-622-4111',
    contactEmail: 'info@sunvalleybikepark.com',
    hours: '9:00 AM - 5:00 PM',
    pricing: 'Day Pass: $69, Season Pass: $499',
    hasLiftAccess: true,
    hasTechnicalSections: false,
    hasJumps: true,
    hasDrops: false,
    createdBy: new mongoose.Types.ObjectId('65f8a1b2c3d4e5f6a7b8c9d0')
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Get admin user
      const adminUser = await User.findOne({ email: 'admin@example.com' });
      if (!adminUser) {
        console.error('Admin user not found. Please run seedAdminUser.ts first.');
        return;
      }

      // Clear existing bike parks
      await BikePark.deleteMany({});
      console.log('Cleared existing bike parks');

      // Add createdBy to each bike park
      const bikeParksWithAdmin = initialBikeParks.map(park => ({
        ...park,
        createdBy: adminUser._id
      }));

      // Insert new bike parks
      const bikeParks = await BikePark.insertMany(bikeParksWithAdmin);
      console.log(`Successfully seeded ${bikeParks.length} bike parks`);
      
      // Log the created bike parks
      bikeParks.forEach((park: any) => {
        console.log(`Created bike park: ${park.name}`);
      });
      
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