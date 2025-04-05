import React, { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BikeParkFilter, MostCommonFeaturesDocument, MostCommonFeaturesQuery } from '../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';
import { Difficulty } from '../Map/LeftMenu';

const BikeParkSearchSection: React.FC<{ setSearchQuery: (searchQuery: BikeParkFilter) => void }> = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') ?? 'all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [loadAll, setLoadAll] = useState<boolean>(false);

  const [{ data }] = useQuery<MostCommonFeaturesQuery>({
    query: MostCommonFeaturesDocument,
    ...(!loadAll ? { variables: { limit: 5 } } : {}),
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery({
      location,
      difficulty: difficulty?.toLowerCase(),
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      facilities,
    });
    if (location) {
      navigate(`/bike-parks?location=${location}${difficulty !== 'all' ? '&difficulty=' + difficulty : ''}`);
    } else {
      navigate(`/bike-parks${difficulty !== 'all' ? '?difficulty=' + difficulty : ''}`);
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
              <div className="relative">
                <div
                  className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                            transition-all duration-200 cursor-pointer flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex flex-wrap gap-1">
                    {selectedFeatures.length === 0 ? (
                      <span className="text-gray-500">Select features...</span>
                    ) : (
                      selectedFeatures.map(feature => (
                        <span
                          key={feature}
                          className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs flex items-center"
                        >
                          {feature}
                          <button
                            className="ml-1 text-emerald-600 hover:text-emerald-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                  <svg className="fill-current h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    <div className="p-2">
                      <div className="flex items-center mb-2">
                        <button
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            setSelectedFeatures([]);
                            setIsDropdownOpen(false);
                          }}
                        >
                          Clear all
                        </button>
                      </div>

                      {data?.mostCommonFeatures?.map((option) => (
                        <div key={option} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                          <input
                            type="checkbox"
                            id={`feature-${option}`}
                            checked={selectedFeatures.includes(option)}
                            onChange={() => {
                              if (selectedFeatures.includes(option)) {
                                setSelectedFeatures(selectedFeatures.filter(f => f !== option));
                              } else {
                                setSelectedFeatures([...selectedFeatures, option]);
                              }
                            }}
                            className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`feature-${option}`} className="text-sm cursor-pointer flex-1">
                            {option}
                          </label>
                        </div>
                      ))}

                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <button
                          className="w-full text-center px-3 py-2 text-sm bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded font-medium"
                          onClick={() => {
                            setLoadAll(true);
                          }}
                        >
                          Load all features
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
              className={`px-4 py-2 rounded-full text-sm ${facilities.indexOf('Lift') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
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
              className={`px-4 py-2 rounded-full text-sm ${facilities.indexOf('Bike Rental') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
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
              className={`px-4 py-2 rounded-full text-sm ${facilities.indexOf('Restaurant') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
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
              className={`px-4 py-2 rounded-full text-sm ${facilities.indexOf('Bike School') > -1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' : 'bg-gray-100 hover:bg-gray-200'
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
