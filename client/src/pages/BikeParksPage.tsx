import React from 'react';
import BikeParkSearchSection from '../components/Sections/BikeParkSearchSection';
import ResultsGrid from '../components/Sections/ResultsGrid';

const BikeParksPage: React.FC = () => {
  return (
    <>
      <BikeParkSearchSection />
      <ResultsGrid />
    </>
  );
};

export default BikeParksPage;
