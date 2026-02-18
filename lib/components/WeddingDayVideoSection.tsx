'use client';

import { useState } from 'react';
import { AppColors } from '@/lib/constants/colors';

/**
 * Wedding Day section 2: video block on white gradient background.
 * Video has 8px horizontal padding; styling follows AlbumSection (rounded, play button, modal).
 */
export function WeddingDayVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section
      className="w-full pt-[80px] pb-[80px]"
      style={{
        background: 'linear-gradient(to bottom, #F4F1EA 0%, #FFFFFF 100%)',
      }}
    >
      {/* Video: only 8px padding on left/right */}
      <div className="w-full px-2 flex flex-col items-center">
        <div
          onClick={() => setIsVideoOpen(true)}
          className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <video
            poster="/assets/images/wedding_video_poster_2.webp"
            preload="metadata"
            className="w-full h-full object-cover"
            muted
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5.14v13.72L19 12L8 5.14z"
                  fill={AppColors.accent}
                  stroke={AppColors.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 bg-black text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all z-10"
              style={{ paddingBottom: 5 }}
              aria-label="Close video"
            >
              ×
            </button>
            <video
              src="/assets/videos/Nghi_Lan_08_02_2026.mp4"
              poster="/assets/images/wedding_video_poster_2.webp"
              controls
              autoPlay
              preload="metadata"
              className="max-w-full max-h-full w-auto h-auto rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
