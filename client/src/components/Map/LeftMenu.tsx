/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { BikePark, BikeParkFilter, BikeParksDocument, BikeParksQuery } from '../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';
import FallbackImage from '../common/FallbackImage';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';

export enum Difficulty {
  ALL = 'All',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
}

const ITEMS_PER_PAGE = 150;

const LeftMenu: React.FC<{
  setFilteredLocationId?: (locations: BikePark[]) => void;
  setSelectedLocationId?: (id: string) => void;
  selectedLocationId?: string;
}> = ({ setFilteredLocationId, setSelectedLocationId, selectedLocationId }) => {
  const navigate = useNavigate();

  const setRef = useCallback(
    (node: any) => {
      if (node && selectedLocationId === node.dataset.index) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        node.focus();
      }
    },
    [selectedLocationId],
  );

  const selectedMachineId = "";
  const [filteredLocations, setFilteredLocations] = useState<any[]>();

  const [filter, setFilter] = useState<BikeParkFilter>({
    location: '',
    coordinates: null,
    difficulty: 'all',
  });

  const [tempFilter, setTempFilter] = useState<BikeParkFilter>({
    location: '',
    coordinates: null,
    difficulty: 'all',
  });

  const [{ data, fetching, stale }] = useQuery<BikeParksQuery>({
    query: BikeParksDocument,
    variables: {
      filter: {
        ...filter,
        skip: 0,
        take: ITEMS_PER_PAGE,
      },
    },
    requestPolicy: "cache-and-network"
    // pause: !filter.location
  });


  useEffect(() => {
    if (data?.bikeParks?.bikeParks) {
      const bp: any[] = data.bikeParks.bikeParks
      setFilteredLocations(bp);
    }
  }, [data?.bikeParks?.bikeParks])

  useEffect(() => {
    if (filteredLocations && filteredLocations.length && setFilteredLocationId) {
      setFilteredLocationId(filteredLocations);
      const selectedLocation = filteredLocations.find(({ selected }) => selected);
      if (selectedLocation && setSelectedLocationId) {
        setSelectedLocationId(selectedLocation.id);
      }
    }
  }, [filteredLocations, setFilteredLocationId, setSelectedLocationId]);

  // Execute search function
  const executeSearch = async () => {
    setFilteredLocations([]);
    // setSelectedLocationId(undefined);
    setFilter(tempFilter);
    // setPause(true);
  };

  // Keydown handler for search input to support Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/bike-parks/${id}`);
  };

  return (
    <div>
      <div className="p-6 w-[420px]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <i className={`fa-solid fa-location-dot absolute left-3 top-3 ${fetching ? 'text-primary' : 'text-gray-400'}`}></i>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                value={tempFilter.location || ''}
                onChange={(e) =>
                  setTempFilter({
                    ...tempFilter,
                    location: e.target.value,
                  })
                }
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200"
              value={tempFilter.difficulty || ''}
              onChange={(e) => setTempFilter((prev) => ({ ...prev, difficulty: e.target.value?.toLowerCase() }))}
            >
              {Object.values(Difficulty).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={executeSearch}
            disabled={fetching}
            type="submit"
            className="w-full bg-emerald-600 text-white px-6 py-2 rounded-md
										hover:bg-emerald-700 transform hover:scale-105
										transition-all duration-200 focus:outline-none
										focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {fetching ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <i className="fa-solid fa-search mr-2"></i>
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="p-6 pt-0 space-y-4 w-[420px]">
        {filteredLocations && filteredLocations.length ? (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{filteredLocations.length} Parks Found</h2>
          </div>
        ) : (
          !fetching && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Can&apos;t find any bike park for selected location.</h2>
            </div>)
        )}

        {/* Compact Park Cards */}
        <div
          id="compact-results"
          className="space-y-3 max-h-[593px] overflow-auto rounded-lg"
          style={{ height: "calc(100vh - 440px)" }}>
          {filteredLocations?.map((park: BikePark) => (
            <div
              key={park.id}
              data-index={park.id}
              ref={setRef}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer border-[1px] border-solid ${park.id === selectedLocationId ? 'border-green-600' : ''
                }`}
              onClick={() => setSelectedLocationId && setSelectedLocationId(park.id)}
            >
              <div className="flex">
                <div className='flex-[30%]'>
                  <FallbackImage
                    src={park.imageUrl ?? ""}
                    alt={park.name || "Bike Park"}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-[70%] m-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]">{park.name}</h3>
                    <span className="text-sm">
                      <i className="fa-solid fa-star text-yellow-400 text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]"></i>{' '}
                      {park.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{park.location}</p>
                  <div className="flex gap-2">
                    {park.features?.slice(0, 1)?.map((feature, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${feature === 'Flow'
                          ? 'bg-emerald-100 text-emerald-600'
                          : feature === 'Skills'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-orange-100 text-orange-600'
                          }`}
                      >
                        {feature}
                      </span>
                    ))}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${park.difficulty === 'beginner'
                        ? 'bg-yellow-100 text-yellow-600'
                        : park.difficulty === 'intermediate'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {capitalize(park.difficulty ?? "")}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => handleViewDetails(park.id)} className="text-emerald-500 hover:text-emerald-700">
                      <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default LeftMenu;
