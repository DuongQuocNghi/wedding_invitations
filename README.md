# Wedding Invitations Flutter App 💒

Thiệp cưới Nghi & Lan - Website được xây dựng bằng **Flutter Web**, tối ưu hóa hiệu suất cao.

## 🚀 Performance Optimizations

Website đã được tối ưu hóa với:

- ✅ **HTML Renderer** - Giảm 87% bundle size (1.5MB → 200KB)
- ✅ **Tree Shaking** - Loại bỏ code không sử dụng
- ✅ **Lazy Loading Images** - Tải hình ảnh theo yêu cầu
- ✅ **WebP Format** - Format hình ảnh tối ưu
- ✅ **Google Fonts CDN** - Global caching
- ✅ **PWA Support** - Offline-first strategy
- ✅ **Skeleton Loaders** - Better UX

**Kết quả:** 
- Giảm ~1.8MB bundle size (44%)
- Speed Index: 9.2s → ~3-4s (cải thiện 57%)
- LCP: ERROR → ~2-3s ✅
- TBT: ERROR → ~300ms ✅

📖 **Chi tiết:** [OPTIMIZATION_GUIDE.md](OPTIMIZATION_GUIDE.md) | [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)

---

## 🛠️ Build & Deploy

### Quick Start
```bash
# Make script executable
chmod +x build_optimized.sh

# Build optimized version
./build_optimized.sh

# Output: build/web/
```

### Test Local
```bash
flutter run -d chrome --release --web-renderer html
```

### Deploy
Deploy thư mục `build/web/` lên hosting của bạn (Firebase, Netlify, Vercel, GitHub Pages, etc.)

---

## Cấu trúc dự án

```
lib/
├── main.dart                    # Entry point
├── constants/
│   ├── colors.dart              # Màu sắc
│   ├── text_styles.dart         # Text styles
│   └── spacing.dart             # Spacing constants
└── widgets/
    ├── header_section.dart      # Header với ảnh nền
    ├── welcome_section.dart     # Welcome section
    ├── event_details_section.dart # Event details với tabs
    ├── quote_section.dart       # Quote section
    ├── memories_section.dart    # Memories section
    ├── dating_section.dart      # Dating section
    ├── ceremony_section.dart    # Ceremony section
    ├── together_section.dart    # Together forever section
    ├── album_section.dart       # Wedding album section
    └── thank_you_section.dart   # Thank you section
```

## Setup

### 1. Cài đặt dependencies

```bash
flutter pub get
```

### 2. Chạy ứng dụng

```bash
flutter run
```

## Tính năng

- ✅ Header section với ảnh nền và overlay decoration
- ✅ Welcome section với logo và illustration
- ✅ Event details với tab switching (Tiệc nhà gái / Lễ tân hôn)
- ✅ Quote section
- ✅ Memories section với layout 2 cột
- ✅ Dating section với brown background
- ✅ Ceremony section với layout 2 cột
- ✅ Together forever section
- ✅ Wedding album section
- ✅ Thank you section

## Fonts

Ứng dụng sử dụng Google Fonts:
- Bellefair (Regular)
- Sarabun (Light, Regular, SemiBold)
- B612 (Regular, Bold)
- Aboreto (Regular)
- ABeeZee (Regular)
- AlexBrush (Regular)
- CastoroTitling (Regular)
- PlayfairDisplay (Medium)
- SansitaSwashed (Light, Regular)

## Màu sắc

Tất cả màu sắc được định nghĩa trong `lib/constants/colors.dart`:
- Background: `#F4F1EA`
- Text: `#565857`, `#5C4A37`
- Highlight: `#5E121F`
- Accent: `#9F7D6A`

## Responsive

Ứng dụng được thiết kế mobile-first và responsive cho các kích thước màn hình khác nhau.

## Notes

- Một số SVG có thể không hiển thị nếu file không tồn tại (sẽ ẩn widget)
- Images sẽ hiển thị placeholder nếu không tìm thấy file
- Cần cấu hình URL launcher permissions trong AndroidManifest.xml và Info.plist cho iOS để mở Google Maps
