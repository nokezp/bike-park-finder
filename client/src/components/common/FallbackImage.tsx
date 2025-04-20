/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

interface FallbackImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  defaultSrc?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ src, className = '' }) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    if (img) {
      img.src = src || '/src/assets/images/hero-image.png';
      img.onload = () => setImgSrc(src || '/src/assets/images/hero-image.png');
      img.onerror = () => setImgSrc('/src/assets/images/hero-image.png');
    }
  }, [src]);

  return (
    <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${className}`}>
      <div
        className="w-full h-full bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${imgSrc})` }}
      />
    </div>
  );
};
export default FallbackImage;
