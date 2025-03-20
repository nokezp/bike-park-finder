import React from 'react';
import BikeParkCard from './BikeParkCard';

interface BikePark {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  features: string[];
  temperature: number;
  weatherIcon: string;
}

const MOCK_BIKE_PARKS: BikePark[] = [
  {
    id: '1',
    name: 'Whistler Mountain Bike Park',
    location: 'Whistler, BC, Canada',
    rating: 4.8,
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png',
    features: ['Flow Trails', 'Expert Jumps', 'Lift Access'],
    temperature: 22,
    weatherIcon: 'fa-cloud-sun'
  },
  {
    id: '2',
    name: 'Highland Mountain Bike Park',
    location: 'New Hampshire, USA',
    rating: 4.6,
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png',
    features: ['Beginner Friendly', 'Skills Park', 'Lift Access'],
    temperature: 18,
    weatherIcon: 'fa-cloud'
  },
  {
    id: '3',
    name: 'Queenstown Bike Park',
    location: 'Queenstown, New Zealand',
    rating: 4.7,
    imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b2860b1595-c4f8b3e9911301d405cb.png',
    features: ['Flow Trails', 'Technical', 'Gondola'],
    temperature: 20,
    weatherIcon: 'fa-sun'
  }
];

const ResultsGrid: React.FC = () => {
  return (
    <section id="results-grid" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">24 Bike Parks Found</h2>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 rounded-md border border-gray-200 text-gray-800">
              <option>Sort by: Popular</option>
              <option>Rating</option>
              <option>Distance</option>
            </select>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md bg-emerald-100 text-emerald-600">
                <i className="fa-solid fa-grid-2"></i>
              </button>
              <button className="p-2 rounded-md text-gray-400 hover:bg-gray-100">
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BIKE_PARKS.map((park) => (
            <BikeParkCard key={park.id} bikePark={park} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <button className="px-4 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white">1</button>
          <button className="px-4 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-4 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsGrid;