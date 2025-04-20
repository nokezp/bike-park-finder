/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import BikeParkSearchSection from '../../components/Sections/BikeParkSearchSection';
import ResultsGrid from '../../components/Sections/ResultsGrid';
import { BikeParkFilter } from '../../lib/graphql/generated/graphql-operations';
import { useSearchParams } from 'react-router-dom';

const BikeParksPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [location] = useState(searchParams.get('location') ?? '');
  const [difficulty] = useState(searchParams.get('difficulty') ?? 'all');

  const [searchQuery, setSearchQuery] = useState<BikeParkFilter>({
    location,
    difficulty,
    sortBy: "rating",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchQuery({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
    );
  }, []);

  return (
    <>
      <BikeParkSearchSection setSearchQuery={setSearchQuery} />
      <ResultsGrid searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </>
  );
};

export default BikeParksPage;
