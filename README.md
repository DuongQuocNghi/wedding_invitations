# 💍 Wedding Invitations Flutter App

Ứng dụng Flutter thiệp cưới - Chuyển đổi từ website HTML/CSS/JS sang Flutter Web với hiệu suất tối ưu.

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

## 🚀 Quick Start

### Development

```bash
# Cài đặt dependencies
flutter pub get

# Chạy ứng dụng trên web
flutter run -d chrome

# Build cho production
./build_optimized.sh
```

### 🌐 Deploy Options

Bạn có 2 lựa chọn để deploy:

#### Option 1: GitHub Pages (Miễn phí, dễ setup)
1. Enable GitHub Pages trong repo settings
2. Rename file: `.github/workflows/github-pages.yml` → **deploy.yml**
3. Push code lên GitHub
4. Website sẽ live tại: `https://[username].github.io/[repo-name]/`

**Ưu điểm**: 
- ✅ Hoàn toàn miễn phí
- ✅ Tự động deploy khi push
- ✅ Không cần setup thêm

**Nhược điểm**:
- ⚠️ URL dài hơn (có repo name trong path)

#### Option 2: Netlify (Khuyên dùng)
1. Đăng ký Netlify: https://app.netlify.com/
2. Setup theo hướng dẫn: [`.github/DEPLOY_SETUP.md`](.github/DEPLOY_SETUP.md)
3. Rename file: `.github/workflows/deploy.yml` → **deploy.yml** (xóa github-pages.yml)
4. Push code lên GitHub

**Ưu điểm**:
- ✅ Custom domain miễn phí
- ✅ HTTPS tự động
- ✅ Deploy preview cho PR
- ✅ URL đẹp hơn

**Nhược điểm**:
- ⚠️ Cần setup secrets (1 lần)

📖 **Chi tiết setup**: Xem file [`.github/DEPLOY_SETUP.md`](.github/DEPLOY_SETUP.md)

## ✨ Tính Năng

### UI Components
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

### Performance Optimizations
- ⚡ Lazy loading images
- ⚡ Optimized image caching
- ⚡ CanvasKit renderer cho hiệu suất tốt
- ⚡ Minified CSS & JS
- ⚡ Render-blocking CSS đã được fix
- ⚡ WebP images cho kích thước nhỏ

## Fonts

Ứng dụng sử dụng các fonts sau (cần có trong `assets/fonts/`):
- Bellefair (Regular)
- Sarabun (Light, Regular, SemiBold)
- B612 (Regular, Bold)
- Aboreto (Regular)
- ABeeZee (Regular)
- AlexBrush (Regular)
- CastoroTitling (Regular)
- PlayfairDisplay (Medium)
- SourceSansPro (Light, Regular)

## Màu sắc

Tất cả màu sắc được định nghĩa trong `lib/constants/colors.dart`:
- Background: `#F4F1EA`
- Text: `#565857`, `#5C4A37`
- Highlight: `#5E121F`
- Accent: `#9F7D6A`

## Responsive

Ứng dụng được thiết kế mobile-first và responsive cho các kích thước màn hình khác nhau.

## 📝 Notes

- Một số SVG có thể không hiển thị nếu file không tồn tại (sẽ ẩn widget)
- Images sẽ hiển thị placeholder nếu không tìm thấy file
- Cần cấu hình URL launcher permissions trong AndroidManifest.xml và Info.plist cho iOS để mở Google Maps

## 🎯 Performance

### Current Status
- **First Contentful Paint**: 1.3s ✅
- **Cumulative Layout Shift**: 0 ✅
- **Speed Index**: Target < 3s
- **Total Size**: ~4MB (sau khi tối ưu images)

### Tối Ưu Hình Ảnh
Xem hướng dẫn chi tiết trong [`NEXT_STEPS.md`](NEXT_STEPS.md)

## 🔧 Tech Stack

- **Framework**: Flutter 3.35.1
- **Web Renderer**: CanvasKit
- **Image Format**: WebP (tối ưu cho web)
- **CI/CD**: GitHub Actions
- **Deployment**: Netlify / GitHub Pages

## 📦 Build & Deploy

### Local Build
```bash
# Build optimized
./build_optimized.sh

# Test local
cd build/web
python3 -m http.server 8000
# Mở: http://localhost:8000
```

### Automatic Deploy
Khi push code lên GitHub:
1. GitHub Actions tự động trigger
2. Flutter build web với optimizations
3. Deploy lên Netlify/GitHub Pages
4. Website live! 🎉

## 🐛 Troubleshooting

### Build lỗi trong GitHub Actions
- Kiểm tra logs trong Actions tab
- Verify Flutter version: 3.35.1
- Check pubspec.yaml có lỗi syntax không

### Images 404
- Đảm bảo files tồn tại trong `assets/images/`
- Check pubspec.yaml đã declare assets
- Rebuild: `flutter clean && flutter pub get`

### Deploy lỗi
- Netlify: Check secrets đã setup chưa
- GitHub Pages: Check Pages enabled trong settings

## 📚 Documentation

- [Deploy Setup Guide](.github/DEPLOY_SETUP.md) - Hướng dẫn setup deploy
- [Next Steps](NEXT_STEPS.md) - Các bước tối ưu tiếp theo
- [Build Script](build_optimized.sh) - Script build tối ưu

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use for your own projects!
