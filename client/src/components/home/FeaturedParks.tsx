'use client';

import Link from 'next/link';
import { useQuery } from 'urql';
import { GET_PARKS } from '@/lib/queries';
import { ParksQuery } from '@/types/graphql';

export default function FeaturedParks() {
  const [{ data, fetching, error }] = useQuery<ParksQuery>({
    query: GET_PARKS,
  });

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const featuredParks = data?.parks.slice(0, 3) || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Parks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredParks.map((park) => (
            <div key={park._id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{park.name}</h3>
              <p className="text-gray-600 mb-4">{park.description}</p>
              <div className="text-sm text-gray-500">
                <p>Location: {park.location}</p>
                <p>Difficulty: {park.difficulty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/parks"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            data-testid="view-all-parks"
          >
            View All Parks
          </Link>
        </div>
      </div>
    </section>
  );
} 