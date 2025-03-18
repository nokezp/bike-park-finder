'use client';

import Link from 'next/link';
import { useQuery } from 'urql';
import { GET_PARKS } from '@/lib/queries';
import { ParksQuery } from '@/types/graphql';

export default function FeaturedParks() {
  const [{ data, fetching, error }] = useQuery<ParksQuery>({
    query: GET_PARKS,
  });

  if (fetching) return <div className="font-body">Loading...</div>;
  if (error) return <div className="font-body text-accent">Error: {error.message}</div>;

  const featuredParks = data?.parks.slice(0, 3) || [];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Featured Parks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredParks.map((park) => (
            <div key={park._id} className="card">
              <h3 className="text-xl font-display font-semibold mb-2">{park.name}</h3>
              <p className="text-secondary mb-4 font-body">{park.description}</p>
              <div className="text-sm text-secondary font-body">
                <p>Location: {park.location}</p>
                <p>Difficulty: <span className="text-accent">{park.difficulty}</span></p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/parks"
            className="btn-primary"
            data-testid="view-all-parks"
          >
            View All Parks
          </Link>
        </div>
      </div>
    </section>
  );
} 