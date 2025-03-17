'use client';

import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="bg-primary text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Find Your Perfect Bike Park</h1>
        <p className="text-xl mb-8">Discover amazing bike parks around the world</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for bike parks..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              data-testid="search-input"
            />
            <button
              type="submit"
              className="bg-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
              data-testid="search-button"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 