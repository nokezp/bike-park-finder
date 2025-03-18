import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Park {
  _id: string;
  name: string;
  description: string;
  location: string;
  coordinates: Coordinates;
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
  onSelect?: (park: Park) => void;
  isSelected?: boolean;
}

const ParkCard: React.FC<ParkCardProps> = ({ park, onSelect, isSelected }) => {
  return (
    <div 
      data-testid="park-card"
      className={`bg-white rounded-lg shadow-md overflow-hidden ${isSelected ? 'border-2 border-blue-500' : ''}`}
      onClick={() => onSelect?.(park)}
    >
      <div className="relative h-48">
        {park.images[0] && (
          <Image
            src={park.images[0]}
            alt={park.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{park.name}</h3>
        <p className="text-gray-600 mb-2">{park.description}</p>
        <p className="text-gray-500 mb-2">{park.location}</p>
        <div className="flex items-center mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {park.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {park.features.map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {park.amenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {park.hasLiftAccess && (
            <svg data-testid="lift-icon" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 3.83L19.17 20H4.83L12 5.83z"/>
            </svg>
          )}
          {park.hasTechnicalSections && (
            <svg data-testid="technical-icon" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 3.83L19.17 20H4.83L12 5.83z"/>
            </svg>
          )}
          {park.hasJumps && (
            <svg data-testid="jumps-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          )}
          {park.hasDrops && (
            <svg data-testid="drops-icon" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 3.83L19.17 20H4.83L12 5.83z"/>
            </svg>
          )}
        </div>
        <Link
          href={`/parks/${park._id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-4"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ParkCard; 