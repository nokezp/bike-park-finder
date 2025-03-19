import React from 'react';

export interface CheckInProps {
  avatar: string;
  name: string;
  location: string;
  timeAgo: string;
}

const CheckIn: React.FC<CheckInProps> = ({
  avatar,
  name,
  location,
  timeAgo
}) => {
  return (
    <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
      <img 
        src={avatar} 
        className="w-10 h-10 rounded-full"
        alt={name}
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">
          Checked in at {location} • {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default CheckIn; 