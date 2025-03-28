import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { defaultMapIcon } from '../Map/Map';

function InvalidateMapSize() {
  const map = useMap();
  map.invalidateSize();
  return null;
}

const TrailMap: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  return (
    <div id="trail-map" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trail Map</h2>
        {/* <button className="text-emerald-600 hover:text-emerald-700">
          <i className="fa-solid fa-expand mr-1"></i>View Full Map
        </button> */}
      </div>
      <div className="relative h-[400px] bg-gray-100 rounded-lg">
        <MapContainer
          center={[bikePark.coordinates?.latitude ?? 0, bikePark.coordinates?.longitude ?? 0]} // Center of Germany
          zoom={6}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <InvalidateMapSize />
          <Marker position={[bikePark.coordinates?.latitude ?? 0, bikePark.coordinates?.longitude ?? 0]} icon={defaultMapIcon} />
        </MapContainer>
      </div>
    </div>);
}

export default TrailMap;