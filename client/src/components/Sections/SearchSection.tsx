import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <section id="search-section" className="bg-white shadow-lg relative z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-gray-800"
              />
            </div>
          </div>
          <div className="flex-1">
            <select className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-800">
              <option>All Difficulties</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
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
          <button className="bg-emerald-600 text-white px-8 py-2 rounded-md hover:bg-emerald-700">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}; 

export default SearchSection;