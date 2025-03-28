import React from 'react';

const AccommodationSection: React.FC= () => {
  return (
    <div id="accommodation" className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Nearby Accommodation</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <img
            className="w-20 h-20 rounded-lg object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png"
            alt="Hotel exterior"
          />
          <div>
            <h4 className="font-bold">Whistler Village Inn</h4>
            <div className="flex items-center text-yellow-400">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <span className="text-emerald-600">From $199/night</span>
          </div>
        </div>
        <button className="w-full py-2 text-center text-emerald-600 hover:text-emerald-700">View More Options</button>
      </div>
    </div>
  );
};

export default AccommodationSection;