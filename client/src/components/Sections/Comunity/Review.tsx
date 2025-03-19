import React from 'react';

export interface ReviewProps {
  avatar: string;
  name: string;
  rating: number;
  comment: string;
}

const Review: React.FC<ReviewProps> = ({
  avatar,
  name,
  rating,
  comment
}) => {
  return (
    <div className="border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img 
            src={avatar} 
            className="w-8 h-8 rounded-full"
            alt={name}
          />
          <span className="font-semibold">{name}</span>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fa-${i < rating ? 'solid' : 'regular'} fa-star`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

export default Review; 