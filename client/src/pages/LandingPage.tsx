import React from 'react';
import { Link } from 'react-router-dom';
import { ParkCard, Event, Hotel } from '../utils/types';
import LandingPageHero from '../components/Sections/Hero/LandingPageHero';

const featuredParks: ParkCard[] = [
  {
    id: '1',
    name: 'Whistler Mountain Bike Park',
    location: 'Whistler, BC, Canada',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png',
    rating: 4.8,
    features: [
      { text: 'Flow Trails', color: 'emerald' },
      { text: 'Expert Jumps', color: 'red' },
      { text: 'Lift Access', color: 'green' },
    ],
    weather: {
      icon: 'cloud-sun',
      temp: 22,
    },
  },
  {
    id: '2',
    name: 'Highland Mountain Bike Park',
    location: 'New Hampshire, USA',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png',
    rating: 4.6,
    features: [
      { text: 'Beginner Friendly', color: 'yellow' },
      { text: 'Skills Park', color: 'purple' },
      { text: 'Lift Access', color: 'green' },
    ],
    weather: {
      icon: 'cloud',
      temp: 18,
    },
  },
  {
    id: '3',
    name: 'Queenstown Bike Park',
    location: 'Queenstown, New Zealand',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b2860b1595-c4f8b3e9911301d405cb.png',
    rating: 4.7,
    features: [
      { text: 'Flow Trails', color: 'blue' },
      { text: 'Technical', color: 'orange' },
      { text: 'Gondola', color: 'green' },
    ],
    weather: {
      icon: 'sun',
      temp: 20,
    },
  },
];

const events: Event[] = [
  {
    id: '1',
    type: 'Competition',
    typeColor: 'blue',
    date: 'Jun 15, 2025',
    title: 'Downhill Championship',
    location: 'Whistler Mountain Bike Park',
    registeredCount: 156,
  },
  {
    id: '2',
    type: 'Workshop',
    typeColor: 'green',
    date: 'Jun 20, 2025',
    title: 'Beginner Skills Clinic',
    location: 'Highland Mountain Bike Park',
    registeredCount: 24,
  },
  {
    id: '3',
    type: 'Festival',
    typeColor: 'purple',
    date: 'Jul 1, 2025',
    title: 'Summer Bike Festival',
    location: 'Queenstown Bike Park',
    registeredCount: 312,
  },
];

const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Whistler Mountain Lodge',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/hotel-1.jpg',
    rating: 9.2,
    distance: '0.5km from Bike Park',
    features: [
      { text: 'Breakfast', color: 'blue' },
      { text: 'Bike Storage', color: 'green' },
    ],
    price: 249,
  },
  {
    id: '2',
    name: 'Alpine Bike Hotel',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/hotel-2.jpg',
    rating: 8.8,
    distance: '1km from Bike Park',
    features: [
      { text: 'Bike Wash', color: 'blue' },
      { text: 'Workshop', color: 'green' },
    ],
    price: 189,
  },
  {
    id: '3',
    name: 'Riders Resort & Spa',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/hotel-3.jpg',
    rating: 9.0,
    distance: '2km from Bike Park',
    features: [
      { text: 'Spa', color: 'blue' },
      { text: 'Restaurant', color: 'green' },
    ],
    price: 299,
  },
];

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingPageHero />

      {/* Featured Parks */}
      <section id="featured-parks" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Popular Bike Parks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredParks.map((park) => (
              <div key={park.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src={park.image} alt={park.name} />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm">
                    <i className="fa-solid fa-star text-yellow-400"></i> {park.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{park.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{park.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {park.features.map((feature, index) => (
                      <span key={index} className={`px-3 py-1 bg-${feature.color}-100 text-${feature.color}-600 rounded-full text-sm`}>
                        {feature.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <i className={`fa-solid fa-${park.weather.icon} text-gray-600`}></i>
                      <span className="text-gray-600">{park.weather.temp}°C</span>
                    </div>
                    <Link to={`/bike-parks/${park.id}`} className="text-emerald-600 hover:text-emerald-700">
                      View Details <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trail Features Section */}
      <section id="trail-features" className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Trail Features Guide</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-person-biking text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Flow Trails</h3>
              <p className="text-gray-600">Smooth, rolling trails with berms and optional features</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-diamond text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Technical</h3>
              <p className="text-gray-600">Rocky, rooty sections with challenging obstacles</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-arrow-up text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Jump Lines</h3>
              <p className="text-gray-600">Dedicated jump trails with tabletops and gap jumps</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-graduation-cap text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Skills Park</h3>
              <p className="text-gray-600">Practice areas with progressive features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events-section" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-${event.typeColor}-100 text-${event.typeColor}-600 px-3 py-1 rounded-full text-sm`}>
                      {event.type}
                    </div>
                    <span className="text-gray-600">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-users text-gray-600"></i>
                      <span className="text-gray-600">{event.registeredCount} registered</span>
                    </div>
                    <Link to={`/events/${event.id}`} className="text-emerald-600 hover:text-emerald-700">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section id="accommodation-section" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Book Your Stay</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src={hotel.image} alt={hotel.name} />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm">
                    <i className="fa-solid fa-star text-yellow-400"></i> {hotel.rating}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{hotel.name}</h3>
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/booking-com.png" alt="Booking.com" className="h-6" />
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{hotel.distance}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.features.map((feature, index) => (
                      <span key={index} className={`px-3 py-1 bg-${feature.color}-100 text-${feature.color}-600 rounded-full text-sm`}>
                        {feature.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                      <span className="font-bold text-lg">${hotel.price}</span> / night
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
