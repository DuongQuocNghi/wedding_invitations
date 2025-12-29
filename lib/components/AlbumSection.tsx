'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function AlbumSection() {
  return (
    <div className="w-full px-4 flex flex-col items-center">
      {/* CTA */}
      <div
        className="h-[53px] rounded-[27px] border flex items-center justify-center px-30"
        style={{
          borderColor: `${AppColors.accent}80`,
          borderWidth: 1,
        }}
      >
        <p className="font-alex-brush text-2xl leading-[0.8] text-[#5E121F]">
          Wedding Album →
        </p>
      </div>

      <div style={{ height: AppSpacing.s90 }} />

      {/* Album box */}
      <div className="flex justify-center">
        <OptimizedImage
          src="/assets/images/wedding_box.webp"
          alt="Wedding box"
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>

      <div style={{ height: AppSpacing.s150 }} />
    </div>
  );
}

