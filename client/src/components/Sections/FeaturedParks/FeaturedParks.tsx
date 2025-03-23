import React from 'react';
import ParkCard, { ParkCardProps } from './ParkCard';
import { getRandomColor } from '../../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { GetBikeParksDocument } from '../../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';

const FeaturedParks: React.FC = () => {
  const navigate = useNavigate();

  const title = 'Popular Bike Parks';

  const handleViewDetails = (bikeParkId: string) => {
    navigate(`/bike-parks/${bikeParkId}`);
  };

  const [{ data }] = useQuery({
    query: GetBikeParksDocument,
    variables: {
      filter: {
        location: '',
        name: '',
        difficulty: '',
      },
      pagination: { page: 1, limit: 3 },
    },
  });

  const bikeParks = data?.bikeParks;

  const parks = bikeParks?.map((park: any) => ({
    id: park.id,
    image: park.imageUrl,
    rating: park.rating,
    name: park.name,
    location: park.location,
    tags: park.features?.map((feature: string) => ({
      label: feature,
      color: getRandomColor(),
    })),
    temperature: park.weather?.current?.temperature,
  }));

  return (
    <section className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parks?.map((park: ParkCardProps) => (
            <ParkCard key={park.id} {...park} onViewDetails={handleViewDetails} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedParks;
