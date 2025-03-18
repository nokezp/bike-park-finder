'use client';

import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import type { ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Park {
  _id: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  features: string[];
  amenities: string[];
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface MapViewProps {
  parks: Park[];
}

export default function MapView({ parks }: MapViewProps) {
  const [popupInfo, setPopupInfo] = useState<Park | null>(null);
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 45.5155,
    longitude: -122.6789,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  // Filter out parks with invalid coordinates
  const validParks = parks.filter(park => 
    park.coordinates?.latitude && 
    park.coordinates?.longitude && 
    !isNaN(park.coordinates.latitude) && 
    !isNaN(park.coordinates.longitude)
  );

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {validParks.map((park) => (
        <Marker
          key={"marker_" + park._id}
          latitude={park.coordinates.latitude}
          longitude={park.coordinates.longitude}
          onClick={() => setPopupInfo(park)}
        >
          <div className="cursor-pointer text-2xl">📍</div>
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          latitude={popupInfo.coordinates.latitude}
          longitude={popupInfo.coordinates.longitude}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
        >
          <div className="card">
            <h3 className="font-bold">{popupInfo.name}</h3>
            <p className="text-sm text-accent">{popupInfo.difficulty}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
} 