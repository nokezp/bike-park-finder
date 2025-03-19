import React from 'react';
import ParkCard, { ParkCardProps } from './ParkCard';
import { useQuery } from 'urql';
import { GET_BIKE_PARKS } from '../../../queries/bikeParks';
import { BikePark } from '../../../types/graphql';

const FeaturedParks: React.FC = () => {
  const title = "Popular Bike Parks"
  // const parks = mockParks;

  const handleViewDetails = (parkId: string) => {
    console.log('Viewing details for park:', parkId);
    // Add view details logic here
  };

  const [{ data }] = useQuery({
    query: GET_BIKE_PARKS
  });

  console.log(data);
  const parks = data?.bikeParks?.map((park: BikePark) => ({
    id: park.id,
    image: park.imageUrl,
    rating: park.rating,
    name: park.name,
    location: park.location,
    tags: park.features,
    temperature: park.weather?.current?.temperature,
  }))?.slice(0, 3);

  return (
    <section className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parks?.map((park: ParkCardProps) => (
            <ParkCard
              key={park.id}
              {...park}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Example data for parks
export const mockParks: Omit<ParkCardProps, 'onViewDetails'>[] = [
  {
    id: 'whistler',
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png",
    rating: 4.8,
    name: "Whistler Mountain Bike Park",
    location: "Whistler, BC, Canada",
    tags: [
      { label: "Flow Trails", color: "emerald" },
      { label: "Expert Jumps", color: "red" },
      { label: "Lift Access", color: "green" }
    ],
    temperature: 22,
    weatherIcon: "cloud-sun"
  },
  {
    id: 'highland',
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png",
    rating: 4.6,
    name: "Highland Mountain Bike Park",
    location: "New Hampshire, USA",
    tags: [
      { label: "Beginner Friendly", color: "yellow" },
      { label: "Skills Park", color: "purple" },
      { label: "Lift Access", color: "green" }
    ],
    temperature: 18,
    weatherIcon: "cloud"
  },
  {
    id: 'queenstown',
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2860b1595-c4f8b3e9911301d405cb.png",
    rating: 4.7,
    name: "Queenstown Bike Park",
    location: "Queenstown, New Zealand",
    tags: [
      { label: "Flow Trails", color: "blue" },
      { label: "Technical", color: "orange" },
      { label: "Gondola", color: "green" }
    ],
    temperature: 20,
    weatherIcon: "sun"
  }
];

export default FeaturedParks; 