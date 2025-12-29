'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppSpacing } from '@/lib/constants/spacing';

export function MemoriesSection() {
  return (
    <div className="w-full px-4">
      <div style={{ height: AppSpacing.s65 }} />

      {/* Title */}
      <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F]">
        Our Wedding<br />
        Memories
      </h2>
      <div style={{ height: AppSpacing.s18 }} />

      {/* Layout */}
      <div className="flex gap-2">
        {/* Left side */}
        <div className="flex-1 flex flex-col">
          <p className="font-sarabun italic text-[10px] leading-[1.6] text-[#565857]">
            Ngay từ ngày đầu gặp gỡ, trái tim chúng ta đã hòa chung nhịp đập,
            thì thầm rằng người ấy chính là duy nhất.
          </p>
          <div style={{ height: AppSpacing.s47 }} />
          <OptimizedImage
            src="/assets/images/hinh_3.webp"
            alt="Memory 3"
            height={163}
            objectFit="cover"
            borderRadius={6}
            className="w-full"
          />
        </div>

        {/* Right side */}
        <div className="flex-1">
          <div style={{ transform: 'translateY(-40px)' }}>
            <OptimizedImage
              src="/assets/images/hinh_2.webp"
              alt="Memory 2"
              height={224}
              objectFit="cover"
              borderRadius={6}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div style={{ height: AppSpacing.s4 }} />

      {/* Footer */}
      <div className="flex justify-end">
        <div style={{ transform: 'translateX(40px)' }}>
          <p
            className="font-alex-brush italic text-[140px] leading-[0.43] tracking-[-4px]"
            style={{ color: 'rgba(159, 125, 106, 0.08)' }}
          >
            Dating
          </p>
        </div>
      </div>

      <div style={{ height: AppSpacing.s50 }} />
    </div>
  );
}

