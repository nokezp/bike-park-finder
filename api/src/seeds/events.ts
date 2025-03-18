import { Event } from '../models/index.js';
import type { Document } from 'mongoose';
import { IBikePark } from '../models/index.js';

export async function seedEvents(bikeParks: (Document<unknown, {}, IBikePark> & IBikePark & { _id: any })[]) {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const events = bikeParks.flatMap(bikePark => {
    if (bikePark.name === 'Whistler Mountain Bike Park') {
      return [
        {
          name: 'Crankworx Whistler',
          description: 'The ultimate mountain biking festival featuring competitions and demos',
          date: new Date(currentDate.getTime() + 30 * oneDay),
          type: 'competition',
          status: 'scheduled',
          capacity: 5000,
          registrationDeadline: new Date(currentDate.getTime() + 25 * oneDay),
          bikeParkId: bikePark.id
        },
        {
          name: 'Beginner Skills Clinic',
          description: 'Learn the basics of mountain biking with certified instructors',
          date: new Date(currentDate.getTime() + 7 * oneDay),
          type: 'clinic',
          status: 'scheduled',
          capacity: 20,
          registrationDeadline: new Date(currentDate.getTime() + 5 * oneDay),
          bikeParkId: bikePark.id
        }
      ];
    }
    if (bikePark.name === 'Highland Mountain Bike Park') {
      return [
        {
          name: 'Highland Throwdown',
          description: 'Annual slopestyle competition with pro riders',
          date: new Date(currentDate.getTime() + 45 * oneDay),
          type: 'competition',
          status: 'scheduled',
          capacity: 1000,
          registrationDeadline: new Date(currentDate.getTime() + 40 * oneDay),
          bikeParkId: bikePark.id
        }
      ];
    }
    if (bikePark.name === 'Bike Park Wales') {
      return [
        {
          name: 'Welsh Open',
          description: 'National downhill racing series round',
          date: new Date(currentDate.getTime() + 60 * oneDay),
          type: 'competition',
          status: 'scheduled',
          capacity: 200,
          registrationDeadline: new Date(currentDate.getTime() + 55 * oneDay),
          bikeParkId: bikePark.id
        },
        {
          name: 'Women\'s Ride Day',
          description: 'A day dedicated to women riders with workshops and group rides',
          date: new Date(currentDate.getTime() + 14 * oneDay),
          type: 'social',
          status: 'scheduled',
          capacity: 50,
          registrationDeadline: new Date(currentDate.getTime() + 12 * oneDay),
          bikeParkId: bikePark.id
        }
      ];
    }
    return [];
  });

  await Event.create(events);
} 