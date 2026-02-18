'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_BG = '#f5f2ed';
const ACTIVE_COLOR = '#6f2828';
const INACTIVE_COLOR = '#646464';

export function NavHeader() {
  const pathname = usePathname();
  const isWeddingDay = pathname === '/';
  const isPreWedding = pathname === '/pre-wedding';

  return (
    <header
      className="w-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      style={{ backgroundColor: NAV_BG }}
    >
      <nav className="flex items-center justify-between px-6 h-[60px] max-w-[480px] mx-auto">
        <Link
          href="/"
          className="flex-1 flex justify-center items-end pb-1 h-full"
          style={{
            color: isWeddingDay ? ACTIVE_COLOR : INACTIVE_COLOR,
            textDecoration: 'none',
            borderBottom: isWeddingDay ? `2px solid ${ACTIVE_COLOR}` : '2px solid transparent',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          <span>Wedding Day</span>
        </Link>

        <div className="flex-shrink-0 px-4 flex items-center justify-center">
          <Image
            src="/assets/svg/NL_tab.svg"
            alt="NL"
            width={42}
            height={50}
            className="w-[42px] h-auto"
            style={{ color: '#a58869' }}
          />
        </div>

        <Link
          href="/pre-wedding"
          className="flex-1 flex justify-center items-end pb-1 h-full"
          style={{
            color: isPreWedding ? ACTIVE_COLOR : INACTIVE_COLOR,
            textDecoration: 'none',
            borderBottom: isPreWedding ? `2px solid ${ACTIVE_COLOR}` : '2px solid transparent',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          <span>Pre-Wedding</span>
        </Link>
      </nav>
    </header>
  );
}
