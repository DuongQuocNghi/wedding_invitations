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
    <div
      className="min-h-screen w-full overflow-x-hidden"
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
  );
}
