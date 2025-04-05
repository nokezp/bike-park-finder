import React, { useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Map as LeafletMap, LeafletMouseEvent } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import { ViewportView } from '../../pages/Map/MapsPage';

// // Mapbox constants - replace with your actual values or environment variables
// const MAPBOX_API_KEY = 'pk.eyJ1Ijoibm9rZXpwbmV3IiwiYSI6ImNtOGQya3BnZzFiZnkya3M1bWEzMzVuYXkifQ.rOk1OezputSSawqlWIMycQ';
// const MAPBOX_LIGHT_STYLE_URL = 'mapbox://styles/mapbox/light-v10';

export interface Viewport extends InteractiveMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const geocoderDefaultOverrides = {
  transitionDuration: 1100,
  // transitionInterpolator: new FlyToInterpolator()
}

interface MapboxProps {
  viewport?: Viewport;
  onViewportChange?: (newViewport?: Viewport) => void;
  onViewportChangeView?: (newViewport: ViewportView) => void;
  height?: string;
  mapRef?: React.MutableRefObject<LeafletMap | null>;
  enableContextMenu?: boolean;
  showControls?: boolean;
  onClick?: (e: LeafletMouseEvent) => void;
  onDbClick?: (e: LeafletMouseEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLocationSelected?: (newViewport?: any) => void;
  children?: React.ReactNode;
}

const Mapbox: React.FC<MapboxProps> = ({
  viewport,
  onViewportChange = () => { },
  height = "100%",
  children,
  mapRef,
  onViewportChangeView,
  onClick,
  onDbClick = () => { }
}) => {
  const defaultMapRef = useRef<LeafletMap | null>(null);

  // Component to set the map reference and handle events
  const MapRefSetter = ({
    mapRef,
    defaultMapRef,
    onClick,
    onDbClick,
    onViewportChange,
    onViewportChangeView
  }: {
    mapRef?: React.MutableRefObject<LeafletMap | null>,
    defaultMapRef: React.MutableRefObject<LeafletMap | null>,
    onClick?: (e: LeafletMouseEvent) => void,
    onDbClick?: (e: LeafletMouseEvent) => void,
    onViewportChange?: (newViewport?: Viewport) => void
    onViewportChangeView?: (newViewport: ViewportView) => void
  }) => {
    const map = useMap();

    useEffect(() => {
      if (mapRef) {
        mapRef.current = map;
      } else {
        defaultMapRef.current = map;
      }
    }, [map, mapRef, defaultMapRef]);

    // Handle map events and viewport changes
    const mapEvents = useMapEvents({
      click: (e) => {
        if (onClick) {
          // Pass the Leaflet event directly
          onClick(e);
        }
      },
      dblclick: (e) => {
        if (onDbClick) {
          // Pass the Leaflet event directly
          onDbClick(e);
        }
      },
      moveend: () => {
        if (onViewportChange) {
          const center = mapEvents.getCenter();
          const zoom = mapEvents.getZoom();
          const bounds = mapEvents.getBounds();
          const northEast = bounds.getNorthEast();
          const southWest = bounds.getSouthWest();

          if (onViewportChangeView) {
            onViewportChangeView({
              northEast: { latitude: northEast.lat, longitude: northEast.lng },
              southWest: { latitude: southWest.lat, longitude: southWest.lng },
            });
          }

          onViewportChange({
            latitude: center.lat,
            longitude: center.lng,
            zoom: zoom
          } as Viewport);
        }
      }
    });

    return null;
  };

  return (
    <div style={{ width: "100%", height: height, transition: "height .2s linear" }}>
      <MapContainer
        center={[viewport?.latitude || 0, viewport?.longitude || 0]}
        zoom={viewport?.zoom || 6}
        style={{ width: "100%", height: "100%" }}
        className="w-full h-full z-10"
        whenReady={() => {
          // This is a good place to initialize the map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
          <MapRefSetter
            mapRef={mapRef}
            defaultMapRef={defaultMapRef}
            onClick={onClick}
            onDbClick={onDbClick}
            onViewportChange={onViewportChange}
            onViewportChangeView={onViewportChangeView}
          />
          {children}
        </MarkerClusterGroup>
      </MapContainer>
    </div >
  );
};

export default Mapbox;
