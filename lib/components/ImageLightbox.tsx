'use client';

import { useEffect, useState } from 'react';
import { OptimizedImage } from '@/lib/utils/image';

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

export function ImageLightbox({ isOpen, imageSrc, onClose }: ImageLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset loading state whenever a new image is opened
  useEffect(() => {
    if (imageSrc) {
      setIsLoading(true);
    }
  }, [imageSrc]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all z-10"
        aria-label="Close image"
      >
        ×
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="relative w-full h-full flex items-center justify-center">
          <OptimizedImage
            src={imageSrc}
            alt="Full screen view"
            fill
            objectFit="contain"
            className="w-full h-full"
            priority
            placeholderColor="transparent"
            onLoadComplete={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
