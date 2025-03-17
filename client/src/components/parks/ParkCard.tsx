'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Park {
  _id: string;
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
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface ParkCardProps {
  park: Park;
  isSelected: boolean;
  onSelect: (park: Park) => void;
}

export default function ParkCard({ park, isSelected, onSelect }: ParkCardProps) {
  return (
    <div
      role="article"
      data-testid="park-card"
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-colors ${
        isSelected ? 'border-2 border-accent' : 'border border-secondary-light'
      } bg-white text-secondary hover:shadow-lg`}
      onClick={() => onSelect(park)}
    >
      <h2 className="font-display text-2xl font-bold mb-2 text-primary">{park.name}</h2>
      <p className="font-body text-sm mb-2 text-secondary">{park.location}</p>
      <p className="font-body text-sm mb-2 text-secondary">{park.description}</p>
      <div className="flex items-center gap-2">
        <span className="font-body text-sm font-medium text-secondary">Difficulty:</span>
        <span className="font-body text-sm text-accent">{park.difficulty}</span>
      </div>
      <div className="mt-2">
        <h3 className="font-display text-sm font-medium mb-1 text-primary">Features:</h3>
        <div className="flex flex-wrap gap-2">
          {park.features.map((feature) => (
            <span key={"park_" + park._id + "_feature_" + feature} className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-display text-sm font-medium mb-1 text-primary">Amenities:</h3>
        <div className="flex flex-wrap gap-2">
          {park.amenities.map((amenity) => (
            <span key={"park_" + park._id + "_amenity_" + amenity} className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">
              {amenity}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-display text-sm font-medium mb-1 text-primary">Characteristics:</h3>
        <div className="flex flex-wrap gap-2">
          {park.hasLiftAccess && (
            <span className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">Lift Access</span>
          )}
          {park.hasTechnicalSections && (
            <span className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">Technical Sections</span>
          )}
          {park.hasJumps && (
            <span className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">Jumps</span>
          )}
          {park.hasDrops && (
            <span className="font-body text-xs px-2 py-1 rounded-full bg-background text-secondary">Drops</span>
          )}
        </div>
      </div>
    </div>
  );
} 