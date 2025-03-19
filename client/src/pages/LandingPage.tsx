import React from 'react';
import Hero from '../components/Sections/Hero/Hero';
import FeaturedParks from '../components/Sections/FeaturedParks/FeaturedParks';
import Community from '../components/Sections/Comunity/Community';
import Events from '../components/Sections/Events/Events';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedParks />
      <Community />
      <Events />
    </>
  );
};

export default LandingPage; 