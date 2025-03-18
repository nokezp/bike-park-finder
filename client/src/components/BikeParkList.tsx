import React, { useEffect, useState } from 'react';
import { useGraphQL } from '../hooks/useGraphQL';
import { GET_BIKE_PARKS } from '../graphql/queries/bikeParks';
import '../styles/components/BikeParkList.scss';

interface BikePark {
  id: string;
  name: string;
  description: string;
  location: string;
  features: string[];
  difficulty: string;
}

export function BikeParkList() {
  const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { execute } = useGraphQL();

  useEffect(() => {
    const fetchBikeParks = async () => {
      try {
        const { data } = await execute<{ bikeParks: BikePark[] }>(`
          query GetBikeParks {
            bikeParks {
              id
              name
              description
              location
              features
              difficulty
            }
          }
        `);
        setBikeParks(data.bikeParks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bike parks');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeParks();
  }, [execute]);

  if (loading) {
    return <div className="loading">Loading bike parks...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="bike-parks">
      <h2 className="bike-parks__title">Bike Parks</h2>
      <div className="bike-parks__grid">
        {bikeParks.map((park) => (
          <div key={park.id} className="bike-park-card">
            <h3 className="bike-park-card__title">{park.name}</h3>
            <p className="bike-park-card__description">{park.description}</p>
            <div className="bike-park-card__location">
              <p>{park.location}</p>
            </div>
            <div className="bike-park-card__features">
              {park.features.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 