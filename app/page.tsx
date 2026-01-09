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
import { AppColors } from '@/lib/constants/colors';
import { USERS } from '@/lib/constants/users';

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isThankYouPopupOpen, setIsThankYouPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ fullName: string; title: string } | null>(null);

  // Helper function to convert image path to high quality version
  const getHighQualityImage = (imagePath: string): string => {
    // Convert /assets/images/hinh_X.webp to /assets/images/high/hinh_X.webp
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

  // Check for query parameter and show thank you popup if user exists
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
    // Outer container with background color for tablet/desktop
    <div className="min-h-screen w-full bg-[#EBDAD0] relative">
      <div className="flex min-[500px]:justify-center">
        {/* Left column - Flower decorations - Fixed */}
        <div className="fixed left-0 top-0 h-screen w-[calc((100%-480px)/2)] hidden min-[500px]:block z-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Flower decoration - right bottom */}
            <div className="absolute right-0 bottom-0">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_1.svg" 
                  alt="Flower decoration" 
                  className="origin-bottom-left flex-shrink-0"
                  style={{ 
                    width: '500px', 
                    height: '300px',
                    maxWidth: '500px', 
                    maxHeight: '300px',
                    marginRight: '-120px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

            {/* Flower decoration - top right */}
            <div className="absolute right-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_2.svg" 
                  alt="Flower decoration" 
                  className="origin-top-right flex-shrink-0"
                  style={{ 
                    maxWidth: '330px', 
                    maxHeight: '230px',
                    marginRight: '-60px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle column - Main content - Scrollable */}
        <div className="w-full min-[500px]:max-w-[480px] min-[500px]:shadow-xl relative z-10 overflow-x-hidden"
          style={{ backgroundColor: AppColors.bgPrimary }}
        >
          <div className="flex flex-col min-h-screen">
            {/* Critical sections - load immediately */}
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
          </div>
        </div>

        {/* Right column - Flower decorations - Fixed */}
        <div className="fixed right-0 top-0 h-screen w-[calc((100%-480px)/2)] hidden min-[500px]:block z-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Flower decoration - top left */}
            <div className="absolute left-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_3.svg" 
                  alt="Flower decoration" 
                  className="origin-top-right flex-shrink-0"
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '300px',
                    marginLeft: '-50px'
                  }}
                />
              </div>
            </div>

            {/* Flower decoration - left bottom */}
            <div className="absolute left-0 bottom-0 -mb-[50px]">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_4.svg" 
                  alt="Flower decoration" 
                  className="origin-bottom-left flex-shrink-0"
                  style={{ 
                    maxWidth: '320px', 
                    maxHeight: '320px',
                    width: '320px', 
                    height: '320px',
                    objectFit: 'contain',
                    marginLeft: '-60px',
                    marginBottom: '-30px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        imageSrc={lightboxImage}
        onClose={closeLightbox}
      />

      {/* Thank You Popup */}
      {userInfo && (
        <ThankYouPopup
          isOpen={isThankYouPopupOpen}
          onClose={closeThankYouPopup}
          userName={userInfo.fullName}
          title={userInfo.title}
        />
      )}
    </div>
  );
}
