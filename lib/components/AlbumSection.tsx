'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/lib/utils/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';
import { isBeforeTargetDate } from '@/lib/constants/events';

export function AlbumSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Xác định hình ảnh dựa trên ngày hiện tại
  // Trước 03/02/2026: wedding_box_lan.png
  // Từ 03/02/2026: wedding_box_nghi.png
  const isLan = isBeforeTargetDate();
  const imageSrc = isLan
    ? '/assets/images/wedding_box_lan.png'
    : '/assets/images/wedding_box_nghi.png';
  const qrCodeSrc = isLan
    ? '/assets/images/qr_code_Lan.png'
    : '/assets/images/qr_code_Nghi.png';
  const qrName = isLan ? 'LY MY LAN' : 'DUONG QUOC NGHI';
  const qrPhone = isLan ? '0503 1705 801' : '0411 6900 001';

  const copyPhoneNumber = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(qrPhone);
        setShowCopySuccess(true);
        setTimeout(() => {
          setShowCopySuccess(false);
        }, 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = qrPhone;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setShowCopySuccess(true);
            setTimeout(() => {
              setShowCopySuccess(false);
            }, 2000);
          }
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
  };

  const closeQRModal = () => {
    setIsQROpen(false);
    setShowCopySuccess(false);
  };

  return (
    <div className="w-full px-4 flex flex-col items-center">
      {/* CTA */}
      <div
        onClick={() => setIsVideoOpen(true)}
        className="h-[53px] w-full rounded-[27px] border flex items-center justify-center px-4 -mx-4 cursor-pointer hover:opacity-80 transition-opacity shadow-md"
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
        <div
          onClick={() => setIsQROpen(true)}
          className="cursor-pointer hover:opacity-90 transition-opacity"
        >
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
              src="/assets/videos/Nghi_Lan_08_02_2026.mp4"
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

      {/* QR Code Modal */}
      {isQROpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)' }}
          onClick={closeQRModal}
        >
          <div
            className="relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main modal container - cream/off-white background */}
            <div className="bg-[#F5F0E8] rounded-2xl p-6 shadow-2xl">
              {/* White content panel */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                {/* QR Code */}
                <div className="flex justify-center">
                  <OptimizedImage
                    src={qrCodeSrc}
                    alt="QR Code"
                    width={300}
                    height={300}
                    objectFit="contain"
                    className="w-full max-w-[300px] h-auto rounded-lg"
                    priority={true}
                    showLoadingSpinner={true}
                    spinnerColor={AppColors.accent}
                  />
                </div>

                {/* Bank name */}
                <p className="text-center font-sans text-sm text-gray-600 mb-2">
                  TPBANK
                </p>

                {/* Name */}
                <p className="text-center font-sans font-medium text-lg text-black mb-2 uppercase tracking-wide">
                  {qrName}
                </p>

                {/* Phone number with copy icon */}
                <div className="relative w-full flex items-center justify-center">
                  <span className="text-center font-sans text-base text-black inline-block">
                    {qrPhone}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyPhoneNumber();
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className={`absolute flex items-center transition-colors touch-manipulation ${
                      showCopySuccess
                        ? 'text-[#10B981]'
                        : 'text-gray-400 hover:text-gray-600 active:text-gray-700'
                    }`}
                    style={{ 
                      minWidth: '44px', 
                      minHeight: '44px', 
                      padding: '8px',
                      left: `calc(50% + ${qrPhone.length * 0.35}ch + 0.5rem)`
                    }}
                    aria-label="Copy phone number"
                  >
                    {showCopySuccess ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6667 5L7.50004 14.1667L3.33337 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 4.5V3.5C5.5 2.67157 6.17157 2 7 2H12.5C13.3284 2 14 2.67157 14 3.5V9C14 9.82843 13.3284 10.5 12.5 10.5H11.5V12.5C11.5 13.3284 10.8284 14 10 14H3.5C2.67157 14 2 13.3284 2 12.5V6C2 5.17157 2.67157 4.5 3.5 4.5H5.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={closeQRModal}
                className="w-full mt-4 py-3 rounded-xl border bg-[#F5F0E8] hover:bg-[#EBDAD0] transition-colors"
                style={{
                  borderColor: `${AppColors.accent}40`,
                  borderWidth: 1,
                }}
              >
                <p
                  className="font-sans text-base"
                  style={{ color: AppColors.textHighlight }}
                >
                  Đóng
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Success Toast Notification */}
      {showCopySuccess && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100]">
          <div className="bg-[#10B981] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-sans text-xs font-medium">
              Đã sao chép
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

