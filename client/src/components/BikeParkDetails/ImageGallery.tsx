import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import FallbackImage from '../FallbackImage';

const ImageGallery: React.FC<{ bikePark: BikePark }> = (bikePark) => {
  if(!bikePark.photos?.length) {
    return <div />;
  }
  
  return (
    <section id="image-gallery" className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Park Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bikePark.photos?.map((photo, index) => {
            return (
              <div key={'photo_' + index} className="relative h-48 group cursor-pointer">
                <FallbackImage src={photo} alt={bikePark?.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-expand text-white text-2xl"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;