import React from 'react';
import { Map } from '../components/Map';
import {
  BikePark,
  Difficulty,
  Feature,
  Amenity,
  SortOption,
  MapMarker,
  SearchFilters,
  Coordinates
} from '../types/bikePark';
import { geocodeLocation, isWithinRadius, calculateDistance } from '../utils/location';
import debounce from 'lodash/debounce';

const SEARCH_RADIUS_KM = 50;

const MOCK_BIKE_PARKS: BikePark[] = [
  {
    id: '1',
    name: 'Whistler Mountain',
    location: 'Whistler, BC, Canada',
    rating: 4.8,
    difficulty: Difficulty.EXPERT,
    features: [Feature.FLOW],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png',
    coordinates: [-122.9574, 50.1163],
    amenities: [Amenity.LIFT, Amenity.RENTAL, Amenity.FOOD]
  },
  {
    id: '2',
    name: 'Highland Mountain',
    location: 'New Hampshire, USA',
    rating: 4.6,
    difficulty: Difficulty.BEGINNER,
    features: [Feature.SKILLS],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png',
    coordinates: [-71.5724, 43.1939],
    amenities: [Amenity.LIFT, Amenity.RENTAL]
  },
  {
    id: '3',
    name: 'Queenstown Bike Park',
    location: 'Queenstown, NZ',
    rating: 4.7,
    difficulty: Difficulty.INTERMEDIATE,
    features: [Feature.FLOW, Feature.TECHNICAL],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b2860b1595-c4f8b3e9911301d405cb.png',
    coordinates: [168.6626, -45.0312],
    amenities: [Amenity.LIFT, Amenity.FOOD]
  }
];

export function MapsPage() {
  const [filters, setFilters] = React.useState<SearchFilters>({
    difficulty: Difficulty.ALL,
    features: [],
    location: '',
    sortBy: SortOption.RATING
  });
  const [searchCenter, setSearchCenter] = React.useState<Coordinates | null>(null);
  const [filteredParks, setFilteredParks] = React.useState<BikePark[]>(MOCK_BIKE_PARKS);
  const [isSearching, setIsSearching] = React.useState(false);

  // Debounced geocoding function
  const debouncedGeocode = React.useMemo(
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
  React.useEffect(() => {
    debouncedGeocode(filters.location);
    return () => {
      debouncedGeocode.cancel();
    };
  }, [filters.location, debouncedGeocode]);

  // Filter and sort parks based on all criteria
  React.useEffect(() => {
    let filtered = [...MOCK_BIKE_PARKS];

    // Filter by location if search center is set
    if (searchCenter) {
      filtered = filtered.filter((park) =>
        isWithinRadius(
          searchCenter.lat,
          searchCenter.lng,
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
          searchCenter.lat,
          searchCenter.lng,
          a.coordinates[1],
          a.coordinates[0]
        );
        const distanceB = calculateDistance(
          searchCenter.lat,
          searchCenter.lng,
          b.coordinates[1],
          b.coordinates[0]
        );
        return distanceA - distanceB;
      });
    }

    setFilteredParks(filtered);
  }, [filters, searchCenter]);

  const markers: MapMarker[] = filteredParks.map(park => ({
    coordinates: park.coordinates,
    title: park.name,
    description: park.location
  }));

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="pt-16">
        {/* Search and Map Section */}
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
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-gray-200"
                      value={filters.difficulty}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value as Difficulty)}
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
                      value={filters.features?.[0] || Feature.ALL}
                      onChange={(e) => handleFilterChange('features', [e.target.value as Feature])}
                    >
                      {Object.values(Feature).map(feature => (
                        <option key={feature} value={feature}>{feature}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(Amenity).map(amenity => (
                      <button
                        key={amenity}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                        onClick={() => {
                          const currentAmenities = filters.amenities || [];
                          const newAmenities = currentAmenities.includes(amenity)
                            ? currentAmenities.filter(a => a !== amenity)
                            : [...currentAmenities, amenity];
                          handleFilterChange('amenities', newAmenities);
                        }}
                      >
                        <i className={`fa-solid ${
                          amenity === Amenity.LIFT ? 'fa-chair-lift' :
                          amenity === Amenity.RENTAL ? 'fa-bicycle' :
                          'fa-utensils'
                        } mr-2`}></i>
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {filteredParks.length} Parks Found
                    {searchCenter && filters.location && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        within {SEARCH_RADIUS_KM}km of {filters.location}
                      </span>
                    )}
                  </h2>
                  <select
                    className="px-3 py-1 text-sm rounded-md border border-gray-200"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as SortOption)}
                  >
                    {Object.values(SortOption).map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Compact Park Cards */}
                <div id="compact-results" className="space-y-3">
                  {filteredParks.map((park) => (
                    <div key={park.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
                      <div className="flex gap-4">
                        <img src={park.imageUrl} className="w-20 h-20 rounded-lg object-cover" alt={park.name} />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{park.name}</h3>
                            <span className="text-sm">
                              <i className="fa-solid fa-star text-yellow-400"></i> {park.rating}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{park.location}</p>
                          <div className="flex gap-2">
                            {park.features.map((feature, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  feature === Feature.FLOW
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : feature === Feature.SKILLS
                                    ? 'bg-purple-100 text-purple-600'
                                    : 'bg-orange-100 text-orange-600'
                                }`}
                              >
                                {feature}
                              </span>
                            ))}
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                park.difficulty === Difficulty.BEGINNER
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : park.difficulty === Difficulty.INTERMEDIATE
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-red-100 text-red-600'
                              }`}
                            >
                              {park.difficulty}
                            </span>
                          </div>
                          {searchCenter && (
                            <div className="mt-2 text-sm text-gray-500">
                              {calculateDistance(
                                searchCenter.lat,
                                searchCenter.lng,
                                park.coordinates[1],
                                park.coordinates[0]
                              ).toFixed(1)}km away
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-sm">Previous</button>
                    <button className="px-3 py-1 border rounded-md bg-emerald-600 text-white text-sm">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-sm">2</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-sm">3</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-sm">Next</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[800px]">
                <Map
                  center={searchCenter ? [searchCenter.lng, searchCenter.lat] : [-122.9574, 50.1163]}
                  zoom={searchCenter ? 9 : 4}
                  markers={markers}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 