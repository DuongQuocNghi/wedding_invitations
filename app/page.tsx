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
                  className="w-auto h-auto origin-bottom-left"
                />
              </div>
            </div>

            {/* Flower decoration - top right */}
            <div className="absolute right-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_2.svg" 
                  alt="Flower decoration" 
                  className="w-auto h-auto origin-top-right"
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

        {/* Right column - Flower decorations - Fixed */}
        <div className="fixed right-0 top-0 h-screen w-[calc((100%-480px)/2)] hidden min-[500px]:block z-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Flower decoration - top left */}
            <div className="absolute left-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_3.svg" 
                  alt="Flower decoration" 
                  className="w-auto h-auto origin-top-right"
                />
              </div>
            </div>

            {/* Flower decoration - left bottom */}
            <div className="absolute left-0 bottom-0 -mb-[50px]">
              <div className="bg-[#EBDAD0]">
                <img 
                  src="/assets/svg/flower_4.svg" 
                  alt="Flower decoration" 
                  className="w-auto h-auto origin-bottom-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
