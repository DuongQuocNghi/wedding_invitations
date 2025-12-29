'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppSpacing } from '@/lib/constants/spacing';

export function CeremonySection() {
  return (
    <div className="w-full px-4 flex gap-1">
      {/* Left side */}
      <div className="flex-[3] flex flex-col">
        <div style={{ height: AppSpacing.s90 }} />
        <OptimizedImage
          src="/assets/images/hinh_5.webp"
          alt="Ceremony 1"
          height={212}
          objectFit="cover"
          borderRadius={6}
          className="w-full"
        />
        <div style={{ height: AppSpacing.s36 }} />
        <p className="font-sarabun italic text-[10px] leading-[1.6] text-[#565857]">
          Nắm tay nhau bước lên lễ đường, với lời hứa sẽ đồng hành cùng nhau qua
          những ngày bình yên lẫn giông bão, giữ nhau bằng lòng tin và sự yêu
          thương.
        </p>
      </div>

      {/* Right side */}
      <div className="flex-[2] flex flex-col">
        <div style={{ height: AppSpacing.s40 }} />
        <div style={{ transform: 'translateX(-90px)' }}>
          <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F] text-right">
            Wedding
          </h2>
        </div>
        <div style={{ height: AppSpacing.s4 }} />
        <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F] text-right">
          Ceremony
        </h2>
        <div style={{ height: AppSpacing.s16 }} />
        <p className="font-sarabun italic text-[10px] leading-[1.6] text-[#565857] text-right">
          Tình yêu là hành trình trải nghiệm cùng nhau, không phải một đích
          đến.
        </p>
        <div style={{ height: AppSpacing.s36 }} />
        <OptimizedImage
          src="/assets/images/hinh_6.webp"
          alt="Ceremony 2"
          height={218}
          objectFit="cover"
          borderRadius={6}
          className="w-full"
        />
      </div>
    </div>
  );
}

