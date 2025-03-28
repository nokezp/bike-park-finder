import React, { useState } from 'react';
import BikeParkSearchSection from '../../components/Sections/BikeParkSearchSection';
import ResultsGrid from '../../components/Sections/ResultsGrid';
import { BikeParkFilter } from '../../lib/graphql/generated/graphql-operations';
import { useSearchParams } from 'react-router-dom';

const BikeParksPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [location] = useState(searchParams.get('location') ?? '');
  const [difficulty] = useState(searchParams.get('difficulty') ?? 'All');

  const [searchQuery, setSearchQuery] = useState<BikeParkFilter>({
    location,
    difficulty,
  });

  return (
    <>
      <BikeParkSearchSection setSearchQuery={setSearchQuery} />
      <ResultsGrid searchQuery={searchQuery} />
    </>
  );
};

export default BikeParksPage;
