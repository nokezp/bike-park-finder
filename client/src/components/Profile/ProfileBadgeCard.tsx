import React from 'react';
import { getRandomColor } from '../../utils/colors';

interface ProfileReviewCardProps {
  badgeName: string;
  description: string;
  icon: string;
  status: string;
}

const ProfileBadgeCard: React.FC<ProfileReviewCardProps> = ({ badgeName, description, icon, status }) => {
  const color = getRandomColor();
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className={`w-24 h-24 mx-auto mb-4 bg-${color}-100 rounded-full flex items-center justify-center`}>
        <i className={`fa-solid ${icon} text-4xl text-${color}-600`}></i>
      </div>
      <h3 className="text-lg font-semibold mb-2">{badgeName}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex justify-center items-center">
        <span className={`bg-${color}-500 text-white text-xs px-3 py-1 rounded-full`}>{status}</span>
      </div>
    </div>
  );
};

export default ProfileBadgeCard;