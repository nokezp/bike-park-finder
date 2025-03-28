import React, { useState } from 'react';
import { useQuery } from 'urql';
import { EventsDocument } from '../../lib/graphql/generated/graphql-operations';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'CHAMPIONSHIP' | 'WORKSHOP' | 'FESTIVAL' | 'GROUP_RIDE';
  price: number;
  imageUrl: string;
  attendeeCount: number;
  featured: boolean;
}

interface EventsResponse {
  events: Event[];
}

interface SearchParams {
  search?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
}

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: undefined,
    category: undefined,
    location: undefined,
    startDate: undefined,
    endDate: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const [email, setEmail] = useState('');

  const [{ data, fetching }] = useQuery<EventsResponse>({
    query: EventsDocument,
    variables: { 
      filter: {
        ...searchParams,
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      } 
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled automatically by urql when searchParams change
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  const renderEventCard = (event: Event) => (
    <div
      key={event.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={event.imageUrl} alt={event.title} />
        {event.featured && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            event.category === 'CHAMPIONSHIP' ? 'bg-blue-100 text-blue-600' :
            event.category === 'WORKSHOP' ? 'bg-green-100 text-green-600' :
            event.category === 'FESTIVAL' ? 'bg-purple-100 text-purple-600' :
            'bg-orange-100 text-orange-600'
          }`}>
            {event.category.charAt(0) + event.category.slice(1).toLowerCase().replace('_', ' ')}
          </span>
          <div className="text-gray-600">
            <i className="fa-regular fa-calendar mr-2"></i>
            {moment(event.date).format('MMM D, YYYY')}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <i className="fa-solid fa-location-dot mr-2"></i>
          {event.location}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full" />
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-6 h-6 rounded-full -ml-2" />
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full -ml-2" />
            <span className="text-gray-600 ml-2">+{event.attendeeCount} going</span>
          </div>
          <span className="text-emerald-600 font-bold">${event.price}</span>
        </div>
        <button className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">
          Register Now
        </button>
      </div>
    </div>
  );

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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

      {/* Search Section */}
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
                  value={searchParams.search}
                  onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-200"
                  value={searchParams.category}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
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
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
              >
                Search Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Categories</h2>
            <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer">View All</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative group cursor-pointer">
              <img
                className="w-full h-48 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1c67488712-b96b92d9e02e37aa4b55.png"
                alt="Races"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Races</h3>
                <p>24 Events</p>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                className="w-full h-48 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f1a3daef3b-9a5736df319c856fdac9.png"
                alt="Workshops"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Workshops</h3>
                <p>16 Events</p>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                className="w-full h-48 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5fb1a1b3d8-b126228684fdf6321e58.png"
                alt="Festivals"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Festivals</h3>
                <p>8 Events</p>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                className="w-full h-48 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b914477774-20809743ba2b9bddaf9f.png"
                alt="Group Rides"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Group Rides</h3>
                <p>32 Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Featured Events</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-600">All Events</button>
              <button className="px-4 py-2 rounded-full hover:bg-gray-200">This Week</button>
              <button className="px-4 py-2 rounded-full hover:bg-gray-200">This Month</button>
              <button className="px-4 py-2 rounded-full hover:bg-gray-200">Next Month</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data?.events?.map(renderEventCard)}
          </div>

          <div className="text-center mt-8">
            <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-md hover:bg-emerald-50">
              Load More Events
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Events</h2>
            <p className="mb-8">Get notified about new events and early bird tickets</p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
