'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function AlbumSection() {
  // Xác định hình ảnh dựa trên ngày hiện tại
  // Trước 03/02/2026: wedding_box_lan.png
  // Từ 03/02/2026: wedding_box_nghi.png
  const targetDate = new Date('2026-02-03');
  const currentDate = new Date();
  const imageSrc = currentDate < targetDate 
    ? '/assets/images/wedding_box_lan.png'
    : '/assets/images/wedding_box_nghi.png';

  return (
    <div className="w-full px-4 flex flex-col items-center">
      {/* CTA */}
      <div
        className="h-[53px] w-full rounded-[27px] border flex items-center justify-center px-4 -mx-4"
        style={{
          borderColor: `${AppColors.accent}80`,
          borderWidth: 1,
        }}
      >
        <p className="font-alex-brush text-2xl leading-[0.8] text-[#5E121F] whitespace-nowrap">
          Wedding Album{' '}
          <span className="opacity-40 font-light inline-block translate-y-1">→</span>
        </p>
      </div>

      <div style={{ height: AppSpacing.s90 }} />

      {/* Album box */}
      <div className="flex justify-center">
        <OptimizedImage
          src={imageSrc}
          alt="Wedding box"
          width={380}
          height={350}
          objectFit="contain"
          className="max-w-[500px] w-full h-auto"
        />
      </div>

    </div>
  );
}

