import React from 'react';
import StarRating from '../Review/StarRating';
import { formatDate } from '../Review/ReviewList';

interface ProfileReviewCardProps {
  parkName?: string | null | undefined;
  review: string;
  date: string;
  likes: number;
  comments: number;
  rating: number;
}

const ProfileReviewCard: React.FC<ProfileReviewCardProps> = ({ parkName, review, date, likes, comments, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 rounded-lg object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4c283db39f-6a44dee4d87bfec7f9b6.png" alt="mountain bike park with jumps and forest background, professional photo" />
          <div>
            {parkName && (
              <h3 className="font-semibold text-lg">{parkName}</h3>
            )}
            <div className="flex items-center space-x-2">
              <StarRating rating={rating} />
              <span className="text-sm text-gray-500">{rating}</span>
            </div>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{formatDate(date)}</span>
      </div>
      <p className="text-gray-600 mb-4">{review}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">#AdvancedTrails</span>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">#JumpLine</span>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">#MustVisit</span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-emerald-600">
          <i className="fa-regular fa-heart"></i>
          <span>{likes} Helpful</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-emerald-600">
          <i className="fa-regular fa-comment"></i>
          <span>{comments} Comments</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileReviewCard;