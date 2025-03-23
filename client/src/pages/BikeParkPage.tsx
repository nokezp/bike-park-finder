import React from 'react';
import SearchSection from '../components/Sections/SearchSection';
import ResultsGrid from '../components/Sections/ResultsGrid';

const BikeParkPage: React.FC = () => {
  return (
    <>
      <SearchSection />
      <ResultsGrid />
    </>
  );
}; 

export default BikeParkPage; 
