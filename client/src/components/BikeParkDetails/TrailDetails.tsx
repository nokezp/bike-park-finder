import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { featuresObject, getTrailDifficultyColorClass } from '../../lib/helpers/common-helper';

const TrailDetails: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  if (bikePark?.trails?.length === 0) {
    return <div />;
  }

  return (
    <section id="trail-details" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Trail Details</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikePark.trails?.map((trail) => (
            <div key={`trail_details_${trail.id}`} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{trail.name}</h3>
                {/* <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{trail.difficulty}</span> */}
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${getTrailDifficultyColorClass(trail.difficulty)}`}>
                  {trail.difficulty}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Length</span>
                  <span className="font-semibold">{trail.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vertical Drop</span>
                  <span className="font-semibold">{trail.verticalDrop}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Features</span>
                  <div className="flex space-x-2">
                    {trail.features?.map((feature) => {
                      const fo = featuresObject.find(({ name }) => name === feature);
                      return (
                        <i key={`trail_details_feature_${feature}`} className={`fa-solid fa-${fo?.icon} text-${fo?.color}-600`}></i>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Dirt Merchant</h3>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Expert</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Length</span>
              <span className="font-semibold">1.8 km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vertical Drop</span>
              <span className="font-semibold">280m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Features</span>
              <div className="flex space-x-2">
                <i className="fa-solid fa-person-falling text-emerald-600"></i>
                <i className="fa-solid fa-mountain text-emerald-600"></i>
                <i className="fa-solid fa-bridge text-emerald-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Easy Does It</h3>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Beginner</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Length</span>
              <span className="font-semibold">3.2 km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vertical Drop</span>
              <span className="font-semibold">200m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Features</span>
              <div className="flex space-x-2">
                <i className="fa-solid fa-person-biking text-emerald-600"></i>
                <i className="fa-solid fa-mountain text-emerald-600"></i>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </section>
  );
};

export default TrailDetails;