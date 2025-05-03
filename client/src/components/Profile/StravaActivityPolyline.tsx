import React from 'react';

interface StravaActivityPolylineProps {
  polyline: string;
}

const MAPBOX_API_KEY = 'pk.eyJ1Ijoibm9rZXpwbmV3IiwiYSI6ImNtOGQya3BnZzFiZnkya3M1bWEzMzVuYXkifQ.rOk1OezputSSawqlWIMycQ';

const StravaActivityPolyline: React.FC<StravaActivityPolylineProps> = ({ polyline }) => {
  const encodedURIComponent = encodeURIComponent(polyline);
  const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/path-3+ff0000(${encodedURIComponent})/auto/800x600?access_token=${MAPBOX_API_KEY}`;

  return <img src={imageUrl} alt="Static Map" style={{ maxWidth: '100%', height: 'auto' }} />;
};

export default StravaActivityPolyline;
