import { Document, Model } from 'mongoose';

export interface IBikePark extends Document {
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'All Levels';
  features: string[];
  amenities: string[];
  images: string[];
  website?: string;
  contactPhone?: string;
  contactEmail?: string;
  hours?: string;
  pricing?: string;
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  createdBy: any;
  createdAt: Date;
  updatedAt: Date;
}

declare const BikePark: Model<IBikePark>;

export default BikePark; 