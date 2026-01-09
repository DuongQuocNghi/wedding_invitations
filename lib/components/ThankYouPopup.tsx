'use client';

import { useEffect, useState } from 'react';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  title: string;
}

export function ThankYouPopup({ isOpen, onClose, userName, title }: ThankYouPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.3s ease-in-out',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="relative w-full max-w-[400px] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: AppColors.bgPrimary,
          padding: `${AppSpacing.s32}px ${AppSpacing.s24}px`,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Content */}
        <div className="text-center">
          <h2
            className="font-bellefair text-3xl leading-[1.2] mb-4"
            style={{ color: AppColors.textBrown, letterSpacing: '0.06em' }}
          >
            CẢM ƠN {title.toUpperCase()} {userName.toUpperCase()}
          </h2>

          <div style={{ height: AppSpacing.s16 }} />

          <p
            className="font-sarabun font-light text-base leading-[1.67]"
            style={{ color: AppColors.textGray }}
          >
            Chúng con/em xin chân thành gửi lời cảm ơn<br />
            sự chúc phúc và tình cảm quý báu đã dành cho<br />
            chúng con/em trong ngày trọng đại này.
          </p>

          <div style={{ height: AppSpacing.s24 }} />

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md font-sarabun text-base transition-colors"
            style={{
              backgroundColor: AppColors.accent,
              color: AppColors.white,
              border: `1px solid ${AppColors.buttonBorder}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
