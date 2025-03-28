import React from "react";
import FallbackImage from "../common/FallbackImage";
import { BikePark } from "../../lib/graphql/generated/graphql-operations";
import { getCurrentWorkingStatus, getWeatherIcon } from "../../lib/helpers/common-helper";

// Component expects a BikePark object
const BikeParkHeader: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  return (
    <>
      <section id="park-hero" className="relative h-[500px]">
        <div className="absolute inset-0">
          <FallbackImage
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png"
            alt={bikePark.name || "Bike Park"}
            className="w-full h-full object-cover"
          />
          {/* <FallbackImage src={bikePark?.imageUrl ?? undefined} alt={bikePark?.name} className="w-full h-full object-cover" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex items-end pb-8">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-emerald-500 px-3 py-1 rounded-full text-sm">
                {getCurrentWorkingStatus(bikePark.openingHours) !== 'Closed' ? 'Open Today' : 'Closed'}
              </span>
              <div className="flex items-center">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="ml-1">{bikePark.rating} ({bikePark.reviews?.length} reviews)</span>
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

      <section id="quick-info" className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img id="wicon" src={getWeatherIcon(bikePark.weather?.current?.icon ?? '')} alt="Weather icon" />
                <div>
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="font-bold capitalize">
                    {bikePark.weather?.current?.temperature}°C {bikePark.weather?.current?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-clock text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-bold">{getCurrentWorkingStatus(bikePark.openingHours)}</p>
                </div>
              </div>
              {bikePark.trails && bikePark.trails.length > 0 && (
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-ruler-vertical text-2xl text-gray-600"></i>
                  <div>
                    <p className="text-sm text-gray-600">Vertical Drop</p>
                    <p className="font-bold">{bikePark.trails[0].length}</p>
                  </div>
                </div>
              )}
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
    </>
  );
};

export default BikeParkHeader;
