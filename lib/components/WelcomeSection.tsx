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
        className="text-center font-sarabun text-[27.31px] leading-none tracking-[0.07px] text-[#565857]"
      >
        WELCOME TO OUR
      </h1>
      
      {/* Love story SVG */}
      <div className="flex justify-center my-4">
        <img
          src="/assets/svg/love_story.svg"
          alt="Love story"
          height={50}
          style={{ width: 'auto' }}
          className="w-auto"
        />
      </div>
      
      {/* Welcome text */}
      <p
        className="text-center font-sarabun font-light text-xs leading-[1.67] text-[#565857]"
      >
        Chào mừng đến với khoảnh khắc mở ra cột mốc mới trong câu<br />
        chuyện tình yêu của chúng em, nơi hành trình mới<br />
        bên nhau bắt đầu.
      </p>
      
      <div style={{ height: AppSpacing.s30 }} />
      
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/assets/svg/NL_logo.svg"
          alt="NL Logo"
          height={135}
          style={{ width: 'auto' }}
          className="w-auto"
        />
      </div>
      
      <div style={{ height: AppSpacing.s30 }} />
      
      {/* Illustration */}
      <div className="flex justify-center">
        <OptimizedImage
          src="/assets/images/NL_draw.webp"
          alt="NL Draw"
          width={110}
          height={110}
          priority
          objectFit="contain"
        />
      </div>
      
      <div style={{ height: AppSpacing.s50 }} />
    </div>
  );
}

