import React from 'react';

export interface EventCardProps {
  type: 'Competition' | 'Workshop' | 'Festival';
  date: string;
  title: string;
  location: string;
  registeredCount: number;
  onViewDetails?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  date,
  title,
  location,
  registeredCount,
  onViewDetails
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'Competition':
        return 'bg-blue-100 text-blue-600';
      case 'Workshop':
        return 'bg-green-100 text-green-600';
      case 'Festival':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`${getTypeStyles()} px-3 py-1 rounded-full text-sm`}>
            {type}
          </div>
          <span className="text-gray-600">{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{location}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-users text-gray-600"></i>
            <span className="text-gray-600">{registeredCount} registered</span>
          </div>
          <button 
            onClick={onViewDetails}
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 