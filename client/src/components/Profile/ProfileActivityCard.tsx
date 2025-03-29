import React from 'react';
import { FaRegComment, FaRegHeart, FaStar } from 'react-icons/fa';
import { formatDate } from '../Review/ReviewList';

interface ProfileActivityCardProps {
  type: 'ride' | 'review';
  timestamp: string;
  data: {
    username?: string;
    distance?: string;
    elevation?: string;
    duration?: string;
    parkName?: string;
    review?: string;
    likes?: number;
    comments?: number;
  };
}

const ProfileActivityCard: React.FC<ProfileActivityCardProps> = ({ type, timestamp, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{data.username}</p>
            <p className="text-sm text-gray-600">{type === 'ride' ? 'Completed a ride at Whistler Bike Park' : 'Posted a review'}</p>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{formatDate(timestamp)}</span>
      </div>
      {type === 'ride' ? (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{data.distance}</div>
              <div className="text-gray-600 text-sm">Distance</div>
            </div>
            <div>
              <div className="text-lg font-bold">{data.elevation}</div>
              <div className="text-gray-600 text-sm">Elevation</div>
            </div>
            <div>
              <div className="text-lg font-bold">{data.duration}</div>
              <div className="text-gray-600 text-sm">Duration</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="font-semibold">{data.parkName}</span>
            </div>
            <p className="text-gray-600">{data.review}</p>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <FaRegHeart className="inline mr-1" />
              {data.likes} Likes
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FaRegComment className="inline mr-1" />
              {data.comments} Comments
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileActivityCard;