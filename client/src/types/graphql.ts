export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Park {
  _id: string;
  name: string;
  description: string;
  location: string;
  coordinates: Coordinates;
  difficulty: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface ParksQuery {
  parks: Park[];
} 