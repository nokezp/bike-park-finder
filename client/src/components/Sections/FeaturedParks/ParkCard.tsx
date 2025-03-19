import React from 'react';
import FallbackImage from '../../FallbackImage';

interface Tag {
  label: string;
  color: 'emerald' | 'red' | 'green' | 'yellow' | 'purple' | 'blue' | 'orange';
}

export interface ParkCardProps {
  id: string;
  image: string;
  rating: number;
  name: string;
  location: string;
  tags: Tag[];
  temperature: number;
  weatherIcon: 'cloud-sun' | 'cloud' | 'sun';
  onViewDetails?: (id: string) => void;
}

const ParkCard: React.FC<ParkCardProps> = ({
  id,
  image,
  rating,
  name,
  location,
  tags,
  temperature,
  weatherIcon,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
      <div className="relative h-48">
          <FallbackImage
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm">
            <i className="fa-solid fa-star text-yellow-400"></i> {rating.toFixed(1)}
          </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <i className="fa-solid fa-location-dot"></i>
          <span>{location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 bg-${tag.color}-100 text-${tag.color}-600 rounded-full text-sm`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className={`fa-solid fa-${weatherIcon} text-gray-600`}></i>
            <span className="text-gray-600">{temperature}°C</span>
          </div>
          <button 
            onClick={() => onViewDetails?.(id)}
            className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-1
                     transform hover:translate-x-1 transition-transform duration-200"
          >
            <span>View Details</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkCard; 