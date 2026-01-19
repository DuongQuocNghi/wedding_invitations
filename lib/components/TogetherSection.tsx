'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppSpacing } from '@/lib/constants/spacing';

interface TogetherSectionProps {
  onImageClick?: (imagePath: string) => void;
}

export function TogetherSection({ onImageClick }: TogetherSectionProps) {
  return (
    <div className="w-full px-4 pt-10 pb-15 flex gap-1 items-center">
      {/* Title */}
      <div className="w-[40%] flex flex-col justify-center">
        <div className="flex flex-col">
          <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F]">
            Together
          </h2>
          <div style={{ height: AppSpacing.s11 }} />
          <div>
            <h2 className="font-alex-brush text-[50px] leading-[0.8] text-[#5E121F]">
              Forever
            </h2>
          </div>
        </div>
        <div style={{ height: AppSpacing.s24 }} />
        {/* Text */}
        <div className="flex flex-col">
          <p className="font-sarabun font-light italic text-[12px] leading-[1.67] text-[#565857]">
            Nhà là nơi có nhau, nơi yêu thương được gìn giữ từng ngày.
          </p>
          <div style={{ height: AppSpacing.s8 }} />
          <p className="font-sarabun font-light italic text-[12px] leading-[1.67] text-[#565857]">
            Và dù con đường &apos;mãi mãi&apos; kéo dài đến đâu, anh và em vẫn
            chọn cùng nhau đi hết quãng đường ấy.
          </p>
        </div>
      </div>

      {/* Image */}
      <div 
        className="w-[60%] cursor-pointer"
        onClick={() => onImageClick?.('/assets/images/hinh_7.webp')}
      >
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

