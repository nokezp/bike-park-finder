import React, { useState } from "react";
import { EventFilter } from "../../lib/graphql/generated/graphql-operations";

const EventHeader: React.FC<{ 
  filter: EventFilter,
  setFilter: (params: EventFilter) => void 
}> = ({ filter, setFilter }) => {
  const [searchParams, setSearchParams] = useState<EventFilter>(filter);

  return (
    <>
      <section className="relative h-[600px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b0c773c6d4-67bdcc29d416f298f139.png"
          alt="mountain biking event"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Next Biking Adventure</h1>
            <p className="text-xl">Discover and join exciting biking events worldwide</p>
          </div>
        </div>
      </section>
      <section className="bg-white shadow-lg relative -mt-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search events by name or keyword..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                  value={searchParams?.title ?? ""}
                  onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-200"
                  value={searchParams?.category ?? ""}
                  onChange={(e: any) => setSearchParams({ ...searchParams, category: e.target.value })}
                >
                  <option value="">Event Type</option>
                  <option value="CHAMPIONSHIP">Races</option>
                  <option value="WORKSHOP">Workshops</option>
                  <option value="FESTIVAL">Festivals</option>
                  <option value="GROUP_RIDE">Group Rides</option>
                </select>
              </div>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                  value={searchParams?.location ?? ""}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>
              <button
                onClick={() => setFilter(searchParams)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
              >
                Search Events
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
