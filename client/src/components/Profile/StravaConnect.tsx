/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'urql';
import { DisconnectStravaDocument, StravaAuthUrlDocument, StravaConnectionDocument } from '../../lib/graphql/generated/graphql-operations';

const StravaConnect: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  // Query to check if user is connected to Strava
  const [connectionResult, reexecuteConnectionQuery] = useQuery({
    query: StravaConnectionDocument,
  });

  // Query to get Strava authorization URL
  const [authUrlResult, executeAuthUrlQuery] = useQuery({
    query: StravaAuthUrlDocument,
    variables: {
      state: localStorage.getItem('token'), // Use the JWT token as the state parameter
    },
    pause: true, // Don't execute this query automatically
  });

  // Mutation to disconnect from Strava
  const [disconnectResult, disconnectStrava] = useMutation(DisconnectStravaDocument);

  useEffect(() => {
    if (authUrlResult?.data?.stravaAuthUrl) {
      console.log('authUrlResult: ', authUrlResult?.data?.stravaAuthUrl);

      // Redirect to Strava authorization page
      window.location.href = authUrlResult.data.stravaAuthUrl;
    }
  }, [authUrlResult?.data?.stravaAuthUrl]);

  // Handle connect button click
  const handleConnect = async () => {
    setIsConnecting(true);

    try {
      // Execute the auth URL query
      executeAuthUrlQuery({ requestPolicy: 'network-only' });
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Error connecting to Strava:', error);
      setIsConnecting(false);
    }
  };

  // Handle disconnect button click
  const handleDisconnect = async () => {
    try {
      await disconnectStrava();
      reexecuteConnectionQuery({ requestPolicy: 'network-only' });
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Error disconnecting from Strava:', error);
    }
  };

  // Loading state
  if (connectionResult.fetching) {
    return <div className="p-4 bg-white rounded-lg shadow-sm">Loading Strava connection...</div>;
  }

  // Error state
  if (connectionResult.error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="text-red-500">Error: {connectionResult.error.message}</p>
      </div>
    );
  }

  // Get connection status
  const { connected, athlete } = connectionResult.data?.stravaConnection || { connected: false, athlete: null };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Strava Integration</h2>
        <img src="https://cdn.worldvectorlogo.com/logos/strava-2.svg" alt="Strava Logo" className="h-8" />
      </div>

      {connected ? (
        <div>
          <div className="flex items-center mb-4">
            {athlete?.profile && (
              <img
                src={athlete.profile}
                alt={`${athlete.firstname} ${athlete.lastname}`}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <p className="font-medium">
                Connected as {athlete ? `${athlete.firstname} ${athlete.lastname}` : 'Strava Athlete'}
              </p>
              <p className="text-sm text-gray-500">Your Strava activities will be synced with your profile</p>
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            disabled={disconnectResult.fetching}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {disconnectResult.fetching ? 'Disconnecting...' : 'Disconnect from Strava'}
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            Connect your Strava account to sync your activities and share your rides with the community.
          </p>

          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 flex items-center"
          >
            {isConnecting ? 'Connecting...' : 'Connect with Strava'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StravaConnect;
