'use client';

import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

interface ProposalSectionProps {
  onImageClick?: (imagePath: string) => void;
}

export function ProposalSection({ onImageClick }: ProposalSectionProps) {
  return (
    <div className="w-full relative">
      {/* Brown background layer */}
      <div
        className="absolute inset-0"
        style={{
          marginTop: 32,
          marginBottom: 120,
          backgroundColor: '#9F7D6A',
        }}
      />

      {/* Main content */}
      <div className="relative flex gap-1 px-4">
        {/* Left side: Text */}
        <div className="w-[45%] flex flex-col">
          <div style={{ height: AppSpacing.s80 }} />
          <p className="font-sarabun font-light italic text-[12px] leading-[1.67] text-white pr-[4px]">
            Giây phút chiếc nhẫn chạm vào tay là hành trình mới của chúng ta
            bắt đầu. <br />Từ khoảnh khắc ấy, em, anh, không còn là hai cuộc đời
            riêng nữa.
          </p>

          {/* Date at bottom left */}
          <div style={{ height: AppSpacing.s40 }} />
          <div className="flex flex-col">
            <div style={{ transform: 'translateY(-20px)' }}>
              <p
                className="font-freeform text-[80px] leading-[0.8]"
                style={{ color: 'rgba(205, 172, 148, 0.3)' }}
              >
                28
              </p>
            </div>
            <div style={{ paddingLeft: AppSpacing.s50, transform: 'translateY(-40px)' }}>
              <p
                className="font-freeform text-[80px] leading-[0.8]"
                style={{ color: 'rgba(205, 172, 148, 0.3)' }}
              >
                04
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Image */}
        <div 
          className="w-[55%] cursor-pointer"
          onClick={() => onImageClick?.('/assets/images/hinh_4.webp')}
        >
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

