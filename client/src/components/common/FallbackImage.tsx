import React, { useState } from 'react';

interface FallbackImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  defaultSrc?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ src, alt, className = '' }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  return error ? (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <img
        className="inset-0 w-full h-full object-cover rounded-l-lg"
        src="src/assets/images/hero-image.png"
        alt="aerial view of mountain bike park"
      />
    </div>
  ) : (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
};

export default FallbackImage;
