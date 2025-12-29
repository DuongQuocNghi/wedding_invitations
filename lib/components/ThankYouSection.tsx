'use client';

import { OptimizedImage } from '@/lib/utils/image';
import Image from 'next/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function ThankYouSection() {
  return (
    <div
      className="w-full px-[30px]"
      style={{ backgroundColor: AppColors.accent }}
    >
      <div style={{ transform: 'translateY(-80px)' }}>
        {/* Photo with border */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[182px] h-[182px] mx-auto flex items-center justify-center">
            <OptimizedImage
              src="/assets/images/hinh_8.webp"
              alt="Thank you"
              width={140}
              height={140}
              objectFit="cover"
              borderRadius={80}
            />
            <Image
              src="/assets/svg/border_avatar.svg"
              alt="Border"
              width={182}
              height={182}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <div style={{ height: AppSpacing.s32 }} />

        {/* Title */}
        <h2 className="text-center font-sansita-swashed text-2xl leading-[1.2] tracking-[0.1px] text-[#F4F1EA]">
          THANK YOU
        </h2>

        <div style={{ height: AppSpacing.s8 }} />

        {/* Text */}
        <p className="text-center font-sarabun font-light text-[10px] leading-[1.6] text-[#F4F1EA]">
          Chúng con/em xin chân thành gửi lời cảm ơn sự chúc phúc và tình cảm
          quý báu đã dành cho chúng con/em trong ngày trọng đại này.
        </p>

        <div style={{ height: AppSpacing.s60 }} />
      </div>
    </div>
  );
}

