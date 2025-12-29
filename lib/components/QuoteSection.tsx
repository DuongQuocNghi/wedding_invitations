'use client';

import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function QuoteSection() {
  return (
    <div
      className="w-full px-4 py-9"
      style={{ backgroundColor: AppColors.accent }}
    >
      <p className="text-center font-sarabun italic text-xs leading-[1.67] text-white">
        &quot;Tình yêu trở nên trọn vẹn hơn khi được sẻ chia cùng những người ta
        trân quý.&quot;
      </p>
      <div style={{ height: AppSpacing.s8 }} />
      <p className="text-center font-sarabun font-light text-[10px] leading-[1.6] text-white">
        Sự hiện diện và những lời chúc tốt đẹp của cô chú/anh chị sẽ là niềm
        vinh hạnh, góp phần làm ngày trọng đại của chúng con/em thêm ý nghĩa.
      </p>
    </div>
  );
}

