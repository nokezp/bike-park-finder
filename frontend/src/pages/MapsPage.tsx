import React from 'react';
import { Map } from '../components/Map';

interface BikePark {
  id: string;
  name: string;
  location: string;
  rating: number;
  difficulty: string;
  features: string[];
  imageUrl: string;
  coordinates: [number, number];
}

const MOCK_BIKE_PARKS: BikePark[] = [
  {
    id: '1',
    name: 'Whistler Mountain',
    location: 'Whistler, BC, Canada',
    rating: 4.8,
    difficulty: 'Expert',
    features: ['Flow'],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png',
    coordinates: [-122.9574, 50.1163]
  },
  {
    id: '2',
    name: 'Highland Mountain',
    location: 'New Hampshire, USA',
    rating: 4.6,
    difficulty: 'Beginner',
    features: ['Skills'],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png',
    coordinates: [-71.5724, 43.1939]
  },
  {
    id: '3',
    name: 'Queenstown Bike Park',
    location: 'Queenstown, NZ',
    rating: 4.7,
    difficulty: 'Intermediate',
    features: ['Flow', 'Tech'],
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b2860b1595-c4f8b3e9911301d405cb.png',
    coordinates: [168.6626, -45.0312]
  }
];

export function MapsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All Levels');
  const [selectedFeature, setSelectedFeature] = React.useState('All Features');
  const [searchLocation, setSearchLocation] = React.useState('');
  const [sortBy, setSortBy] = React.useState('Rating');

  const markers = MOCK_BIKE_PARKS.map(park => ({
    coordinates: park.coordinates,
    title: park.name,
    description: park.location
  }));

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="relative">
                      <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
                      <input
                        type="text"
                        placeholder="Enter location"
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-gray-200"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      <option>All Levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-gray-200"
                      value={selectedFeature}
                      onChange={(e) => setSelectedFeature(e.target.value)}
                    >
                      <option>All Features</option>
                      <option>Flow Trails</option>
                      <option>Jump Lines</option>
                      <option>Technical</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                      <i className="fa-solid fa-chair-lift mr-2"></i>Lift Access
                    </button>
                    <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                      <i className="fa-solid fa-bicycle mr-2"></i>Rental
                    </button>
                    <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                      <i className="fa-solid fa-utensils mr-2"></i>Food
                    </button>
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{MOCK_BIKE_PARKS.length} Parks Found</h2>
                  <select
                    className="px-3 py-1 text-sm rounded-md border border-gray-200"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Rating</option>
                    <option>Distance</option>
                  </select>
                </div>

                {/* Compact Park Cards */}
                <div id="compact-results" className="space-y-3">
                  {MOCK_BIKE_PARKS.map((park) => (
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
                  center={[-122.9574, 50.1163]} // Default to Whistler coordinates
                  zoom={4}
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