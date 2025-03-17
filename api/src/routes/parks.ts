import express, { Request, Response } from 'express';
import { Park } from '../types/park';

const router = express.Router();

// Mock data - replace with database in production
const parks: Park[] = [
  {
    id: '1',
    name: 'Whistler Bike Park',
    description: 'World-famous mountain bike park with over 70 trails',
    location: 'Whistler, BC',
    coordinates: {
      latitude: 50.1163,
      longitude: -122.9574
    },
    difficulty: 'intermediate',
    features: ['jumps', 'drops', 'technical sections'],
    amenities: ['lift access', 'rental shop', 'cafeteria'],
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true
  },
  {
    id: '2',
    name: 'Trestle Bike Park',
    description: 'Colorado\'s largest bike park with 40+ trails',
    location: 'Winter Park, CO',
    coordinates: {
      latitude: 39.8917,
      longitude: -105.7631
    },
    difficulty: 'beginner',
    features: ['flow trails', 'technical sections'],
    amenities: ['lift access', 'rental shop', 'restaurant'],
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: false
  }
];

// Get all parks
router.get('/', (_req: Request, res: Response): void => {
  res.json(parks);
});

// Get park by ID
router.get('/:id', (req: Request, res: Response): void => {
  const park = parks.find(p => p.id === req.params.id);

  if (!park) {
    res.status(404).json({ error: 'Park not found' });
    return;
  }

  res.json(park);
});

export const parksRouter = router; 