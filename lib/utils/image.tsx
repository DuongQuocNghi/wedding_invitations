'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  borderRadius?: number;
  placeholderColor?: string;
  // Optional callback for when the underlying image has finished loading
  onLoadComplete?: () => void;
  // Show loading spinner while image is loading
  showLoadingSpinner?: boolean;
  // Custom spinner color (default: accent color)
  spinnerColor?: string;
}

export function OptimizedImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  borderRadius = 0,
  placeholderColor = '#F4F1EA',
  onLoadComplete,
  showLoadingSpinner = false,
  spinnerColor = '#9F7D6A',
}: OptimizedImageProps) {
  const [isVisible, setIsVisible] = useState(!priority);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLDivElement>(null);

  // Auto-detect if className contains w-full and use large width for optimization
  const hasFullWidth = className.includes('w-full') || className.includes('w-[');
  // Use provided width, or 1920 for full-width images, or calculate from height if only height provided
  const optimizedWidth = width || (hasFullWidth ? 1920 : height ? height * 1.5 : 800);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const checkVisibility = () => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Load if image is within 2 screen heights of viewport
      if (rect.top < windowHeight * 2 && rect.bottom > -windowHeight) {
        setIsVisible(true);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Fallback: load after 1 second
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      clearTimeout(timeout);
    };
  }, [priority]);

  const imageStyle: React.CSSProperties = {
    objectFit,
    borderRadius: borderRadius > 0 ? `${borderRadius}px` : undefined,
  };

  if (!isVisible) {
    return (
      <div
        ref={imgRef}
        className={className}
        style={{
          width: width || '100%',
          height: height || 'auto',
          backgroundColor: placeholderColor,
          borderRadius: borderRadius > 0 ? `${borderRadius}px` : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="animate-pulse bg-gray-300 w-full h-full rounded" />
      </div>
    );
  }

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        width: hasFullWidth ? '100%' : width,
        height: height,
        position: fill ? 'relative' : (showLoadingSpinner ? 'relative' : 'static'),
        borderRadius: borderRadius > 0 ? `${borderRadius}px` : undefined,
        overflow: 'hidden',
      }}
    >
      {showLoadingSpinner && isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            backgroundColor: placeholderColor,
            borderRadius: borderRadius > 0 ? `${borderRadius}px` : undefined,
          }}
        >
          <div 
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-r-2" 
            style={{ borderColor: `${spinnerColor}40`, borderTopColor: spinnerColor, borderRightColor: spinnerColor }}
          />
        </div>
      )}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={imageStyle}
          priority={priority}
          onLoad={() => {
            setIsLoading(false);
            onLoadComplete?.();
          }}
          className={`transition-opacity duration-200 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={optimizedWidth}
          height={height}
          style={imageStyle}
          priority={priority}
          onLoad={() => {
            setIsLoading(false);
            onLoadComplete?.();
          }}
          className={`transition-opacity duration-200 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}
