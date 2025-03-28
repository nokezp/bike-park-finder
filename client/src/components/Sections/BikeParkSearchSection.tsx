import React, { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Difficulty, Feature } from '../Map/MapLeftMenu';
import { BikeParkFilter } from '../../lib/graphql/generated/graphql-operations';

const BikeParkSearchSection: React.FC<{ setSearchQuery: (searchQuery: BikeParkFilter) => void }> = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') ?? 'All');
  const [feature, setFeature] = useState('All');
  const [facilities, setFacilities] = useState<string[]>([]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery({
      location,
      difficulty,
      features: [feature],
      facilities,
    });
    if (location) {
      navigate(`/bike-parks?location=${location}${difficulty !== 'all' ? '&difficulty=' + difficulty : ''}`);
    } else {
      navigate(`/bike-parks${difficulty !== 'All' ? '?difficulty=' + difficulty : ''}`);
    }
  };

  return (
    <section id="search-section" className="bg-white shadow-lg relative z-10">
      <form onSubmit={handleSearch} className="container mx-auto px-4 py-6">
        <div className="flex flex-col">
          <div className="flex items-end justify-center gap-4">
            <div className='flex-1'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  value={location}
                  placeholder="Enter location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                    searchParams.set('location', e.target.value);
                    setSearchParams(searchParams);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-gray-800
                              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                              transition-all duration-200"
                />
              </div>
            </div>
            <div className='flex-1'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  searchParams.set('difficulty', e.target.value);
                  setSearchParams(searchParams);
                }}
                className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                            transition-all duration-200"
              >
                {Object.values(Difficulty).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex-1'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <select
                value={feature}
                onChange={(e) => {
                  setFeature(e.target.value);
                  searchParams.set('feature', e.target.value);
                  setSearchParams(searchParams);
                }}
                className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                            transition-all duration-200"
              >
                {Object.values(Feature).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='felx-1'>
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
          <div className="flex justify-center gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                facilities.indexOf('Lift') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                if (facilities.indexOf('Lift') > -1) {
                  facilities.splice(facilities.indexOf('Lift'), 1);
                } else {
                  facilities.push('Lift');
                }
                setFacilities(facilities);
              }}
            >
              <i className="fa-solid fa-cable-car mr-2"></i>
              Lift Access
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                facilities.indexOf('Bike Rental') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                if (facilities.indexOf('Bike Rental') > -1) {
                  facilities.splice(facilities.indexOf('Bike Rental'), 1);
                } else {
                  facilities.push('Bike Rental');
                }
                setFacilities(facilities);
              }}
            >
              <i className="fa-solid fa-bicycle mr-2"></i>Bike Rental
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                facilities.indexOf('Restaurant') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                if (facilities.indexOf('Restaurant') > -1) {
                  facilities.splice(facilities.indexOf('Restaurant'), 1);
                } else {
                  facilities.push('Restaurant');
                }
                setFacilities(facilities);
              }}
            >
              <i className="fa-solid fa-utensils mr-2"></i>Restaurant
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                facilities.indexOf('Bike School') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                if (facilities.indexOf('Bike School') > -1) {
                  facilities.splice(facilities.indexOf('Bike School'), 1);
                } else {
                  facilities.push('Bike School');
                }
                setFacilities(facilities);
              }}
            >
              <i className="fa-solid fa-school mr-2"></i>Bike School
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BikeParkSearchSection;
