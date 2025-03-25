import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon, latLngBounds, LatLngExpression } from 'leaflet';
import { BikePark, GetBikeParksByViewportDocument } from '../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.css';
import 'react-leaflet-cluster/lib/assets/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

// Simple marker icon without image imports
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new Icon({
  iconUrl: 'https://www.wanderfinder.com/wp-content/uploads/leaflet-maps-marker-icons/bicycle_shop.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [1, -34],
  shadowSize: [37, 37],
});

interface Viewport {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}

function InvalidateMapSize() {
  const map = useMap();
  map.invalidateSize();
  return null;
}

const useBikeParks = (viewport: Viewport, pause: boolean) => {
  const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
  const [error] = useState<Error | null>(null);

  const [{ data, fetching }] = useQuery({
    query: GetBikeParksByViewportDocument,
    variables: { viewport },
    pause,
  });

  useEffect(() => {
    if (data?.bikeParksByViewport) {
      setBikeParks(data?.bikeParksByViewport);
    }
  }, [data?.bikeParksByViewport]);

  return { bikeParks, fetching, error };
};

const Map: React.FC<{
  selectedLocation?: BikePark;
  filteredLocations: BikePark[];
  setSelectedLocationId: (id: string) => void;
  setFilteredLocations: (bikeParks: BikePark[]) => void;
  pause?: boolean;
  setPause: (pause: boolean) => void;
}> = ({ selectedLocation, filteredLocations, setSelectedLocationId, setFilteredLocations, pause, setPause }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [viewport, setViewport] = useState({} as Viewport);

  const { bikeParks, fetching } = useBikeParks(viewport, pause ?? false);
  useEffect(() => setFilteredLocations(bikeParks), [bikeParks]);

  const handleMarkerClick = (location: BikePark) => {
    setSelectedLocationId(location.id);
  };

  const setView = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(
        {
          lat: selectedLocation?.coordinates?.latitude,
          lng: selectedLocation?.coordinates?.longitude,
        },
        15,
        { animate: true, duration: 1.5 },
      );
    }
  };

  const fitBounds = (markers: LatLngExpression[]) => {
    const map = mapRef.current;
    if (map) {
      map.flyToBounds(latLngBounds(markers), {
        padding: [50, 50],
        animate: true,
        duration: 1.5,
      });
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setView();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (filteredLocations.length > 0 && filteredLocations.length < 10 && pause) {
      fitBounds(filteredLocations.map(({ coordinates }) => [coordinates?.latitude, coordinates?.longitude]) as LatLngExpression[]);
    }
  }, [filteredLocations, selectedLocation]);

  const MapEvents = () => {
    useMapEvents({
      moveend: (event) => {
        const map = event.target;
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        setViewport({
          northEast: { latitude: northEast.lat, longitude: northEast.lng },
          southWest: { latitude: southWest.lat, longitude: southWest.lng },
        });
        setPause(false);
      },
      zoomend: () => setPause(false),
    });
    return null;
  };

  return (
    <div className="relative w-full h-full">
      {fetching && <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-md shadow">Loading...</div>}
      <MapContainer
        ref={mapRef}
        center={[49.5, 10]} // Center of Germany
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateMapSize />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          polygonOptions={{
            fillColor: '#3388ff',
            color: '#3388ff',
            weight: 2,
            opacity: 0.5,
            fillOpacity: 0.2,
          }}
        >
          {filteredLocations.map((location: BikePark) => (
            <Marker
              key={location.id}
              position={[location?.coordinates?.latitude ?? 0, location?.coordinates?.longitude ?? 0]}
              icon={selectedLocation?.id === location.id ? selectedIcon : defaultIcon}
              eventHandlers={{ click: () => handleMarkerClick(location) }}
            >
              <Popup closeButton={false} closeOnEscapeKey={true} autoClose={true} autoPan={false}>
                <div key={location.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
                  <div className="flex gap-4">
                    {location.imageUrl ? (
                      <img src={location.imageUrl} className="w-20 h-20 rounded-lg object-cover" alt={location.name} />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="fa-solid fa-mountain text-gray-400 text-2x1"></i>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]">{location.name}</h3>
                        <span className="text-sm">
                          <i className="fa-solid fa-star text-yellow-400 text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]"></i>{' '}
                          {location.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{location.location}</p>
                      <div className="flex gap-2">
                        {location.features?.slice(0, 1)?.map((feature, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${
                              feature === 'Flow'
                                ? 'bg-emerald-100 text-emerald-600'
                                : feature === 'Skills'
                                ? 'bg-purple-100 text-purple-600'
                                : 'bg-orange-100 text-orange-600'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            location.difficulty === 'beginner'
                              ? 'bg-yellow-100 text-yellow-600'
                              : location.difficulty === 'intermediate'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {location.difficulty?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapEvents />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
