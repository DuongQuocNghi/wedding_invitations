'use client';

import { useState, useEffect } from 'react';
import { HeaderSection } from '@/lib/components/HeaderSection';
import { WelcomeSection } from '@/lib/components/WelcomeSection';
import { EventDetailsSection } from '@/lib/components/EventDetailsSection';
import { QuoteSection } from '@/lib/components/QuoteSection';
import { MemoriesSection } from '@/lib/components/MemoriesSection';
import { ProposalSection } from '@/lib/components/ProposalSection';
import { CeremonySection } from '@/lib/components/CeremonySection';
import { TogetherSection } from '@/lib/components/TogetherSection';
import { AlbumSection } from '@/lib/components/AlbumSection';
import { ThankYouSection } from '@/lib/components/ThankYouSection';
import { ThankYouPopup } from '@/lib/components/ThankYouPopup';
import { ImageLightbox } from '@/lib/components/ImageLightbox';
import { USERS } from '@/lib/constants/users';

/**
 * Pre-Wedding page - only center column content; shell (beige + flowers) is in AppShell.
 */
export default function PreWeddingPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isThankYouPopupOpen, setIsThankYouPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ fullName: string; title: string } | null>(null);

  const getHighQualityImage = (imagePath: string): string => {
    if (imagePath.includes('/assets/images/hinh_')) {
      return imagePath.replace('/assets/images/hinh_', '/assets/images/high/hinh_');
    }
    return imagePath;
  };

  const openLightbox = (imagePath: string) => {
    const highQualityPath = getHighQualityImage(imagePath);
    setLightboxImage(highQualityPath);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userValue = urlParams.get('v');
      if (userValue && USERS[userValue as keyof typeof USERS]) {
        const user = USERS[userValue as keyof typeof USERS];
        setUserInfo({
          fullName: user.fullName,
          title: user.title,
        });
        setIsThankYouPopupOpen(true);
      }
    }
  }, []);

  const closeThankYouPopup = () => {
    setIsThankYouPopupOpen(false);
  };

  return (
    <>
      <HeaderSection onImageClick={openLightbox} />
      <WelcomeSection />
      <EventDetailsSection />
      <QuoteSection />
      <MemoriesSection onImageClick={openLightbox} />
      <ProposalSection onImageClick={openLightbox} />
      <CeremonySection onImageClick={openLightbox} />
      <TogetherSection onImageClick={openLightbox} />
      <AlbumSection />
      <ThankYouSection onImageClick={openLightbox} />

      <ImageLightbox
        isOpen={isLightboxOpen}
        imageSrc={lightboxImage}
        onClose={closeLightbox}
      />

      {userInfo && (
        <ThankYouPopup
          isOpen={isThankYouPopupOpen}
          onClose={closeThankYouPopup}
          userName={userInfo.fullName}
          title={userInfo.title}
        />
      )}
    </>
  );
}
