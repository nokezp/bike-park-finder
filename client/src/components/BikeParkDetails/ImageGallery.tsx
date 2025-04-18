import React, { useState } from 'react';
import FallbackImage from '../common/FallbackImage';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import ModalDialog from '../common/ModalDialog';

const ImageGallery: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!bikePark?.photos?.length) {
    return <div />;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null || !bikePark.photos) return;
    setSelectedImageIndex((selectedImageIndex - 1 + bikePark.photos.length) % bikePark.photos.length);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null || !bikePark.photos) return;
    setSelectedImageIndex((selectedImageIndex + 1) % bikePark.photos.length);
  };

  return (
    <section id="image-gallery" className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Park Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bikePark.photos.map((photo, index) => (
            <div
              key={`photo_${index}`}
              className="relative h-48 group cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <FallbackImage src={photo} alt={bikePark.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-expand text-white text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && bikePark.photos[selectedImageIndex] && (
        <ModalDialog
          isOpen={selectedImageIndex !== null}
          title={`${bikePark.name} - Image ${selectedImageIndex + 1} of ${bikePark.photos.length}`}
          size='4xl'
          onClose={handleCloseModal}
        >
          <div className="relative">
            <div className="flex justify-center items-center">
              <FallbackImage
                src={bikePark.photos[selectedImageIndex]}
                alt={`${bikePark.name} - Image ${selectedImageIndex + 1}`}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/70"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/70"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </ModalDialog>
      )}
    </section>
  );
};

export default ImageGallery;
