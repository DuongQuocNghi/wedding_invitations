'use client';

import { WeddingDayHeroSection } from '@/lib/components/WeddingDayHeroSection';
import { WeddingDayVideoSection } from '@/lib/components/WeddingDayVideoSection';
import { WeddingDayGallerySection } from '@/lib/components/WeddingDayGallerySection';

/**
 * Wedding Day page - main tab content.
 * Renders only the center column content; shell (beige + flowers) is in AppShell.
 */
export default function WeddingDayPage() {
  return (
    <div className="flex flex-col flex-1">
      <WeddingDayHeroSection />
      <WeddingDayVideoSection />
      <WeddingDayGallerySection />
    </div>
  );
}
