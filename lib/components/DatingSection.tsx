'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function DatingSection() {
  return (
    <div className="w-full relative">
      {/* Brown background layer */}
      <div
        className="absolute inset-0"
        style={{
          marginTop: 32,
          marginBottom: 83,
          backgroundColor: AppColors.bgDark,
        }}
      />

      {/* Main content */}
      <div className="relative flex gap-1 px-4">
        {/* Left side: Text */}
        <div className="flex-1 flex flex-col">
          <div style={{ height: AppSpacing.s80 }} />
          <p className="font-sarabun font-light text-xs leading-[1.67] text-white">
            Giây phút chiếc nhẫn chạm vào tay là hành trình mới của chúng ta
            bắt đầu. Từ khoảnh khắc ấy, em, anh, không còn là hai cuộc đời
            riêng nữa.
          </p>

          {/* Date at bottom left */}
          <div style={{ height: AppSpacing.s40 }} />
          <div className="flex flex-col">
            <div style={{ transform: 'translateY(20px)' }}>
              <p
                className="font-alex-brush text-[60px] leading-[0.8]"
                style={{ color: AppColors.accent }}
              >
                28
              </p>
            </div>
            <div style={{ paddingLeft: AppSpacing.s50 }}>
              <p
                className="font-alex-brush text-[60px] leading-[0.8]"
                style={{ color: AppColors.accent }}
              >
                04
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="flex-1">
          <OptimizedImage
            src="/assets/images/hinh_4.webp"
            alt="Dating"
            height={320}
            objectFit="cover"
            borderRadius={6}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

