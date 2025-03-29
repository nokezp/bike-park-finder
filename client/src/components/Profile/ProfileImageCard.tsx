import React from 'react';
import { formatDate } from '../Review/ReviewList';

interface ProfileImageCardProps {
  parkName?: string | null | undefined;
  trailName?: string | null | undefined;
  image: string;
  date: string;
  likes: number;
  comments: number;
}

const ProfileImageCard: React.FC<ProfileImageCardProps> = ({ parkName, trailName, image, date, likes, comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <img className="w-full h-full object-cover" src={image} alt={parkName ?? ""} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold">{parkName}</h3>
          <p className="text-gray-200 text-sm">{trailName}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500 text-sm">{formatDate(date)}</span>
          <div className="flex space-x-3">
            <button className="text-gray-500 hover:text-emerald-600">
              <i className="fa-regular fa-heart"></i>
              <span className="ml-1">{likes}</span>
            </button>
            <button className="text-gray-500 hover:text-emerald-600">
              <i className="fa-regular fa-comment"></i>
              <span className="ml-1">{comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCard;