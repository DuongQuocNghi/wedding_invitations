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
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const hasBeenVisibleRef = useRef(false);
  const isLoadingRef = useRef(true);

  // Auto-detect if className contains w-full and use large width for optimization
  const hasFullWidth = className.includes('w-full') || className.includes('w-[');
  // Use provided width, or 1920 for full-width images, or calculate from height if only height provided
  const optimizedWidth = width || (hasFullWidth ? 1920 : height ? height * 1.5 : 800);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasLoaded(false);
    isLoadingRef.current = true;
  }, [src]);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      hasBeenVisibleRef.current = true;
      return;
    }

    // Throttle function to limit scroll event frequency
    let ticking = false;
    const checkVisibility = () => {
      if (!imgRef.current || hasBeenVisibleRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Load if image is within 2 screen heights of viewport
      if (rect.top < windowHeight * 2 && rect.bottom > -windowHeight) {
        setIsVisible(true);
        hasBeenVisibleRef.current = true;
      }
    };

    const throttledCheckVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkVisibility();
    window.addEventListener('scroll', throttledCheckVisibility, { passive: true });
    window.addEventListener('resize', throttledCheckVisibility, { passive: true });

    // Fallback: load after 1 second
    const timeout = setTimeout(() => {
      if (!hasBeenVisibleRef.current) {
        setIsVisible(true);
        hasBeenVisibleRef.current = true;
      }
    }, 1000);

    return () => {
      window.removeEventListener('scroll', throttledCheckVisibility);
      window.removeEventListener('resize', throttledCheckVisibility);
      clearTimeout(timeout);
    };
  }, [priority]);

  // Create image style - only apply transition during initial load, not after
  const getImageStyle = (): React.CSSProperties => ({
    objectFit,
    borderRadius: borderRadius > 0 ? `${borderRadius}px` : undefined,
    // Only apply transition when loading, remove it after load to prevent flicker on scroll
    transition: isLoading && !hasLoaded ? 'opacity 0.2s ease-in-out' : 'none',
    willChange: isLoading ? 'opacity' : 'auto',
  });

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
          style={getImageStyle()}
          priority={priority}
          onLoad={() => {
            if (isLoadingRef.current) {
              setIsLoading(false);
              setHasLoaded(true);
              isLoadingRef.current = false;
              onLoadComplete?.();
            }
          }}
          onError={() => {
            setIsLoading(false);
            setHasLoaded(true);
            isLoadingRef.current = false;
          }}
          className={hasLoaded || !isLoading ? 'opacity-100' : 'opacity-0'}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={optimizedWidth}
          height={height}
          style={getImageStyle()}
          priority={priority}
          onLoad={() => {
            if (isLoadingRef.current) {
              setIsLoading(false);
              setHasLoaded(true);
              isLoadingRef.current = false;
              onLoadComplete?.();
            }
          }}
          onError={() => {
            setIsLoading(false);
            setHasLoaded(true);
            isLoadingRef.current = false;
          }}
          className={hasLoaded || !isLoading ? 'opacity-100' : 'opacity-0'}
        />
      )}
    </div>
  );
}
