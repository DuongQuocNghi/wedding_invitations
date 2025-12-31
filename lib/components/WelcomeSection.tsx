'use client';

import { OptimizedImage } from '@/lib/utils/image';
import Image from 'next/image';
import { AppSpacing } from '@/lib/constants/spacing';

export function WelcomeSection() {
  return (
    <div className="w-full px-4">
      <div style={{ height: AppSpacing.s50 }} />
      
      {/* Title */}
      <h1
        className="text-center font-bellefair text-[27.31px] leading-none tracking-[0.07px] text-[#565857]"
      >
        WELCOME TO OUR
      </h1>
      
      {/* Love story SVG */}
      <div className="flex justify-center mt-[4px] mb-4">
        <Image
          src="/assets/svg/love_story.svg"
          alt="Love story"
          width={200}
          height={50}
          style={{ width: 'auto' }}
          className="w-auto"
          priority
        />
      </div>
      
      {/* Welcome text */}
      <p
        className="text-center font-sarabun font-light text-base leading-[1.67] text-[#565857]"
      >
        Chào mừng đến với khoảnh khắc mở ra cột mốc mới trong câu chuyện tình yêu của chúng em, <br />nơi hành trình mới bên nhau bắt đầu.
      </p>
      
      <div style={{ height: AppSpacing.s30 }} />
      
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="/assets/svg/NL_logo.svg"
          alt="NL Logo"
          width={200}
          height={135}
          style={{ width: 'auto' }}
          className="w-auto"
          priority
        />
      </div>
      
      <div style={{ height: AppSpacing.s30 }} />
      
      {/* Illustration */}
      <div className="flex justify-center">
        <OptimizedImage
          src="/assets/images/NL_draw.webp"
          alt="NL Draw"
          width={160}
          height={108}
          priority
          objectFit="contain"
        />
      </div>
      
      <div style={{ height: AppSpacing.s50 }} />
    </div>
  );
}

