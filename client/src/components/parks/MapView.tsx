import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';

interface Park {
  _id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  difficulty: string;
}

interface MapViewProps {
  parks: Park[];
}

export default function MapView({ parks }: MapViewProps) {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  useEffect(() => {
    if (parks.length > 0) {
      setViewport({
        latitude: parks[0].coordinates.lat,
        longitude: parks[0].coordinates.lng,
        zoom: 10,
      });
    }
  }, [parks]);

  return (
    <div className="w-full h-[600px] relative" data-testid="map-container">
      <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {parks.map((park: Park) => (
          <Marker
            key={park._id}
            latitude={park.coordinates.lat}
            longitude={park.coordinates.lng}
            onClick={() => setSelectedPark(park)}
            data-testid="park-marker"
          >
            <div className="w-6 h-6 bg-primary rounded-full border-2 border-white" />
          </Marker>
        ))}

        {selectedPark && (
          <Popup
            latitude={selectedPark.coordinates.lat}
            longitude={selectedPark.coordinates.lng}
            onClose={() => setSelectedPark(null)}
            closeButton={true}
            closeOnClick={false}
            data-testid="park-popup"
          >
            <div className="p-2">
              <h3 className="font-bold text-lg">{selectedPark.name}</h3>
              <p className="text-sm text-gray-600">{selectedPark.location}</p>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary text-white rounded">
                  {selectedPark.difficulty}
                </span>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
} 