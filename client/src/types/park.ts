export interface Park {
  _id: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  difficulty: string;
  features: string[];
  amenities: string[];
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
} 