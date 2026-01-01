'use client';

import { OptimizedImage } from '@/lib/utils/image';
import Image from 'next/image';

export function HeaderSection() {
  return (
    <div className="relative w-full" style={{ height: '85vh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/assets/images/hinh_1.png"
          alt="Wedding header"
          fill
          priority
          objectFit="cover"
          className="w-full h-full"
          placeholderColor="#F4F1EA"
        />
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

