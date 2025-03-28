import { BikeParkModel } from "../graphql-modules/bike-park/src/models/BikeParkModel.js";

export async function seedBikeParks(adminId: string) {
  const bikeParks = [
    {
      name: 'Whistler Mountain Bike Park',
      description: 'World-renowned bike park featuring over 70 trails across 4 mountain zones',
      location: 'Whistler, British Columbia, Canada',
      coordinates: {
        latitude: 50.1163,
        longitude: -122.9574
      },
      difficulty: ['beginner', 'intermediate', 'advanced', 'expert'],
      features: ['jumps', 'drops', 'berms', 'technical', 'flow trails', 'wooden features'],
      facilities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop', 'lift access'],
      createdBy: adminId
    },
    {
      name: 'Highland Mountain Bike Park',
      description: 'Dedicated lift-access mountain bike park with progression-based trails',
      location: 'Northfield, New Hampshire, USA',
      coordinates: {
        latitude: 43.4505,
        longitude: -71.6163
      },
      difficulty: ['beginner', 'intermediate', 'advanced'],
      features: ['jumps', 'drops', 'berms', 'flow trails', 'skills area'],
      facilities: ['parking', 'bike rentals', 'lessons', 'food', 'bike shop'],
      createdBy: adminId
    },
    {
      name: 'Bike Park Wales',
      description: 'The UK\'s premier mountain bike park with trails for all abilities',
      location: 'Merthyr Tydfil, Wales, UK',
      coordinates: {
        latitude: 51.7397,
        longitude: -3.3812
      },
      difficulty: ['beginner', 'intermediate', 'advanced', 'expert'],
      features: ['jumps', 'drops', 'berms', 'technical', 'flow trails'],
      facilities: ['parking', 'bike rentals', 'lessons', 'cafe', 'bike shop', 'uplift service'],
      createdBy: adminId
    }
  ];

  const createdBikeParks = await BikeParkModel.create(bikeParks);
  return createdBikeParks;
} 