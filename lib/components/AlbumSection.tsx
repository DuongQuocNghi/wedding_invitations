'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

export function AlbumSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
        onClick={() => setIsVideoOpen(true)}
        className="h-[53px] w-full rounded-[27px] border flex items-center justify-center px-4 -mx-4 cursor-pointer hover:opacity-80 transition-opacity"
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

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all z-10"
              aria-label="Close video"
            >
              ×
            </button>
            <video
              src="/assets/videos/Nghi_Lan_08_02_2026.MOV"
              controls
              autoPlay
              className="max-w-full max-h-full w-auto h-auto rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

