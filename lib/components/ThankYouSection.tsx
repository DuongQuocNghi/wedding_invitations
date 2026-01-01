'use client';

import { OptimizedImage } from '@/lib/utils/image';
import Image from 'next/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function ThankYouSection() {
  return (
    <div
      className="w-full px-[10px]"
      style={{ backgroundColor: AppColors.accent }}
    >
      <div style={{ transform: 'translateY(-80px)' }}>
        {/* Photo with border */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[202px] h-[202px] mx-auto flex items-center justify-center">
            <OptimizedImage
              src="/assets/images/hinh_8.png"
              alt="Thank you"
              width={150}
              height={150}
              objectFit="cover"
              borderRadius={80}
            />
            <Image
              src="/assets/svg/border_avatar.svg"
              alt="Border"
              width={202}
              height={202}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <div style={{ height: AppSpacing.s32 }} />

        {/* Title */}
        <h2 className="text-center font-bellefair text-2xl leading-[1.2] text-[#F4F1EA]" style={{ letterSpacing: '0.06em' }}>
          THANK YOU
        </h2>

        <div style={{ height: AppSpacing.s8 }} />

        {/* Text */}
        <p className="text-center font-sarabun font-light text-base leading-[1.67] text-[#F4F1EA]">
          Chúng con/em xin chân thành gửi lời cảm ơn<br /> sự chúc phúc và tình cảm
          quý báu đã dành cho <br />chúng con/em trong ngày trọng đại này.
        </p>

        <div style={{ height: AppSpacing.s60 }} />
      </div>
    </div>
  );
}

