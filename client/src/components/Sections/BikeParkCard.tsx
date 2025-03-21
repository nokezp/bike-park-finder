import React from 'react';
import { useNavigate } from 'react-router-dom';
import FallbackImage from '../FallbackImage';
import { getColorByIndex } from '../../utils/colors';

interface BikePark {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  features: string[];
  temperature: number;
  weatherIcon: string;
}

interface BikeParkCardProps {
  bikePark: BikePark;
}

const BikeParkCard: React.FC<BikeParkCardProps> = ({ bikePark }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/bike-parks/${bikePark.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <FallbackImage
          src={bikePark.imageUrl}
          alt={bikePark.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm">
          <i className="fa-solid fa-star text-yellow-400"></i> {bikePark.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{bikePark.name}</h3>
        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <i className="fa-solid fa-location-dot"></i>
          <span>{bikePark.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {bikePark.features.map((feature, index) => {
            const color = getColorByIndex(index);
            return (
              <span 
                key={feature}
                className={`px-3 py-1 bg-${color}-100 text-${color}-600 rounded-full text-sm`}
              >
                {feature}
              </span>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className={`fa-solid ${bikePark.weatherIcon} text-gray-600`}></i>
            <span className="text-gray-600">{bikePark.temperature}°C</span>
          </div>
          <button 
            onClick={handleViewDetails}
            className="text-emerald-600 hover:text-emerald-700"
          >
            View Details <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}; 

export default BikeParkCard