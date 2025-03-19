import React, { useState } from 'react';

interface FallbackImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  defaultSrc?: string;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  className = '',
  defaultSrc = '/images/default-bike-park.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src || defaultSrc);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc(defaultSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}; 