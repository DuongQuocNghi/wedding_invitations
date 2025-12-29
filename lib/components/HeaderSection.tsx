'use client';

import { OptimizedImage } from '@/lib/utils/image';

export function HeaderSection() {
  return (
    <div className="relative w-full" style={{ height: '85vh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/assets/images/hinh_1.webp"
          alt="Wedding header"
          fill
          priority
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      {/* SVG overlay */}
      <div className="absolute top-[37px] left-4 right-4 flex justify-center z-10 pointer-events-none">
        <img
          src="/assets/svg/home_header.svg"
          alt="Header decoration"
          style={{ height: '30vh', width: 'auto' }}
          className="w-auto"
        />
      </div>
    </div>
  );
}

