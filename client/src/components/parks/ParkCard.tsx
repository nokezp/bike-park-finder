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
      className={`card ${
        isSelected ? 'border-2 border-accent' : ''
      }`}
      onClick={() => onSelect(park)}
    >
      <h2 className="text-2xl font-display font-bold mb-2">{park.name}</h2>
      <p className="text-sm mb-2 text-secondary font-body">{park.location}</p>
      <p className="text-sm mb-2 text-secondary font-body">{park.description}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-body font-medium text-secondary">Difficulty:</span>
        <span className="text-sm font-body text-accent">{park.difficulty}</span>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-display font-medium mb-1">Features:</h3>
        <div className="flex flex-wrap gap-2">
          {park.features.map((feature) => (
            <span key={"park_" + park._id + "_feature_" + feature} className="tag">
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-display font-medium mb-1">Amenities:</h3>
        <div className="flex flex-wrap gap-2">
          {park.amenities.map((amenity) => (
            <span key={"park_" + park._id + "_amenity_" + amenity} className="tag">
              {amenity}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-display font-medium mb-1">Characteristics:</h3>
        <div className="flex flex-wrap gap-2">
          {park.hasLiftAccess && (
            <span className="tag">Lift Access</span>
          )}
          {park.hasTechnicalSections && (
            <span className="tag">Technical Sections</span>
          )}
          {park.hasJumps && (
            <span className="tag">Jumps</span>
          )}
          {park.hasDrops && (
            <span className="tag">Drops</span>
          )}
        </div>
      </div>
    </div>
  );
} 