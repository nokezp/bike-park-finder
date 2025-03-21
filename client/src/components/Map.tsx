import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoibm9rZXpwbmV3IiwiYSI6ImNtOGQya3BnZzFiZnkya3M1bWEzMzVuYXkifQ.rOk1OezputSSawqlWIMycQ';

interface MapProps {
    center?: [number, number];
    zoom?: number;
    markers?: Array<{
        coordinates: [number, number];
        title?: string;
        description?: string;
    }>;
    className?: string;
}

// Default center: somewhere in Colorado (bike park friendly area)
const DEFAULT_CENTER: [number, number] = [-105.2705, 39.8617];

function Map({ center = DEFAULT_CENTER, zoom = 13, markers = [], className = '' }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
  
    useEffect(() => {
      if (!mapContainer.current) return;
  
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center,
        zoom,
      });
  
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
      // Cleanup
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    }, [center, zoom]);
  
    useEffect(() => {
      if (!map.current) return;
  
      // Remove existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
  
      // Add new markers
      markers.forEach(({ coordinates, title, description }) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(map.current!);
  
        if (title || description) {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `
              ${title ? `<h3>${title}</h3>` : ''}
              ${description ? `<p>${description}</p>` : ''}
            `
          );
          marker.setPopup(popup);
        }
  
        markersRef.current.push(marker);
      });
    }, [markers]);
  
    return (
      <div
        ref={mapContainer}
        className={`w-full h-[100%] rounded-lg overflow-hidden ${className}`}
      />
    );
}

export default Map;