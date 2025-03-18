export { User } from './User.js';
export { BikePark } from './BikePark.js';
export { Trail } from './Trail.js';
export { Event } from './Event.js';

export interface IBikePark {
  id?: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  features: string[];
  amenities: string[];
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
} 