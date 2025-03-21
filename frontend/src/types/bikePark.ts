export enum Difficulty {
  ALL = 'All Levels',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert'
}

export enum Feature {
  ALL = 'All Features',
  FLOW = 'Flow Trails',
  JUMP = 'Jump Lines',
  TECHNICAL = 'Technical',
  SKILLS = 'Skills'
}

export enum Amenity {
  LIFT = 'Lift Access',
  RENTAL = 'Rental',
  FOOD = 'Food'
}

export enum SortOption {
  RATING = 'Rating',
  DISTANCE = 'Distance'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BikePark {
  id: string;
  name: string;
  location: string;
  rating: number;
  difficulty: Difficulty;
  features: Feature[];
  imageUrl: string;
  coordinates: [number, number];
  amenities?: Amenity[];
}

export interface MapMarker {
  coordinates: [number, number];
  title: string;
  description: string;
}

export interface SearchFilters {
  location?: string;
  difficulty?: Difficulty;
  features?: Feature[];
  amenities?: Amenity[];
  sortBy: SortOption;
} 