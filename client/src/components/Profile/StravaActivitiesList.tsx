import React from 'react';
import { useQuery } from 'urql';
import { StravaActivitiesDocument, StravaActivity } from '../../lib/graphql/generated/graphql-operations';
import StravaActivityCard from './StravaActivityCard';

interface StravaActivitiesListProps {
  limit?: number;
}

const StravaActivitiesList: React.FC<StravaActivitiesListProps> = ({ limit = 5 }) => {
  const [{ data, fetching, error }] = useQuery({
    query: StravaActivitiesDocument,
    variables: {
      page: 1,
      perPage: limit
    }
  });

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 text-white p-2 rounded-full">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <p className="font-semibold">Loading Strava activities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Error loading Strava activities</p>
            <p className="text-sm text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const activities = data?.stravaActivities || [];

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">No Strava activities found</p>
            <p className="text-sm text-gray-600">Connect your Strava account to see your activities here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity: StravaActivity) => (
        <StravaActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default StravaActivitiesList;
