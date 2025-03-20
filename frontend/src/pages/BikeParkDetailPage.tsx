import React from 'react';
import { useParams } from 'react-router-dom';
import { useBikePark } from '../hooks/useBikeParks';
import { Map } from '../components/Map';

export function BikeParkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { bikePark, loading, error } = useBikePark(id || '');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!bikePark) return <div>Bike park not found</div>;

  // Example coordinates (replace with actual coordinates from your bike park data)
  const coordinates: [number, number] = [8.5, 51.2]; // Example coordinates for Winterberg

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{bikePark.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="space-y-4">
            <p><strong>Location:</strong> {bikePark.location}</p>
            <p><strong>Difficulty:</strong> {bikePark.difficulty}</p>
            <p><strong>Status:</strong> {bikePark.status}</p>
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside">
              {bikePark.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <Map
            center={coordinates}
            zoom={13}
            markers={[
              {
                coordinates,
                title: bikePark.name,
                description: bikePark.location
              }
            ]}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">{bikePark.description}</p>
      </div>
    </div>
  );
} 