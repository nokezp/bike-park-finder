'use client';

import Hero from '@/components/home/Hero';
import FeaturedParks from '@/components/home/FeaturedParks';
import HowItWorks from '@/components/home/HowItWorks';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedParks />
      <HowItWorks />
    </main>
  );
}
