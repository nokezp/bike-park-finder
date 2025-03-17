'use client';

import { useQuery } from 'urql';
import { GET_PARKS } from '@/lib/queries';
import { ParksQuery } from '@/types/graphql';

export default function ParksPage() {
  const [{ data, fetching, error }] = useQuery<ParksQuery>({
    query: GET_PARKS,
  });

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bike Parks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.parks.map((park) => (
          <div key={park.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{park.name}</h2>
            <p className="text-gray-600 mb-4">{park.description}</p>
            <div className="text-sm text-gray-500">
              <p>Location: {park.location}</p>
              <p>Difficulty: {park.difficulty}</p>
              <p>Features: {park.features.join(', ')}</p>
              <p>Amenities: {park.amenities.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 