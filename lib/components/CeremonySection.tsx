'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppSpacing } from '@/lib/constants/spacing';

export function CeremonySection() {
  return (
    <div className="w-full px-4 flex gap-1">
      {/* Left side */}
      <div className="w-[55%] flex flex-col">
        <div style={{ height: AppSpacing.s90 }} />
        <div className="aspect-square w-full relative">
          <OptimizedImage
            src="/assets/images/hinh_5.png"
            alt="Ceremony 1"
            fill
            objectFit="cover"
            borderRadius={6}
            className="w-full h-full"
          />
        </div>
        <div style={{ height: AppSpacing.s36 }} />
        <p className="font-sarabun font-light italic text-[12px] leading-[1.67] text-[#565857] pr-[4px]">
          Nắm tay nhau bước lên lễ đường, với lời hứa sẽ đồng hành cùng nhau qua
          những ngày bình yên lẫn giông bão, giữ nhau bằng lòng tin và sự yêu
          thương.
        </p>
      </div>

      {/* Right side */}
      <div className="w-[45%] flex flex-col">
        <div style={{ height: AppSpacing.s40 }} />
        <div style={{ transform: 'translateX(-80px)' }}>
          <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F] text-right">
            Wedding
          </h2>
        </div>
        <div style={{ height: AppSpacing.s4 }} />
        <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F] text-right" style={{ transform: 'translateX(10px)' }}>
          Ceremony
        </h2>
        <div style={{ height: AppSpacing.s16 }} />
        <p className="font-sarabun font-light italic text-[12px] leading-[1.67] text-[#565857] text-right pr-[4px]">
          Tình yêu là hành trình trải nghiệm cùng nhau,<br />không phải một đích
          đến.
        </p>
        <div style={{ height: AppSpacing.s36 }} />
        <OptimizedImage
          src="/assets/images/hinh_6.png"
          alt="Ceremony 2"
          height={290}
          objectFit="cover"
          borderRadius={6}
          className="w-full"
        />
      </div>
    </div>
  );
}

