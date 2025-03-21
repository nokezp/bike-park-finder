import React, { useEffect, useMemo, useState } from 'react';
import Map from '../components/Map';
import { geocodeLocation, isWithinRadius, calculateDistance } from '../utils/location';
import debounce from 'lodash/debounce';
import { BikePark, BikeParkFilter, Coordinates, GetBikeParksDocument } from '../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';

const SEARCH_RADIUS_KM = 100;
const PARKS_PER_PAGE = 10;

export enum Difficulty {
  ALL = 'All Levels',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert'
}

export enum Feature {
  ALL = 'All Features',
  FLOW = 'Flow Trails',
  JUMP = 'Jump Lines',
  TECHNICAL = 'Technical',
  SKILLS = 'Skills'
}

export enum Amenity {
  LIFT = 'Lift Access',
  RENTAL = 'Rental',
  FOOD = 'Food'
}

export enum SortOption {
  RATING = 'Rating',
  DISTANCE = 'Distance'
}

export interface MapMarker {
  coordinates: [number, number];
  title: string;
  description: string;
}

export function MapsPage() {
  const [filters, setFilters] = useState<BikeParkFilter>({
    difficulty: "All",
    coordinates: null,
    features: [],
    location: '',
    sortBy: SortOption.RATING
  });
  const [tempFilters, setTempFilters] = useState({
    difficulty: "All",
    coordinates: null,
    features: [],
    location: '',
    sortBy: SortOption.RATING
  });
  const [searchCenter, setSearchCenter] = useState<Coordinates | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);

  // Transform frontend filters to API format
  const apiFilters = useMemo<BikeParkFilter>(() => {
    const apiFilter: any = {
      difficulty: filters.difficulty,
      coordinates: searchCenter,
      ...(filters.features?.length ? { features: filters.features } : {}),
      amenities: filters.amenities,
      location: filters.location
    };
    
    // Add coordinates if we have a search center
    if (searchCenter) {
      apiFilter.coordinates = {
        latitude: searchCenter.latitude,
        longitude: searchCenter.longitude,
        radius: SEARCH_RADIUS_KM
      };
      apiFilter.location = "";
    }
    
    // Map frontend sort options to API sort options
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case SortOption.RATING:
          apiFilter.sortBy = 'Rating';
          break;
        case SortOption.DISTANCE:
          apiFilter.sortBy = 'Distance';
          break;
        default:
          apiFilter.sortBy = 'Rating';
      }
    }
    
    return apiFilter;
  }, [filters, searchCenter]);

  const [{ data, fetching }] = useQuery({
    query: GetBikeParksDocument,
    variables: { filter: apiFilters, pagination: { page, limit: PARKS_PER_PAGE } },
    pause: !apiFilters.location && !apiFilters.coordinates
  });

  const bikeParks = data?.bikeParks?.bikeParks || [];
  const [filteredParks, setFilteredParks] = React.useState<BikePark[]>(bikeParks);
  const totalCount = data?.bikeParks?.totalCount || 0;
  const currentPage= data?.bikeParks?.currentPage || 1;
  const totalPages = data?.bikeParks?.totalPages || 1;
  const hasNextPage= data?.bikeParks?.hasNextPage || false;
  const isLoadingParks = fetching;

  // Debounced geocoding function
  const debouncedGeocode = useMemo(
    () =>
      debounce(async (location: string) => {
        if (!location) {
          setSearchCenter(null);
          return;
        }
        setIsSearching(true);
        const coordinates = await geocodeLocation(location);
        setSearchCenter(coordinates);
        setIsSearching(false);
      }, 500),
    []
  );

  // Update location search
  useEffect(() => {
    debouncedGeocode(filters.location || "");
    return () => {
      debouncedGeocode.cancel();
    };
  }, [filters.location, debouncedGeocode]);

  // Filter and sort parks based on all criteria
  useEffect(() => {
    let filtered = [...bikeParks];

    // Filter by location if search center is set
    if (searchCenter) {
      filtered = filtered.filter((park) =>
        isWithinRadius(
          searchCenter.latitude,
          searchCenter.longitude,
          park.coordinates[1],
          park.coordinates[0],
          SEARCH_RADIUS_KM
        )
      );
    }
  
  
   // Filter by difficulty
   if (filters.difficulty && filters.difficulty !== Difficulty.ALL) {
    filtered = filtered.filter((park) => park.difficulty === filters.difficulty);
  }

  // Filter by features
  if (filters.features?.length && !filters.features.includes(Feature.ALL)) {
    filtered = filtered.filter((park) =>
      filters.features?.some((feature) => park.features.includes(feature))
    );
  }

  // Filter by amenities
  if (filters.amenities?.length) {
    filtered = filtered.filter((park) =>
      filters.amenities?.every((amenity) => park.amenities?.includes(amenity))
    );
  }

  // Sort parks
  if (filters.sortBy === SortOption.RATING) {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (filters.sortBy === SortOption.DISTANCE && searchCenter) {
    filtered.sort((a, b) => {
      const distanceA = calculateDistance(
        searchCenter.latitude,
        searchCenter.longitude,
        a.coordinates[1],
        a.coordinates[0]
      );
      const distanceB = calculateDistance(
        searchCenter.latitude,
        searchCenter.longitude,
        b.coordinates[1],
        b.coordinates[0]
      );
      return distanceA - distanceB;
    });
  }

  setFilteredParks(filtered);
}, [filters, searchCenter]);

console.log('filteredParks: ', filteredParks);

  // Execute search function
  const executeSearch = async () => {
    setIsSearching(true);
    setFilters(tempFilters);
    
    if (tempFilters.location) {
      const coordinates = await geocodeLocation(tempFilters.location);
      setSearchCenter(coordinates);
    } else {
      setSearchCenter(null);
    }
    
    // Reset to first page when search changes
    setPage(1);
    setIsSearching(false);
  };

  // Create map markers from bike parks
  const markers: any[] = bikeParks.map((park: any) => ({
    coordinates: [
      parseFloat(park.coordinates.longitude as string), 
      parseFloat(park.coordinates.latitude as string)
    ] as [number, number], 
    title: park.name,
    description: park.location
  }));

  const handleTempFilterChange = (key: keyof BikeParkFilter, value: any) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  // Keydown handler for search input to support Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };
  
  // Load more parks
  const loadMoreParks = React.useCallback(() => {
    if (hasNextPage && !isLoadingParks) {
      setPage(prev => prev + 1);
    }
  }, [hasNextPage, isLoadingParks]);

  function getZoomLevel(radiusKm: number) {
    const C = 591657550.5; // Earth's circumference in meters divided by 2^20
    const radiusMeters = radiusKm * 1000;
    const zoom = Math.log2(C / radiusMeters) - 8;
    return zoom;
  }

  const zoomLevel = getZoomLevel(SEARCH_RADIUS_KM);
  console.log(`Zoom level for ${SEARCH_RADIUS_KM} km radius: ${zoomLevel}`);

  return (
    <section id="search-map-section" className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (within {SEARCH_RADIUS_KM}km)
                  </label>
                <div className="relative">
                  <i className={`fa-solid fa-location-dot absolute left-3 top-3 ${
                      isSearching ? 'text-primary' : 'text-gray-400'
                    }`}></i>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                    value={tempFilters.location}
                    onChange={(e) => handleTempFilterChange('location', e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-200"
                  value={tempFilters.difficulty}
                  onChange={(e) => handleTempFilterChange('difficulty', e.target.value as Difficulty)}
                >
                  {Object.values(Difficulty).map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-200"
                  value={tempFilters.features?.[0] || Feature.ALL}
                  onChange={(e) => handleTempFilterChange('features', [e.target.value as Feature])}
                >
                  {Object.values(Feature).map(feature => (
                    <option key={feature} value={feature}>{feature}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-200"
                  value={tempFilters.sortBy}
                  onChange={(e) => handleTempFilterChange('sortBy', e.target.value as SortOption)}
                >
                  {Object.values(SortOption).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Search Button */}
              <button 
                onClick={executeSearch}
                disabled={isSearching}
                type="submit"
                className="w-full bg-emerald-600 text-white px-6 py-2 rounded-md 
                        hover:bg-emerald-700 transform hover:scale-105
                        transition-all duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{bikeParks.length} Parks Found</h2>
              <select
                className="px-3 py-1 text-sm rounded-md border border-gray-200"
                // value={sortBy}
                // onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Rating</option>
                <option>Distance</option>
              </select>
            </div>

            {/* Compact Park Cards */}
            <div id="compact-results" className="space-y-3 max-h-[400px] overflow-auto rounded-lg shadow-lg">
              {bikeParks.map((park: BikePark) => (
                <div key={park.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
                  <div className="flex gap-4">
                    {park.imageUrl ? (
                      <img src={park.imageUrl} className="w-20 h-20 rounded-lg object-cover" alt={park.name} />
                    ) : (
                      <div className='w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center'>
                        <i className='fa-solid fa-mountain text-gray-400 text-2x1'></i>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold">{park.name}</h3>
                        <span className="text-sm">
                          <i className="fa-solid fa-star text-yellow-400"></i> {park.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{park.location}</p>
                      <div className="flex gap-2">
                        {park.features?.slice(0, 1)?.map((feature, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${
                              feature === 'Flow'
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
                          className={`px-2 py-1 rounded-full text-xs ${
                            park.difficulty === 'Beginner'
                              ? 'bg-yellow-100 text-yellow-600'
                              : park.difficulty === 'Intermediate'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {park.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          {/* Load more button */}
          {hasNextPage && (
            <button 
              onClick={loadMoreParks}
              disabled={isLoadingParks}
              className="w-full mt-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {isLoadingParks ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-3 shadow-lg h-[100%]">
            <Map 
              markers={markers} 
              center={searchCenter ? [searchCenter.longitude, searchCenter.latitude] : undefined} 
              zoom={zoomLevel * 2.2}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 