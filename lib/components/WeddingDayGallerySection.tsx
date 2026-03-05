'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import galleryData from '../constants/galleryData.json';

type TabChip = {
  id: string;
  label: string;
};

type TabConfig = {
  id: string;
  label: string;
  chips: TabChip[];
};

type GalleryItem = {
  image: string;
  tag: string[];
  hidden: boolean;
};

const WEDDING_3101_ITEMS: GalleryItem[] =
  (galleryData as { data?: { wedding_3101?: GalleryItem[] } }).data
    ?.wedding_3101 ?? [];

const TABS: TabConfig[] = [
  {
    id: 'le-gia-tien',
    label: 'Lễ gia tiên',
    chips: [
      { id: 'le-nha-gai', label: 'Nhà gái' },
      { id: 'le-don-nha-trai', label: 'Đón nhà trai' },
      { id: 'le-nghi-thuc-hai-ho', label: 'Nghi thức hai họ' },
      { id: 'le-ruoc-dau', label: 'Rước dâu' },
    ],
  },
  {
    id: 'tiec-31-01',
    label: 'Tiệc 31.01',
    chips: [
      { id: 'tiec-toan-canh', label: 'Toàn cảnh' },
      { id: 'tiec-gia-dinh', label: 'Gia đình' },
      { id: 'tiec-team-hong-bang', label: 'Team Hồng Bàng' },
      { id: 'tiec-team-bui-thi-xuan', label: 'Team Bùi Thị Xuân' },
      { id: 'tiec-team-biz4', label: 'Team Biz4' },
      { id: 'tiec-team-fg', label: 'Team FG' },
      { id: 'tiec-team-jl', label: 'Team JL' },
      { id: 'tiec-team-dreamstudio', label: 'Team DreamStudio' },
      { id: 'tiec-team-gugotech', label: 'Team GugoTech' },
      { id: 'tiec-team-vio', label: 'Team Vio' },
    ],
  },
  {
    id: 'tan-hon-08-02',
    label: 'Tân Hôn 08.02',
    chips: [
      { id: 'tan-toan-canh', label: 'Toàn cảnh' },
      { id: 'tan-le-tan-hon', label: 'Lễ tân hôn' },
      { id: 'tan-gia-dinh-nha-gai', label: 'Gia dình nhà gái' },
      { id: 'tan-gia-dinh-nha-trai', label: 'Gia đình nhà trai' },
      { id: 'tan-ban-be', label: 'Bạn bè' },
    ],
  },
];

/** Placeholder heights for masonry-style variation (px) */
const PLACEHOLDER_HEIGHTS = [140, 180, 120, 200, 160, 220, 150, 190, 170];

const TIEC_31_01_TAG_BY_CHIP: Record<string, string | null> = {
  'tiec-toan-canh': 'toan_canh',
  'tiec-gia-dinh': 'gia_dinh',
  'tiec-team-hong-bang': 'hong_bang',
  'tiec-team-bui-thi-xuan': 'btx',
  'tiec-team-biz4': 'biz4',
  'tiec-team-fg': 'fg',
  'tiec-team-jl': 'jologic',
  'tiec-team-dreamstudio': 'dream',
  'tiec-team-gugotech': 'gugotech',
  'tiec-team-vio': 'vio',
};

function getOptimizedImageUrl(original: string, width: number): string {
  const separator = original.includes('?') ? '&' : '?';
  const transform = `tr=w-${width},q-70,f-webp`;
  return `${original}${separator}${transform}`;
}

function getImagesForChip(tabId: string, chipId: string): GalleryItem[] {
  if (tabId !== 'tiec-31-01') {
    return [];
  }

  const tagKey = TIEC_31_01_TAG_BY_CHIP[chipId];
  if (!tagKey) {
    return [];
  }

  return WEDDING_3101_ITEMS.filter(
    (item) => !item.hidden && item.tag.includes(tagKey),
  );
}

/**
 * Wedding Day gallery section: title, sticky tabs, sticky chip filters, masonry-style image groups.
 * Images are placeholders (gray, 12px radius); import later.
 */
export function WeddingDayGallerySection() {
  const [activeTab, setActiveTab] = useState<TabConfig['id']>('le-gia-tien');
  const [activeChip, setActiveChip] = useState<TabChip['id']>(
    TABS[0]?.chips[0]?.id ?? '',
  );
  const [pendingChipScroll, setPendingChipScroll] = useState<string | null>(
    null,
  );
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const baseChipBarRef = useRef<HTMLDivElement | null>(null);
  const floatingChipBarRef = useRef<HTMLDivElement | null>(null);
  const baseChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const floatingChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const barRef = useRef<HTMLDivElement | null>(null);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const currentTab = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const scrollToBarPosition = useCallback(() => {
    window.setTimeout(() => {
      if (!barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }, 1);
  }, []);

  const scrollChipIntoView = useCallback(
    (chipId: string, behavior: ScrollBehavior = 'smooth') => {
      const isFloating = showFloatingBar;
      const container = isFloating
        ? floatingChipBarRef.current
        : baseChipBarRef.current;
      const chipEl = isFloating
        ? floatingChipRefs.current[chipId]
        : baseChipRefs.current[chipId];

      if (!container || !chipEl) return;

      const containerRect = container.getBoundingClientRect();
      const chipRect = chipEl.getBoundingClientRect();
      const padding = 8; // keep 8px visual padding on both sides

      const leftOverflow = chipRect.left - (containerRect.left + padding);
      const rightOverflow = chipRect.right - (containerRect.right - padding);

      if (leftOverflow < 0) {
        container.scrollTo({
          left: container.scrollLeft + leftOverflow,
          behavior,
        });
      } else if (rightOverflow > 0) {
        container.scrollTo({
          left: container.scrollLeft + rightOverflow,
          behavior,
        });
      }
    },
    [showFloatingBar],
  );

  const scrollToGroup = useCallback(
    (chipId: string) => {
      setActiveChip(chipId);
      scrollChipIntoView(chipId);
      const el = groupRefs.current[`group-${chipId}`];
      if (el) {
        const barEl = barRef.current;
        const offset = (barEl?.offsetHeight ?? headerHeight) - 4;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [headerHeight, scrollChipIntoView],
  );

  useEffect(() => {
    const measureHeader = () => {
      if (barRef.current) {
        setHeaderHeight(barRef.current.offsetHeight);
      }
    };

    measureHeader();
    window.addEventListener('resize', measureHeader);

    const handleScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      // Khi top của thanh gốc chạm hoặc vượt lên trên đỉnh viewport thì hiển thị bản floating
      setShowFloatingBar(rect.top <= 0);

      const offsetFromTop = (barRef.current.offsetHeight || headerHeight) - 4;
      let bestChipId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      currentTab.chips.forEach((chip) => {
        const el = groupRefs.current[`group-${chip.id}`];
        if (!el) return;
        const groupRect = el.getBoundingClientRect();

        if (groupRect.bottom < offsetFromTop) return;

        const distance = Math.abs(groupRect.top - offsetFromTop);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestChipId = chip.id;
        }
      });

      if (bestChipId && bestChipId !== activeChip) {
        setActiveChip(bestChipId);
        // Dùng smooth cho auto-scroll ngang để cảm giác mượt hơn
        scrollChipIntoView(bestChipId, 'smooth');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureHeader);
    };
  }, [activeChip, headerHeight, currentTab, scrollChipIntoView]);

  useEffect(() => {
    if (!pendingChipScroll) return;

    const frame = window.requestAnimationFrame(() => {
      baseChipBarRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      floatingChipBarRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      setPendingChipScroll(null);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pendingChipScroll]);

  return (
    <section
      className="w-full bg-white"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F4F1EA 100%)',
      }}
    >
      {/* Floating bar & scroll-to-top button: chỉ hiện khi đã scroll qua vị trí thanh gốc */}
      {showFloatingBar && (
        <>
          <div
            className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm min-[500px]:left-1/2 min-[500px]:right-auto min-[500px]:w-full min-[500px]:max-w-[480px] min-[500px]:-translate-x-1/2"
          >
            {/* Event tabs: align left, 16px spacing between tabs */}
            <div className="flex justify-start gap-4 px-3 pt-4 pb-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (activeTab === tab.id) return;
                    const firstChip = tab.chips[0];
                    setActiveTab(tab.id);
                    if (firstChip) {
                      setActiveChip(firstChip.id);
                      setPendingChipScroll(firstChip.id);
                    }
                    scrollToBarPosition();
                  }}
                  className="relative pb-2 transition-colors"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '28px',
                    letterSpacing: 0,
                    color: activeTab === tab.id ? '#6f2828' : '#646464',
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 -mx-1"
                      style={{ backgroundColor: '#6f2828' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Chip filters: horizontal scroll — active #EBDAD0 + border #9F7D6A; inactive #F4F1EA + border #EBDAD0 */}
            <div
              ref={floatingChipBarRef}
              className="overflow-x-auto overflow-y-hidden hide-scrollbar px-2 py-2"
            >
              <div className="flex gap-2 min-w-max pb-1">
                {currentTab.chips.map((chip) => {
                  const isActive = activeChip === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => scrollToGroup(chip.id)}
                      ref={(el) => {
                        if (!el) return;
                        floatingChipRefs.current[chip.id] = el;
                      }}
                      className="shrink-0 rounded-[12px] py-1 px-4 border transition-colors whitespace-nowrap"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: isActive ? 500 : 400,
                        fontSize: '13px',
                        lineHeight: '28px',
                        backgroundColor: isActive ? '#F4F1EA' : 'transparent',
                        borderColor: isActive ? '#9F7D6A' : '#EBDAD0',
                        borderWidth: '1px',
                        color: '#5C4A37',
                        boxShadow: isActive
                          ? '1px 4px 6px 0 rgba(159, 125, 106, 0.12)'
                          : '1px 2px 6px 0 rgba(159, 125, 106, 0.04)',
                      }}
                    >
                      {chip.label}
                    </button>
                  );
                })}
                <div className="shrink-0 w-2" aria-hidden="true" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5E121F] shadow-[0_6px_14px_rgba(0,0,0,0.18)] border border-[#EBDAD0]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                d="M12 5L6 11M12 5l6 6M12 5v14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Title block */}
      <div className="pt-10 pb-4 px-1 text-center">
        <p
          className="uppercase"
          style={{
            fontFamily: 'Bellefair, serif',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '100%',
            letterSpacing: '0.07em',
            color: '#646464',
          }}
        >
          WEDDING
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'Ephesis, cursive',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '100%',
            letterSpacing: '0.08em',
            color: '#6f2828',
            textAlign: 'center',
          }}
        >
          Moments Gallery
        </p>
      </div>

      {/* Sticky bar: tabs + chips (ở vị trí gốc, dùng làm mốc scroll) */}
      <div ref={barRef}>
        <div className="bg-white/95 backdrop-blur-sm">
          {/* Event tabs: align left, 16px spacing between tabs */}
          <div className="flex justify-start gap-4 px-3 pt-4 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (activeTab === tab.id) return;
                  const firstChip = tab.chips[0];
                  setActiveTab(tab.id);
                  if (firstChip) {
                    setActiveChip(firstChip.id);
                    setPendingChipScroll(firstChip.id);
                  }
                  scrollToBarPosition();
                }}
                className="relative pb-2 transition-colors"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '28px',
                  letterSpacing: 0,
                  color: activeTab === tab.id ? '#6f2828' : '#646464',
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute left-0 right-0 bottom-0 h-0.5 -mx-1"
                    style={{ backgroundColor: '#6f2828' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Chip filters: horizontal scroll — active #EBDAD0 + border #9F7D6A; inactive #F4F1EA + border #EBDAD0 */}
          <div
            ref={baseChipBarRef}
            className="overflow-x-auto overflow-y-hidden hide-scrollbar px-2 py-2"
          >
            <div className="flex gap-2 min-w-max pb-1">
              {currentTab.chips.map((chip) => {
                const isActive = activeChip === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => scrollToGroup(chip.id)}
                    ref={(el) => {
                      if (!el) return;
                      baseChipRefs.current[chip.id] = el;
                    }}
                    className="shrink-0 rounded-[12px] py-1 px-4 border transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: isActive ? 500 : 400,
                      fontSize: '13px',
                      lineHeight: '28px',
                      backgroundColor: isActive ? '#F4F1EA' : 'transparent',
                      borderColor: isActive ? '#9F7D6A' : '#EBDAD0',
                      borderWidth: '1px',
                      color: '#5C4A37',
                      boxShadow: isActive
                        ? '1px 4px 6px 0 rgba(159, 125, 106, 0.12)'
                        : '1px 2px 6px 0 rgba(159, 125, 106, 0.04)',
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}
              <div className="shrink-0 w-2" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Masonry-style gallery by group (offset by fixed header height) */}
      <div className="px-1 pb-12 space-y-3">
        {currentTab.chips.map((chip) => {
          const images = getImagesForChip(currentTab.id, chip.id);

          return (
            <div
              key={chip.id}
              ref={(el) => {
                groupRefs.current[`group-${chip.id}`] = el;
              }}
              id={`group-${chip.id}`}
              className="pt-4"
            >
              {/* Group title: left-aligned */}
              <h3
                className="text-left mb-3 px-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#6f2828',
                }}
              >
                {chip.label}
              </h3>
              {/* Image list: 4px horizontal padding (50% of 8px), 8px column gap, 8px row gap */}
              <div
                className="break-inside-avoid px-1"
                style={{
                  columnCount: 2,
                  columnGap: '8px',
                }}
              >
                {images.length > 0
                  ? images.map((item, index) => (
                      <img
                        key={`${chip.id}-${index}`}
                        src={getOptimizedImageUrl(item.image, 600)}
                        alt=""
                        loading="lazy"
                        className="w-full rounded-[12px] mb-2 break-inside-avoid"
                      />
                    ))
                  : PLACEHOLDER_HEIGHTS.map((h, i) => (
                      <div
                        key={`${chip.id}-${i}`}
                        className="rounded-[12px] bg-gray-400 break-inside-avoid"
                        style={{ height: `${h}px`, marginBottom: '8px' }}
                      />
                    ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
