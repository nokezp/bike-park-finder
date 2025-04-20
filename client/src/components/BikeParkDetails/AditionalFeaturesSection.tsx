import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { featuresObject } from '../../lib/helpers/common-helper';

const AdditionalFeaturesSection: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  if (bikePark.features?.length === 0) {
    return <div />;
  }

  return (
    <section id="additional-features" className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Park Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bikePark.features?.slice(0, 4)?.map((feature) => {
            const fo = featuresObject.find(({ name }) => name === feature);
            return (
              <div key={`feature_${feature.replace(' ', '_')}`} className="p-6 border rounded-lg items-center flex flex-col gap-2">
                <div className={`bg-${fo?.color}-500 rounded-full flex items-center justify-center w-[50px] h-[50px]`}>
                  <i className={`fa-solid fa-${fo?.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{feature}</h3>
                <p className="text-gray-600">{fo?.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeaturesSection;