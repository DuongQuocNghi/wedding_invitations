'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppSpacing } from '@/lib/constants/spacing';

export function TogetherSection() {
  return (
    <div className="w-full px-4 py-10 flex gap-1">
      {/* Title */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col">
          <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F]">
            Together
          </h2>
          <div style={{ height: AppSpacing.s11 }} />
          <div style={{ paddingLeft: AppSpacing.s40 }}>
            <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F]">
              Forever
            </h2>
          </div>
        </div>
        <div style={{ height: AppSpacing.s24 }} />
        {/* Text */}
        <div className="flex flex-col">
          <p className="font-sarabun italic text-[10px] leading-[1.6] text-[#565857] text-left">
            Nhà là nơi có nhau, nơi yêu thương được gìn giữ từng ngày.
          </p>
          <div style={{ height: AppSpacing.s8 }} />
          <p className="font-sarabun italic text-[10px] leading-[1.6] text-[#565857] text-left">
            Và dù con đường &apos;mãi mãi&apos; kéo dài đến đâu, anh và em vẫn
            chọn cùng nhau đi hết quãng đường ấy.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1">
        <OptimizedImage
          src="/assets/images/hinh_7.webp"
          alt="Together"
          height={321}
          objectFit="cover"
          borderRadius={6}
          className="w-full"
        />
      </div>
    </div>
  );
}

