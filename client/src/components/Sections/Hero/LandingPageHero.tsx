import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Difficulty } from '../../../pages/MapLeftMenu';

const LandingPageHero: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      navigate(`/bike-parks?location=${location}${difficulty !== 'all' ? '&difficulty=' + difficulty : ''}`);
    } else {
      navigate(`/bike-parks${difficulty !== 'all' ? '?difficulty=' + difficulty : ''}`);
    }
  };

  return (
    <section className="relative h-[400px] mb-12">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="src/assets/images/hero-image.png"
        alt="aerial view of mountain bike park"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Discover Your Next Adventure</h1>
          <p className="text-xl animate-fade-in-delay">Find the perfect trails for your riding style</p>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto px-4 animate-slide-up">
          <div className="bg-white rounded-lg p-4 shadow-lg">
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default LandingPageHero;
