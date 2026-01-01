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
import { AppColors } from '@/lib/constants/colors';

export default function Home() {
  return (
    // Outer container with background color for tablet/desktop
    <div className="min-h-screen w-full bg-[#EBDAD0] relative">
      
      {/* Flower decoration - left bottom, behind main frame */}
      <div className="fixed left-0 bottom-0 z-0 pointer-events-none">
        <div className="bg-[#EBDAD0]">
          <img 
            src="/assets/svg/flower_1.svg" 
            alt="Flower decoration" 
            className="w-auto h-auto max-w-[200px] sm:max-w-[300px] opacity-60 scale-80 origin-bottom-left"
          />
        </div>
      </div>

      {/* Flower decoration - top left, behind main frame */}
      <div className="fixed left-20 top-0 z-0 pointer-events-none">
        <div className="bg-[#EBDAD0]">
          <img 
            src="/assets/svg/flower_2.svg" 
            alt="Flower decoration" 
            className="w-auto h-auto max-w-[200px] sm:max-w-[300px] opacity-60 scale-80 origin-top-right"
          />
        </div>
      </div>

      {/* Flower decoration - top right, behind main frame */}
      <div className="fixed right-0 top-0 z-0 pointer-events-none">
        <div className="bg-[#EBDAD0]">
          <img 
            src="/assets/svg/flower_3.svg" 
            alt="Flower decoration" 
            className="w-auto h-auto max-w-[200px] sm:max-w-[300px] opacity-60 scale-80 origin-top-right"
          />
        </div>
      </div>

      {/* Flower decoration - right bottom, rotated 180deg, behind main frame */}
      <div className="fixed right-10 bottom-0 z-0 pointer-events-none -mb-[50px]">
        <div className="bg-[#EBDAD0]">
          <img 
            src="/assets/svg/flower_4.svg" 
            alt="Flower decoration" 
            className="w-auto h-auto max-w-[200px] sm:max-w-[300px] opacity-60  scale-80 origin-bottom-left"
          />
        </div>
      </div>

      {/* Mobile view wrapper - centered on tablet/desktop with shadow */}
      <div
        className="min-h-screen w-full overflow-x-hidden min-[500px]:max-w-[480px] min-[500px]:mx-auto min-[500px]:shadow-xl relative z-10"
        style={{ backgroundColor: AppColors.bgPrimary }}
      >
        <div className="flex flex-col">
          {/* Critical sections - load immediately */}
          <HeaderSection />
          <WelcomeSection />
          <EventDetailsSection />

          <QuoteSection />
          <MemoriesSection />
          <ProposalSection />
          <CeremonySection />
          <TogetherSection />
          <AlbumSection />
          <ThankYouSection />
        </div>
      </div>
    </div>
  );
}
