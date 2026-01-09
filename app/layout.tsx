import type { Metadata, Viewport } from 'next';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nghi-lan-wedding.site';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Thiệp Cưới Nghi & Lan',
  description:
    'Thiệp cưới Nghi & Lan - Mời bạn đến dự lễ cưới và tiệc cưới của chúng em. Thông tin chi tiết về địa điểm, thời gian và lời mời chân thành.',
  keywords: 'thiệp cưới, wedding invitation, Nghi Lan, lễ cưới, tiệc cưới',
  authors: [{ name: 'Nghi & Lan' }],
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'Thiệp Cưới Nghi & Lan',
    title: 'Thiệp Cưới Nghi & Lan',
    description: 'Mời bạn đến dự lễ cưới và tiệc cưới của chúng em',
    images: [
      {
        url: `${baseUrl}/assets/images/hinh_1_m.webp`,
        width: 1200,
        height: 630,
        alt: 'Thiệp Cưới Nghi & Lan',
      },
    ],
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Cưới Nghi & Lan',
    description: 'Mời bạn đến dự lễ cưới và tiệc cưới của chúng em',
    images: [`${baseUrl}/assets/images/hinh_1_m.webp`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Nghi & Lan',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#9F7D6A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Open Graph Meta Tags for Social Sharing - Hardcoded for Zalo/Facebook compatibility */}
        <meta property="og:image" content="https://nghi-lan-wedding.site/assets/images/hinh_1_m.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Thiệp Cưới Nghi & Lan" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:image" content="https://nghi-lan-wedding.site/assets/images/hinh_1_m.webp" />
        
        {/* Additional meta tags for Zalo and other platforms */}
        <meta itemProp="image" content="https://nghi-lan-wedding.site/assets/images/hinh_1_m.webp" />
        
        {/* Font preconnect and dns-prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Load fonts with display=swap for non-blocking render */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=Alex+Brush&family=Sansita+Swashed:wght@300;400&family=Bellefair&family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/assets/images/hinh_1_m.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
