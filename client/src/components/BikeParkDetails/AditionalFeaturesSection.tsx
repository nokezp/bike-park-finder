import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';

const AdditionalFeaturesSection: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  if (bikePark.features?.length === 0) {
    return <div />;
  }

  return (
    <section id="additional-features" className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Park Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bikePark.features?.slice(0, 4)?.map((feature) => (
            <div key={`feature_${feature.replace(' ', '_')}`} className="p-6 border rounded-lg">
              <i className="fa-solid fa-bicycle text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">{feature}</h3>
              <p className="text-gray-600">Full suspension bikes, protective gear, and equipment available for rent.</p>
            </div>
          ))}
          {/* <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-person-chalkboard text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">Lessons & Clinics</h3>
              <p className="text-gray-600">Professional instruction for all skill levels, from beginners to advanced riders.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-utensils text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">Dining Options</h3>
              <p className="text-gray-600">Multiple restaurants and cafes located throughout the park.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-kit-medical text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">First Aid Station</h3>
              <p className="text-gray-600">On-site medical support and first aid facilities for rider safety.</p>
            </div> */}
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeaturesSection;