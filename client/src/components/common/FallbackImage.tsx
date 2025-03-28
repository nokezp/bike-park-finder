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
      <i className="fa-solid fa-mountain text-6xl text-gray-400"></i>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
};

export default FallbackImage;
