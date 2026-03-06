'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
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

export type ImageOrientation = 'portrait' | 'landscape';

type GalleryItem = {
  image: string;
  tag: string[];
  hidden: boolean;
  /** Display order: smaller value shows first. Null/undefined = use array order at end. */
  index?: number | null;
  /** Thumbnail slot shape: portrait (3:4) or landscape (4:3). Defaults to 'landscape' if omitted. */
  orientation?: ImageOrientation;
};

type GalleryDataShape = {
  data?: {
    wedding_3101?: GalleryItem[];
    pre_wedding?: GalleryItem[];
  };
};

const WEDDING_3101_ITEMS: GalleryItem[] =
  (galleryData as GalleryDataShape).data?.wedding_3101 ?? [];

const PRE_WEDDING_ITEMS: GalleryItem[] =
  (galleryData as GalleryDataShape).data?.pre_wedding ?? [];

const TABS: TabConfig[] = [
  {
    id: 'pre-wedding',
    label: 'Pre wedding',
    chips: [
      { id: 'picnic', label: 'Dã ngoại' },
      { id: 'cloud', label: 'Săn mây' },
      { id: 'vow', label: 'Tiệc Vow' },
      { id: 'night', label: 'Cắm trại đêm' }
    ],
  },
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
      { id: 'toan_canh', label: 'Toàn cảnh' },
      { id: 'hong_bang', label: 'Team Hồng Bàng' },
      { id: 'btx', label: 'Team Bùi Thị Xuân' },
      { id: 'biz4', label: 'Team Biz4' },
      { id: 'fg', label: 'Team FG' },
      { id: 'jologic', label: 'Team JL' },
      { id: 'dream', label: 'Team DreamStudio' },
      { id: 'gugotech', label: 'Team GugoTech' },
      { id: 'vio', label: 'Team Vio' },
      { id: 'gia_dinh', label: 'Gia đình' },
      { id: 'dau_re', label: 'Dâu Rễ' },
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

/** Aspect ratios for fixed thumbnail slots: portrait 3:4, landscape 4:3. Prevents layout shift. */
const ASPECT_RATIO_PORTRAIT = '3/4';
const ASPECT_RATIO_LANDSCAPE = '4/3';

function getAspectRatio(orientation: ImageOrientation): string {
  return orientation === 'portrait' ? ASPECT_RATIO_PORTRAIT : ASPECT_RATIO_LANDSCAPE;
}

function getOptimizedImageUrl(
  original: string,
  width: number,
  quality: number = 70,
): string {
  const separator = original.includes('?') ? '&' : '?';
  const transform = `tr=w-${width},q-${quality},f-webp`;
  return `${original}${separator}${transform}`;
}

/** Sort by display index (asc); items with null/undefined index go last, then by original order. */
function sortByDisplayIndex<T extends { index?: number | null }>(
  items: T[],
  originalOrder: (item: T) => number,
): T[] {
  return [...items].sort((a, b) => {
    const orderA = a.index ?? Infinity;
    const orderB = b.index ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return originalOrder(a) - originalOrder(b);
  });
}

function getImagesForChip(tabId: string, chipId: string): GalleryItem[] {
  let filtered: GalleryItem[] = [];
  let source: GalleryItem[] = [];
  if (tabId === 'pre-wedding') {
    source = PRE_WEDDING_ITEMS;
    filtered = source.filter(
      (item) => !item.hidden && item.tag.includes(chipId),
    );
  } else if (tabId === 'tiec-31-01') {
    source = WEDDING_3101_ITEMS;
    filtered = source.filter(
      (item) => !item.hidden && item.tag.includes(chipId),
    );
  }
  if (filtered.length === 0) return [];
  const indexInSource = (item: GalleryItem) => source.indexOf(item);
  return sortByDisplayIndex(filtered, indexInSource);
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const shareResetTimeoutRef = useRef<number | null>(null);
  const [loadedThumbnails, setLoadedThumbnails] = useState<
    Record<number, boolean>
  >({});
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(1);
  /** Avoid hydration mismatch: only use window-derived values after mount. */
  const [hasMounted, setHasMounted] = useState(false);
  const hasInitialScrollRef = useRef(false);
  const isUserScrollingChipsRef = useRef(false);
  const chipScrollTimeoutRef = useRef<number | null>(null);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const baseChipBarRef = useRef<HTMLDivElement | null>(null);
  const floatingChipBarRef = useRef<HTMLDivElement | null>(null);
  const baseChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const floatingChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const barRef = useRef<HTMLDivElement | null>(null);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [filterBarVisible, setFilterBarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const currentTab = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];

  /** Scroll threshold (px) before hiding/showing filter bar to avoid jitter */
  const SCROLL_DIRECTION_THRESHOLD = 48;

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

  const markUserScrollingChips = useCallback(() => {
    if (typeof window === 'undefined') return;
    isUserScrollingChipsRef.current = true;
    if (chipScrollTimeoutRef.current !== null) {
      window.clearTimeout(chipScrollTimeoutRef.current);
    }
    chipScrollTimeoutRef.current = window.setTimeout(() => {
      isUserScrollingChipsRef.current = false;
      chipScrollTimeoutRef.current = null;
    }, 300);
  }, []);

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
      const scrollY = window.scrollY;
      const isPastBar = rect.top <= 0;
      setShowFloatingBar(isPastBar);

      // Hide filter when scrolling down, show when scrolling up (only when floating bar is active)
      if (!isPastBar) {
        setFilterBarVisible(true);
        lastScrollYRef.current = scrollY;
      } else {
        const delta = scrollY - lastScrollYRef.current;
        if (delta > SCROLL_DIRECTION_THRESHOLD) {
          setFilterBarVisible(false);
          lastScrollYRef.current = scrollY;
        } else if (delta < -SCROLL_DIRECTION_THRESHOLD) {
          setFilterBarVisible(true);
          lastScrollYRef.current = scrollY;
        }
      }

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
        if (!isUserScrollingChipsRef.current) {
          scrollChipIntoView(bestChipId, 'smooth');
        }
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

  const updateUrl = useCallback(
    (tabId: string, chipId: string | null) => {
      if (typeof window === 'undefined') return;

      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      if (chipId) {
        url.searchParams.set('group', chipId);
      } else {
        url.searchParams.delete('group');
      }

      const newHref = url.toString();
      if (newHref === window.location.href) return;

      window.history.replaceState(null, '', newHref);
    },
    [],
  );

  const scrollToGroup = useCallback(
    (chipId: string, tabId?: string) => {
      const effectiveTabId = tabId ?? activeTab;
      setActiveChip(chipId);
      scrollChipIntoView(chipId);
      const el = groupRefs.current[`group-${chipId}`];
      if (el) {
        const barEl = barRef.current;
        const offset = (barEl?.offsetHeight ?? headerHeight) - 4;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'auto' });
      }
      updateUrl(effectiveTabId, chipId);
    },
    [activeTab, headerHeight, scrollChipIntoView, updateUrl],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
      setDevicePixelRatio(window.devicePixelRatio || 1);
    };

    updateViewport();
    setHasMounted(true);
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasInitialScrollRef.current) return;

    const url = new URL(window.location.href);
    const urlTab = url.searchParams.get('tab');
    const urlGroup = url.searchParams.get('group');

    let initialTabId: string | null = null;
    let initialChipId: string | null = null;

    if (urlTab) {
      const tab = TABS.find((t) => t.id === urlTab);
      if (tab) {
        initialTabId = tab.id;
        if (urlGroup) {
          const chip = tab.chips.find((c) => c.id === urlGroup);
          if (chip) {
            initialChipId = chip.id;
          }
        }
        if (!initialChipId && tab.chips[0]) {
          initialChipId = tab.chips[0].id;
        }
      }
    } else if (urlGroup) {
      const tab = TABS.find((t) =>
        t.chips.some((c) => c.id === urlGroup),
      );
      if (tab) {
        initialTabId = tab.id;
        initialChipId = urlGroup;
      }
    }

    if (initialTabId && initialChipId) {
      hasInitialScrollRef.current = true;
      setActiveTab(initialTabId);
      setActiveChip(initialChipId);
      setPendingChipScroll(initialChipId);
      updateUrl(initialTabId, initialChipId);

      const chipId = initialChipId;

      // Scroll to element position at a given moment, compensating for the sticky bar offset.
      // Does NOT change any state — safe to call multiple times.
      const scrollToTarget = () => {
        const el = groupRefs.current[`group-${chipId}`];
        if (!el) return;
        const barEl = barRef.current;
        const offset = (barEl?.offsetHeight ?? 0) - 4;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'auto' });
      };

      // Retry at increasing intervals to catch layout shifts caused by lazy-loaded images
      // in groups above the target expanding from placeholder heights to real heights.
      window.requestAnimationFrame(() => {
        scrollToTarget();
        window.setTimeout(scrollToTarget, 300);
        window.setTimeout(scrollToTarget, 800);
        window.setTimeout(scrollToTarget, 1500);
      });
    }
  }, [updateUrl]);

  const contentMaxWidth = 480;
  // Use window-derived values only after mount so server and first client render match (avoids hydration error).
  const effectiveViewportWidth = hasMounted ? viewportWidth : null;
  const effectiveDpr = hasMounted ? devicePixelRatio : 1;
  const baseWidth =
    Math.min(effectiveViewportWidth ?? contentMaxWidth, contentMaxWidth) ||
    contentMaxWidth;
  const columnGap = 8;
  const sidePadding = 8;
  const columnWidth = (baseWidth - sidePadding * 2 - columnGap) / 2;
  // Request larger thumbnails (oversample) to avoid blur on high-DPR screens,
  // then reduce quality to keep payload reasonable.
  const THUMBNAIL_OVERSAMPLE = 1.9;
  const THUMBNAIL_MIN_WIDTH = 480;
  const THUMBNAIL_MAX_WIDTH = 1400;
  const THUMBNAIL_QUALITY = 85;

  const thumbnailWidth = Math.min(
    THUMBNAIL_MAX_WIDTH,
    Math.max(
      THUMBNAIL_MIN_WIDTH,
      Math.round(columnWidth * effectiveDpr * THUMBNAIL_OVERSAMPLE),
    ),
  );

  let runningIndex = 0;
  const imagesByChip = currentTab.chips.map((chip) => {
    const images = getImagesForChip(currentTab.id, chip.id);
    const startIndex = runningIndex;
    runningIndex += images.length;
    return { chipId: chip.id, images, startIndex };
  });
  const flatImages = imagesByChip.flatMap((entry) => entry.images);
  const currentLightboxSrc =
    lightboxIndex !== null ? flatImages[lightboxIndex]?.image ?? null : null;

  const goPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null || prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null || prev >= flatImages.length - 1) return prev;
      return prev + 1;
    });
  };

  const downloadCurrentImage = useCallback(async () => {
    if (!currentLightboxSrc) return;
    setIsDownloading(true);
    try {
      const url = new URL(currentLightboxSrc, window.location.href).toString();
      const res = await fetch(url);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const pathname = new URL(url).pathname;
      const filename = pathname.split('/').filter(Boolean).pop() ?? 'image';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(currentLightboxSrc, '_blank', 'noopener,noreferrer');
    } finally {
      setIsDownloading(false);
    }
  }, [currentLightboxSrc]);

  const shareCurrentImage = useCallback(async () => {
    if (!currentLightboxSrc) return;

    const url = new URL(currentLightboxSrc, window.location.href).toString();
    const nav = navigator as Navigator & {
      share?: (data: { url?: string; title?: string; text?: string }) => Promise<void>;
    };

    try {
      if (typeof nav.share === 'function') {
        await nav.share({ url, title: 'Wedding photo' });
        return;
      }
    } catch {
      // Ignore and fall back to copy.
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      if (shareResetTimeoutRef.current !== null) {
        window.clearTimeout(shareResetTimeoutRef.current);
      }
      shareResetTimeoutRef.current = window.setTimeout(() => {
        setShareCopied(false);
        shareResetTimeoutRef.current = null;
      }, 1500);
    } catch {
      window.prompt('Copy link', url);
    }
  }, [currentLightboxSrc]);

  useEffect(() => {
    return () => {
      if (shareResetTimeoutRef.current !== null) {
        window.clearTimeout(shareResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      className="w-full bg-white"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F4F1EA 100%)',
      }}
    >
      {/* Floating bar & scroll-to-top button: chỉ hiện khi đã scroll qua vị trí thanh gốc; ẩn khi scroll xuống, hiện khi scroll lên */}
      {showFloatingBar && (
        <>
          <div
            className="fixed top-0 left-0 right-0 z-30"
            style={{
              transform: filterBarVisible
                ? 'translateY(0)'
                : 'translateY(-100%)',
              transition: 'transform 0.25s ease-out',
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm w-full min-[500px]:max-w-[480px] min-[500px]:mx-auto">
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
                      updateUrl(tab.id, firstChip.id);
                    } else {
                      updateUrl(tab.id, null);
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
            onMouseDown={markUserScrollingChips}
            onMouseUp={markUserScrollingChips}
            onMouseLeave={markUserScrollingChips}
            onTouchStart={markUserScrollingChips}
            onTouchEnd={markUserScrollingChips}
            onTouchCancel={markUserScrollingChips}
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
                    updateUrl(tab.id, firstChip.id);
                  } else {
                    updateUrl(tab.id, null);
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
          onMouseDown={markUserScrollingChips}
          onMouseUp={markUserScrollingChips}
          onMouseLeave={markUserScrollingChips}
          onTouchStart={markUserScrollingChips}
          onTouchEnd={markUserScrollingChips}
          onTouchCancel={markUserScrollingChips}
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
        {currentTab.chips.map((chip, chipIndex) => {
          const chipData = imagesByChip[chipIndex];
          const images = chipData?.images ?? [];

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
              {/* Zigzag image list: row by row; odd rows reversed so layout alternates left-right / right-left */}
              <div className="break-inside-avoid px-1 flex flex-col gap-2">
                {images.length > 0 ? (
                  (() => {
                    const rows: GalleryItem[][] = [];
                    for (let i = 0; i < images.length; i += 2) {
                      rows.push(images.slice(i, i + 2));
                    }
                    return rows.map((rowItems, rowIndex) => (
                        <div
                          key={`${chip.id}-row-${rowIndex}`}
                          className="flex gap-2"
                          style={{
                            flexDirection:
                              rowIndex % 2 === 1 ? 'row-reverse' : 'row',
                          }}
                        >
                          {rowItems.map((item, colIndex) => {
                            const index = rowIndex * 2 + colIndex;
                            const globalIndex =
                              (chipData?.startIndex ?? 0) + index;
                            const isLoaded =
                              loadedThumbnails[globalIndex];
                            const orientation: ImageOrientation =
                              item.orientation ?? 'landscape';
                            const aspectRatio =
                              getAspectRatio(orientation);

                            return (
                              <div
                                key={`${chip.id}-${index}`}
                                className="relative flex-1 min-w-0"
                                style={{
                                  overflow: 'hidden',
                                  borderRadius: 12,
                                  aspectRatio,
                                }}
                              >
                                {!isLoaded && (
                                  <div
                                    className="absolute inset-0 bg-gray-300 animate-pulse"
                                    aria-hidden
                                  />
                                )}
                                <img
                                  src={getOptimizedImageUrl(
                                    item.image,
                                    thumbnailWidth,
                                    THUMBNAIL_QUALITY,
                                  )}
                                  alt=""
                                  loading="lazy"
                                  className="absolute inset-0 rounded-[12px] cursor-zoom-in transition-opacity duration-200"
                                  style={{
                                    opacity: isLoaded ? 1 : 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                  onClick={() =>
                                    setLightboxIndex(globalIndex)
                                  }
                                  onLoad={() =>
                                    setLoadedThumbnails((prev) => ({
                                      ...prev,
                                      [globalIndex]: true,
                                    }))
                                  }
                                  onError={() =>
                                    setLoadedThumbnails((prev) => ({
                                      ...prev,
                                      [globalIndex]: true,
                                    }))
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ));
                  })()
                ) : (
                  (() => {
                      const placeholders = [
                        {
                          orientation: 'landscape' as const,
                          key: 0,
                        },
                        {
                          orientation: 'portrait' as const,
                          key: 1,
                        },
                        {
                          orientation: 'landscape' as const,
                          key: 2,
                        },
                        {
                          orientation: 'portrait' as const,
                          key: 3,
                        },
                      ];
                      const emptyRows = [
                        placeholders.slice(0, 2),
                        placeholders.slice(2, 4),
                      ];
                      return emptyRows.map((row, rowIndex) => (
                        <div
                          key={`${chip.id}-empty-row-${rowIndex}`}
                          className="flex gap-2"
                          style={{
                            flexDirection:
                              rowIndex % 2 === 1 ? 'row-reverse' : 'row',
                          }}
                        >
                          {row.map(({ orientation, key: i }) => (
                            <div
                              key={`${chip.id}-empty-${i}`}
                              className="rounded-[12px] bg-gray-400 flex-1 min-w-0"
                              style={{
                                aspectRatio: getAspectRatio(orientation),
                              }}
                            />
                          ))}
                        </div>
                      ));
                  })()
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={flatImages.map((item) => ({
          src: item.image,
        }))}
        plugins={[Zoom]}
        toolbar={{
          buttons: [
            currentLightboxSrc ? (
              <button
                key="download"
                type="button"
                className="yarl__button"
                onClick={downloadCurrentImage}
                disabled={isDownloading}
                aria-label="Download"
                title="Download"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="yarl__icon"
                >
                  <path
                    d="M12 3v10m0 0l4-4m-4 4l-4-4M5 17v3h14v-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null,
            currentLightboxSrc ? (
              <button
                key="share"
                type="button"
                className="yarl__button"
                onClick={shareCurrentImage}
                aria-label={shareCopied ? 'Copied' : 'Share'}
                title={shareCopied ? 'Copied' : 'Share'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="yarl__icon"
                >
                  <path
                    d="M12 3l4 4m0 0l-4 4m4-4h-7a4 4 0 00-4 4v6a4 4 0 004 4h6a4 4 0 004-4v-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null,
            'close',
          ],
        }}
        controller={{
          // closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
      />

    </section>
  );
}
