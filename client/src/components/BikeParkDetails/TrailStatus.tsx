import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { getTrailStatusColorClass } from '../../lib/helpers/common-helper';

const TrailStatus: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  if (!bikePark.trails?.length) {
    return <div />;
  }

  return (
    <div id="trail-status" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Trail Status</h3>
      <div className="space-y-4">
        {bikePark.trails?.map((trail) => (
          <div key={trail.id} className="flex items-center justify-between">
            <span>{trail.name}</span>
            <span className={`px-2 py-1 rounded-full text-sm capitalize ${getTrailStatusColorClass(trail.status)}`}>
              {trail.status}
            </span>
          </div>
        ))}
        {/* <div className="flex items-center justify-between">
            <span>Dirt Merchant</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">Maintenance</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Crank It Up</span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">Open</span>
          </div> */}
      </div>
      <button className="w-full mt-4 text-center text-emerald-600 hover:text-emerald-700">View All Trails</button>
    </div>
  );
};

export default TrailStatus;