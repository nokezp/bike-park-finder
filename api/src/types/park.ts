export interface Park {
  id: string;
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
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
} 