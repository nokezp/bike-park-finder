import React from 'react';
import { FaStrava, FaMapMarkerAlt, FaArrowUp, FaClock, FaRoad, FaTrophy, FaThumbsUp } from 'react-icons/fa';
import { StravaActivity } from '../../lib/graphql/generated/graphql-operations';
import StravaActivityPolyline from './StravaActivityPolyline';

interface StravaActivityCardProps {
  activity: StravaActivity;
}

const StravaActivityCard: React.FC<StravaActivityCardProps> = ({ activity }) => {
  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  const formatElevation = (meters: number): string => {
    return `${meters.toFixed(0)} m`;
  };

  const formatMovingTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateAverageSpeed = (meters: number, seconds: number): string => {
    const hours = seconds / 3600;
    const km = meters / 1000;
    const kmh = km / hours;
    return `${kmh.toFixed(1)} km/h`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 text-white p-2 rounded-full">
            <FaStrava size={20} />
          </div>
          <div>
            <p className="font-semibold">{activity.name}</p>
            <p className="text-sm text-gray-600">{activity.type} • {formatDate(activity.startDate)}</p>
          </div>
        </div>
        <img
          src="https://cdn.worldvectorlogo.com/logos/strava-2.svg"
          alt="Strava Logo"
          className="h-6"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 xl:hidden">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">{formatDistance(activity.distance)}</div>
            <div className="text-gray-600 text-sm flex items-center justify-center">
              <FaRoad className="mr-1" /> Distance
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">{formatElevation(activity.totalElevationGain)}</div>
            <div className="text-gray-600 text-sm flex items-center justify-center">
              <FaArrowUp className="mr-1" /> Elevation
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">{formatMovingTime(activity.movingTime)}</div>
            <div className="text-gray-600 text-sm flex items-center justify-center">
              <FaClock className="mr-1" /> Moving Time
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">{activity.achievementCount}</div>
            <div className="text-gray-600 text-sm flex items-center justify-center">
              <FaTrophy className="mr-1" /> Achievements
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col xl:flex-row mb-4 xl:mb-0 gap-4'>
        {activity.map?.summaryPolyline && (
          <StravaActivityPolyline key={activity.map.id} polyline={activity.map.summaryPolyline} />
        )}

        <div className="bg-gray-50 rounded-lg p-4 mb-4 w-full flex-col justify-center gap-16 hidden xl:flex">
          <div className="flex flex-row items-center justify-center text-center">
            <div>
              <div className="text-gray-600 text-sm flex items-center justify-center">
                <div className="text-lg font-bold">{activity.achievementCount}</div> <FaTrophy className="ml-1" />
              </div>
              Achievements
            </div>
          </div>

          <div className="flex flex-row items-center justify-between text-center">
            <div>
              <div className="text-lg font-bold">{formatDistance(activity.distance)}</div>
              <div className="text-gray-600 text-sm flex items-center justify-center">
                <FaRoad className="mr-1" /> Distance
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">{formatElevation(activity.totalElevationGain)}</div>
              <div className="text-gray-600 text-sm flex items-center justify-center">
                <FaArrowUp className="mr-1" /> Elevation
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">{formatMovingTime(activity.movingTime)}</div>
              <div className="text-gray-600 text-sm flex items-center justify-center">
                <FaClock className="mr-1" /> Moving Time
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between text-center">
            {activity.startLatlng && Array.isArray(activity.startLatlng) && activity.startLatlng.length >= 2 && (
              <div>
                <div className="text-lg font-bold">{activity.startLatlng[0]?.toFixed(4) || '0.0000'}, {activity.startLatlng[1]?.toFixed(4) || '0.0000'}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center">
                  <FaMapMarkerAlt className="mr-1" /> Start
                </div>
              </div>
            )}
            {activity.averageSpeed && (
              <div>
                <div className="text-lg font-bold">{calculateAverageSpeed(activity.distance, activity.movingTime)}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center">
                  <FaRoad className="mr-1" /> Avg Speed
                </div>
              </div>

            )}
            {activity.kudosCount !== undefined && activity.kudosCount !== null && activity.kudosCount > 0 && (
              <div>
                <div className="text-lg font-bold">{activity.kudosCount}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center">
                  <FaThumbsUp className="mr-1" /> Kudos
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 xl:hidden">
        {activity.startLatlng && Array.isArray(activity.startLatlng) && activity.startLatlng.length >= 2 && (
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>Start: {activity.startLatlng[0]?.toFixed(4) || '0.0000'}, {activity.startLatlng[1]?.toFixed(4) || '0.0000'}</span>
          </div>
        )}
        {activity.averageSpeed && (
          <div>
            Avg Speed: {calculateAverageSpeed(activity.distance, activity.movingTime)}
          </div>
        )}
        {activity.kudosCount !== undefined && activity.kudosCount !== null && activity.kudosCount > 0 && (
          <div>
            Kudos: {activity.kudosCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default StravaActivityCard;
