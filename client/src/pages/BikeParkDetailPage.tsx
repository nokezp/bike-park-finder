import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBikePark } from '../hooks/useBikeParks';
import moment from 'moment';

const BikeParkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, bikePark, error } = useBikePark(id);

  const coordinates: [number, number] = useMemo(() => {
    return [bikePark?.coordinates?.longitude, bikePark?.coordinates?.latitude];
  }, [bikePark?.coordinates?.longitude, bikePark?.coordinates?.latitude]);

  if (!id) return <div>Invalid bike park ID</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!bikePark) return <div>Bike park not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Park Details Hero */}
      <section id="park-hero" className="relative h-[500px]">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src={bikePark.imageUrl} alt={`${bikePark.name} aerial view`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex items-end pb-8">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${bikePark.status === 'open' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {bikePark.status === 'open' ? 'Open Today' : 'Closed'}
              </span>
              <div className="flex items-center">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="ml-1">{bikePark.rating} (324 reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{bikePark.name}</h1>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-location-dot"></i>
              <span>{bikePark.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section id="quick-info" className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-cloud-sun text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="font-bold">{bikePark.weather?.current?.temperature}°C</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-clock text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-bold">{bikePark.openingHours[moment().format('dddd').toLowerCase()]}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-ruler-vertical text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="font-bold">{bikePark.difficulty}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                <i className="fa-solid fa-ticket mr-2"></i>Book Tickets
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <i className="fa-regular fa-heart mr-2"></i>Save
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <i className="fa-solid fa-share-nodes mr-2"></i>Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section id="park-content" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div id="park-description" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About the Park</h2>
                <p className="text-gray-600 mb-4">{bikePark.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {bikePark.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <i className="fa-solid fa-mountain text-emerald-600"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trail Map */}
              <div id="trail-map" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Trail Map</h2>
                  <button className="text-emerald-600 hover:text-emerald-700">
                    <i className="fa-solid fa-expand mr-1"></i>View Full Map
                  </button>
                </div>
                <div className="relative h-[400px] bg-gray-100 rounded-lg">
                  {/* {bikePark.coordinates && (
                  <Map
                    center={coordinates}
                    zoom={13}
                    markers={[
                      {
                        coordinates: coordinates,
                        title: bikePark.name,
                        description: bikePark.location
                      }
                    ]}
                    />
                  )} */}
                </div>
              </div>

              {/* Reviews */}
              <div id="reviews" className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <button className="text-emerald-600 hover:text-emerald-700">Write a Review</button>
                </div>

                {/* Review Card */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      className="w-12 h-12 rounded-full"
                      alt="User avatar"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-bold">Mike Thompson</h4>
                        <span className="text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="text-gray-600">
                        Amazing park with world-class trails. The lift system is efficient and the staff is super friendly. A must-visit for
                        any mountain biker!
                      </p>
                    </div>
                  </div>
                </div>

                {/* More Reviews Button */}
                <button className="w-full py-2 text-center text-emerald-600 hover:text-emerald-700">Show More Reviews</button>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Weather Widget */}
              <div id="weather-widget" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Weather Forecast</h3>
                <div className="space-y-4">
                  {bikePark.weather?.forecast?.slice(0, 5)?.map((day: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{moment().add(index, 'days').format('dddd')}</span>
                      <div className="flex items-center">
                        <i className={`fa-solid ${day === 'sunny' ? 'fa-sun text-yellow-400' : 'fa-cloud text-gray-400'} mr-2`}></i>
                        <span>{day?.temperature}°C</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trail Status */}
              <div id="trail-status" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Trail Status</h3>
                <div className="space-y-4">
                  {bikePark.facilities?.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{facility}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">Open</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-emerald-600 hover:text-emerald-700">View All Trails</button>
              </div>

              {/* Additional Features */}
              <div id="additional-features" className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Park Features</h3>
                <div className="space-y-4">
                  {bikePark.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <i className="fa-solid fa-check text-emerald-600 mt-1"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="image-gallery" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Park Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bikePark.photos?.map((photo: string, index: number) => (
              <div key={index} className="relative h-48 group cursor-pointer">
                <img className="w-full h-full object-cover rounded-lg" src={photo} alt={`${bikePark.name} photo ${index + 1}`} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-expand text-white text-2xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BikeParkDetailPage;
