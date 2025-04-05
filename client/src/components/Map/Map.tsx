/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { BikePark, Coordinates } from "../../lib/graphql/generated/graphql-operations";
import { Icon, Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { geocoderDefaultOverrides, Viewport } from "./Mapbox";
import Mapbox from "./Mapbox";
import { ViewportView } from "../../pages/Map/MapsPage";
import FallbackImage from "../common/FallbackImage";
import { useNavigate } from "react-router-dom";
import './Map.scss';

export const DEFAULT_ZOOM = 10;

type Coordinate = {
  latitude: number;
  longitude: number;
};

// Simple marker icon without image imports
export const defaultMapIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const selectedIcon = new Icon({
  iconUrl: 'https://www.wanderfinder.com/wp-content/uploads/leaflet-maps-marker-icons/bicycle_shop.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [1, -34],
  shadowSize: [37, 37],
});

export type PointInput = {
  lat: number,
  lon: number
}

const Map: React.FC<{
  selectedLocation?: BikePark;
  filteredLocations: BikePark[];
  setSelectedLocationId?: (id: string) => void;
  setFilteredLocations: (bikeparks: BikePark[]) => void;
  onViewportChangeView: (viewport: ViewportView) => void;
}> = ({
  selectedLocation,
  filteredLocations,
  setSelectedLocationId,
  onViewportChangeView
}) => {
    const navigate = useNavigate();
    const mapRef = useRef<LeafletMap | null>(null);
    const bikeparkId = selectedLocation?.id;
    const [viewport, setViewport] = useState<Viewport>({
      latitude: selectedLocation?.coordinates?.latitude ?? 0,
      longitude: selectedLocation?.coordinates?.longitude ?? 0,
      zoom: DEFAULT_ZOOM,
      ...geocoderDefaultOverrides
    } as Viewport);

    const updateViewport = (newViewport?: Viewport) => {
      if (newViewport) {
        setViewport({ ...geocoderDefaultOverrides, ...newViewport });
      }
    }

    useEffect(() => {
      if (filteredLocations?.length && mapRef?.current) {
        const map = mapRef.current;
        let bikepark = selectedLocation;
        if (bikeparkId) {
          bikepark = filteredLocations?.find(({ id }) => id === bikeparkId);
        }

        if (bikepark && map) {
          const currentZoom = 10; // map.getZoom() || DEFAULT_ZOOM;
          updateViewport({
            latitude: bikepark.coordinates?.latitude ?? 0,
            longitude: bikepark.coordinates?.longitude ?? 0,
            zoom: currentZoom >= DEFAULT_ZOOM ? DEFAULT_ZOOM + 1 : DEFAULT_ZOOM
          });

          map.flyTo(
            {
              lat: bikepark.coordinates?.latitude ?? 0,
              lng: bikepark.coordinates?.longitude ?? 0,
            },
            currentZoom >= DEFAULT_ZOOM ? 10 : DEFAULT_ZOOM, // DEFAULT_ZOOM + 1 : DEFAULT_ZOOM,
            { animate: true, duration: 1.5 }
          );
        } else {
          // eslint-disable-next-line no-undef
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation: Coordinate = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };

              const locationList: Coordinate[] = filteredLocations?.map(({ coordinates }) => ({
                latitude: coordinates?.latitude ?? 0,
                longitude: coordinates?.longitude ?? 0
              }));

              const closestLocation = findClosestLocation(userLocation, locationList);

              updateViewport({
                latitude: closestLocation?.latitude ?? userLocation.latitude,
                longitude: closestLocation?.longitude ?? userLocation.longitude,
                zoom: DEFAULT_ZOOM
              });
              map.flyTo(
                {
                  lat: closestLocation?.latitude ?? userLocation.latitude,
                  lng: closestLocation?.longitude ?? userLocation.longitude,
                },
                DEFAULT_ZOOM,
                { animate: true, duration: 1.5 }
              );
            },
            (error) => {
              // eslint-disable-next-line no-undef
              console.error("Error getting user location:", error);
            }
          );
        }
      }
    }, [filteredLocations, mapRef, bikeparkId, selectedLocation]);

    // Updated to use Leaflet event types
    const handleClick = (e: LeafletMouseEvent) => {
      if (e && e.latlng) {
        updateViewport({
          latitude: e.latlng.lat ?? 0,
          longitude: e.latlng.lng ?? 0,
          zoom: DEFAULT_ZOOM + 1
        });
      }
    }

    function onChooseLocation(location: BikePark) {
      if (setSelectedLocationId) {
        setSelectedLocationId(location.id);
      }

      if (viewport) {
        updateViewport({
          ...viewport,
          latitude: location.coordinates?.latitude ?? 0,
          longitude: location.coordinates?.longitude ?? 0,
          zoom: DEFAULT_ZOOM + 1
        });
      }
    }

    const handleViewDetails = (id: string) => {
      navigate(`/bike-parks/${id}`);
    };

    return <div style={{ position: "relative", width: "100%" }}>
      <Mapbox
        mapRef={mapRef}
        showControls={true}
        viewport={viewport}
        onViewportChange={updateViewport}
        onViewportChangeView={onViewportChangeView}
        onClick={handleClick}
        height="calc(100vh - 150px)"
      >
        {filteredLocations.map((location: BikePark) => (
          <Marker
            key={location.id}
            position={[location?.coordinates?.latitude ?? 0, location?.coordinates?.longitude ?? 0]}
            icon={selectedLocation?.id === location.id ? selectedIcon : defaultMapIcon}
            eventHandlers={{ click: () => onChooseLocation(location) }}
          >
            <Popup closeButton={false} closeOnEscapeKey={true} autoClose={true} autoPan={false}>
              <div key={location.id} className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer w-[320px]">
                <div className="flex">
                  <div className='flex-[30%]'>
                    <FallbackImage
                      src={location.imageUrl || "https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png"}
                      alt={location.name || "Bike Park"}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-[70%] m-2">
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
                          className={`px-2 py-1 rounded-full text-xs ${feature === 'Flow'
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
                        className={`px-2 py-1 rounded-full text-xs ${location.difficulty === 'beginner'
                          ? 'bg-yellow-100 text-yellow-600'
                          : location.difficulty === 'intermediate'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-red-100 text-red-600'
                          }`}
                      >
                        {location.difficulty?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => handleViewDetails(location.id)} className="text-emerald-500 hover:text-emerald-700">
                        <i className="fa-solid fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </Mapbox>
    </div>
  }

export default Map;

function getDistance(coord1: Coordinate, coord2: Coordinate): number {

  const toRad = (val: number) => (val * Math.PI) / 180;

  const R = 6371; // Earth radius in km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
    Math.cos(toRad(coord2.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findClosestLocation(userLocation: Coordinate, locations: Coordinate[]): Coordinate | null {
  let minDistance = Infinity;
  let closestLocation: Coordinate | null = null;

  for (const location of locations) {
    const distance = getDistance(userLocation, location);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  }

  return closestLocation;
}

export function getFilterLocationsPoints(coordinates: Coordinates | null | undefined, sw: Coordinates, ne: Coordinates) {
  if (coordinates) {
    sw = sw || ({} as PointInput);
    ne = ne || ({} as PointInput);
    if (!sw.longitude || coordinates.longitude > sw.longitude) {
      sw.longitude = coordinates.longitude;
    }
    if (!ne.longitude || coordinates.longitude < ne.longitude) {
      ne.longitude = coordinates.longitude;
    }
    if (!sw.latitude || coordinates.latitude < sw.latitude) {
      sw.latitude = coordinates.latitude;
    }
    if (!ne.latitude || coordinates.latitude > ne.latitude) {
      ne.latitude = coordinates.latitude;
    }
  }
  return { sw, ne };
}
