import React, { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Difficulty } from '../../lib/graphql/generated/graphql-operations';

const BikeParkSearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') ?? 'all');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (location) {
      navigate(`/bike-parks?location=${location}${difficulty !== 'all' ? '&difficulty=' + difficulty : ''}`);
    } else {
      navigate(`/bike-parks${difficulty !== 'all' ? '?difficulty=' + difficulty : ''}`);
    }
  };

  console.log('difficulty: ', difficulty);
  console.log('Object.keys(Difficulty): ', Object.keys(Difficulty));

  return (
    <section id="search-section" className="bg-white shadow-lg relative z-10">
      <form onSubmit={handleSearch} className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                            transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex-1">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800
                          focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                          transition-all duration-200"
            >
              <option value="all">All</option>
              {Object.keys(Difficulty).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800">
              <option>All Features</option>
              <option>Flow Trails</option>
              <option>Jump Lines</option>
              <option>Technical</option>
              <option>Lift Access</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-md 
                        hover:bg-emerald-700 transform hover:scale-105
                        transition-all duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default BikeParkSearchSection;
