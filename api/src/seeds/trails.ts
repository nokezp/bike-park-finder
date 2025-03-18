import { Trail } from '../models/index.js';
import type { Document } from 'mongoose';
import { IBikePark } from '../models/index.js';

export async function seedTrails(bikeParks: (Document<unknown, {}, IBikePark> & IBikePark & { _id: any })[]) {
  const trails = bikeParks.flatMap(bikePark => {
    if (bikePark.name === 'Whistler Mountain Bike Park') {
      return [
        {
          name: 'A-Line',
          description: 'Whistler\'s most famous jump trail, featuring perfectly sculpted tabletops',
          difficulty: 'advanced',
          length: 3.4,
          elevation: 375,
          features: ['jumps', 'berms', 'flow'],
          status: 'open',
          bikeParkId: bikePark.id
        },
        {
          name: 'B-Line',
          description: 'A beginner-friendly flow trail perfect for learning',
          difficulty: 'beginner',
          length: 2.8,
          elevation: 325,
          features: ['berms', 'flow', 'small jumps'],
          status: 'open',
          bikeParkId: bikePark.id
        }
      ];
    }
    if (bikePark.name === 'Highland Mountain Bike Park') {
      return [
        {
          name: 'Happy Hour',
          description: 'A flowy intermediate jump trail',
          difficulty: 'intermediate',
          length: 1.2,
          elevation: 200,
          features: ['jumps', 'berms', 'flow'],
          status: 'open',
          bikeParkId: bikePark.id
        },
        {
          name: 'NE Style',
          description: 'Technical trail with rocks and roots',
          difficulty: 'advanced',
          length: 0.8,
          elevation: 180,
          features: ['technical', 'rocks', 'roots'],
          status: 'open',
          bikeParkId: bikePark.id
        }
      ];
    }
    if (bikePark.name === 'Bike Park Wales') {
      return [
        {
          name: 'Terry\'s Belly',
          description: 'Fast and flowy red trail with big berms',
          difficulty: 'intermediate',
          length: 2.1,
          elevation: 250,
          features: ['berms', 'flow', 'jumps'],
          status: 'open',
          bikeParkId: bikePark.id
        },
        {
          name: 'Dai Hard',
          description: 'Technical black trail with challenging features',
          difficulty: 'expert',
          length: 1.5,
          elevation: 220,
          features: ['technical', 'drops', 'rock gardens'],
          status: 'open',
          bikeParkId: bikePark.id
        }
      ];
    }
    return [];
  });

  await Trail.create(trails);
} 