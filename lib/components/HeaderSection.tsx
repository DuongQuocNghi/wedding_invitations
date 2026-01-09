'use client';

import { OptimizedImage } from '@/lib/utils/image';
import Image from 'next/image';

interface HeaderSectionProps {
  onImageClick?: (imagePath: string) => void;
}

export function HeaderSection({ onImageClick }: HeaderSectionProps) {
  return (
    <div className="relative w-full" style={{ height: '85vh' }}>
      {/* Background image - Responsive: mobile uses smaller image */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <div 
          className="block min-[500px]:hidden w-full h-full cursor-pointer"
          onClick={() => onImageClick?.('/assets/images/hinh_1.webp')}
        >
          <OptimizedImage
            src="/assets/images/hinh_1_m.webp"
            alt="Wedding header"
            fill
            priority
            objectFit="cover"
            className="w-full h-full"
            placeholderColor="#F4F1EA"
          />
        </div>
        {/* Desktop/Tablet image */}
        <div 
          className="hidden min-[500px]:block w-full h-full cursor-pointer"
          onClick={() => onImageClick?.('/assets/images/hinh_1.webp')}
        >
          <OptimizedImage
            src="/assets/images/hinh_1.webp"
            alt="Wedding header"
            fill
            priority
            objectFit="cover"
            className="w-full h-full"
            placeholderColor="#F4F1EA"
          />
        </div>
      </div>
      {/* SVG overlay */}
      <div className="absolute top-[20px] left-4 right-4 flex justify-center z-10 pointer-events-none">
        <Image
          src="/assets/svg/home_header.svg"
          alt="Header decoration"
          width={300}
          height={200}
          style={{ height: '30vh', width: 'auto' }}
          className="w-auto"
          priority
        />
      </div>
    </div>
  );
}

