import React, { useState } from 'react';

const TOTAL_STARS = 5;

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, readOnly = false }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseOver = (index: number) => {
    if (!readOnly) setHoverIndex(index);
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) setHoverIndex(-1);
  };
  
  const handleClick = (index: number) => {
    if (!readOnly && setRating) setRating(index + 1);
  };

  return (
    <div className="flex space-x-1 text-gray-300">
      {[...Array(TOTAL_STARS)].map((_, index) => (
        <i
          key={index}
          className={`fa-solid fa-star ${!readOnly ? 'cursor-pointer hover:text-yellow-400' : ''} ${hoverIndex >= index || rating > index ? 'text-yellow-400' : ''}`}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
