'use client';

import { AppColors } from '@/lib/constants/colors';

/**
 * Shared shell: beige background (#EBDAD0) + left/right flower columns (fixed).
 * Only the center 480px content area is swapped when switching tabs.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#EBDAD0] relative">
      <div className="flex min-[500px]:justify-center">
        {/* Left column - Flower decorations (shared) */}
        <div className="fixed left-0 top-0 h-screen w-[calc((100%-480px)/2)] hidden min-[500px]:block z-0 pointer-events-none bg-[#EBDAD0]">
          <div className="relative w-full h-full bg-[#EBDAD0]">
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
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
            <div className="absolute right-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img
                  src="/assets/svg/flower_2.svg"
                  alt="Flower decoration"
                  className="origin-top-right flex-shrink-0"
                  style={{
                    maxWidth: '330px',
                    maxHeight: '230px',
                    marginRight: '-60px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center column - Page content (swapped per tab) */}
        <div
          className="w-full min-[500px]:max-w-[480px] min-[500px]:shadow-xl relative z-10 overflow-x-hidden"
          style={{ backgroundColor: AppColors.bgPrimary }}
        >
          <div className="flex flex-col min-h-screen">{children}</div>
        </div>

        {/* Right column - Flower decorations (shared) */}
        <div className="fixed right-0 top-0 h-screen w-[calc((100%-480px)/2)] hidden min-[500px]:block z-0 pointer-events-none bg-[#EBDAD0]">
          <div className="relative w-full h-full bg-[#EBDAD0]">
            <div className="absolute left-0 top-0">
              <div className="bg-[#EBDAD0]">
                <img
                  src="/assets/svg/flower_3.svg"
                  alt="Flower decoration"
                  className="origin-top-right flex-shrink-0"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '300px',
                    marginLeft: '-50px',
                  }}
                />
              </div>
            </div>
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
                    marginBottom: '-30px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
