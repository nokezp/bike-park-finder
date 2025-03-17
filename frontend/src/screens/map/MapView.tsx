import React from 'react';

type BikePark = {
  _id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  difficulty: string;
};

type MapViewProps = {
  bikeParks: BikePark[];
  onMarkerPress: (parkId: string) => void;
  getDifficultyColor: (difficulty: string) => string;
};

// This file serves as an entry point for platform-specific implementations
// The actual implementation is in MapView.web.tsx or MapView.native.tsx
const MapView: React.FC<MapViewProps> = (props) => {
  // This component will never be rendered directly
  // It's just a placeholder for TypeScript
  return null;
};

export default MapView; 