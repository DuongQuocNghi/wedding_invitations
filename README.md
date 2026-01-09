# Wedding Invitations Next.js App 💒 

Thiệp cưới Nghi & Lan - Website được xây dựng bằng **Next.js 16** với TypeScript và Tailwind CSS.

## 🚀 Features

- ✅ **Next.js 16** với App Router
- ✅ **TypeScript** cho type safety
- ✅ **Tailwind CSS** cho styling
- ✅ **Image Optimization** với Next.js Image component
- ✅ **Lazy Loading** cho sections và images
- ✅ **SEO Optimized** với metadata
- ✅ **Responsive Design** mobile-first
- ✅ **Performance Optimized** với code splitting

## 📁 Cấu trúc dự án

```
lib/
├── constants/
│   ├── colors.ts          # Màu sắc
│   └── spacing.ts          # Spacing constants
├── components/
│   ├── HeaderSection.tsx
│   ├── WelcomeSection.tsx
│   ├── EventDetailsSection.tsx
│   ├── QuoteSection.tsx
│   ├── MemoriesSection.tsx
│   ├── DatingSection.tsx
│   ├── CeremonySection.tsx
│   ├── TogetherSection.tsx
│   ├── AlbumSection.tsx
│   └── ThankYouSection.tsx
└── utils/
    └── image.tsx           # OptimizedImage component

app/
├── layout.tsx              # Root layout với metadata
├── page.tsx                # Main page với lazy loading
└── globals.css             # Global styles và fonts

public/
└── assets/
    ├── images/             # WebP images
    └── svg/                # SVG files
```

## 🛠️ Setup

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

### 3. Build cho production

```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- Background: `#F4F1EA`, `#F5F0E8`, `#5C4A37`
- Text: `#565857`, `#5C4A37`, `#8B1A1A`, `#5E121F`
- Accent: `#9F7D6A`
- Link: `#5054D3`

### Fonts
- **Sarabun**: Main font (Light, Regular, Medium, SemiBold, Bold)
- **Alex Brush**: Section titles
- **Sansita Swashed**: Event details, tabs

### Spacing
Hệ thống spacing từ 4px đến 150px được định nghĩa trong `lib/constants/spacing.ts`.

## ⚡ Performance Optimizations

1. **Lazy Loading Sections**: Sections được load progressive với delays
2. **Image Optimization**: Next.js Image component với lazy loading và WebP format
3. **Code Splitting**: Automatic với Next.js App Router
4. **Font Optimization**: Google Fonts với preconnect
5. **SEO**: Metadata và Open Graph tags

## 📱 Responsive

Ứng dụng được thiết kế mobile-first và responsive cho các kích thước màn hình khác nhau.

## 🔧 Tech Stack

- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Next/Image** - Image optimization

## 📝 Notes

- Images sử dụng WebP format cho tối ưu performance
- SVG files được load trực tiếp (không qua Next.js Image)
- Lazy loading được implement cho cả sections và images
- Metadata được cấu hình đầy đủ cho SEO

## 🚀 Deploy

Deploy lên Vercel, Netlify, hoặc bất kỳ platform nào hỗ trợ Next.js:

```bash
npm run build
```

Output sẽ ở thư mục `.next/` và có thể deploy trực tiếp.
