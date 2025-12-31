'use client';

import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function QuoteSection() {
  return (
    <div
      className="w-full px-4 py-9"
      style={{ backgroundColor: AppColors.accent }}
    >
      <p className="text-center font-sarabun font-semibold text-base leading-[1.2] text-white">
        &quot;Tình yêu trở nên trọn vẹn hơn khi <br />được sẻ chia cùng những người ta
        trân quý.&quot;
      </p>
      <div style={{ height: AppSpacing.s16 }} />
      <p className="text-center font-sarabun font-light text-sm leading-[1.2] text-white opacity-80">
        Sự hiện diện và những lời chúc tốt đẹp của <br />cô chú/anh chị sẽ là niềm
        vinh hạnh, góp phần làm <br />ngày trọng đại của chúng con/em thêm ý nghĩa.
      </p>
    </div>
  );
}

