# Hướng dẫn Download Google Fonts

Để self-host các Google Fonts, bạn có 2 cách:

## Cách 1: Sử dụng google-webfonts-helper.com (Khuyến nghị - Dễ nhất)

1. Truy cập: https://google-webfonts-helper.herokuapp.com/fonts

2. Tìm và chọn từng font sau, chọn các weights cần thiết:
   - **Bellefair**: Regular (400)
   - **Sarabun**: Light (300), Regular (400), SemiBold (600)
   - **B612**: Regular (400), Medium (500)
   - **Aboreto**: Regular (400)
   - **ABeeZee**: Regular (400)
   - **Alex Brush**: Regular (400)
   - **Castoro Titling**: Regular (400)
   - **Playfair Display**: Medium (500)
   - **Source Sans Pro**: Light (300), Regular (400)

3. Cho mỗi font:
   - Chọn subset: **latin** (và **vietnamese** cho Sarabun)
   - Copy CSS code và paste vào `styles/fonts.css`
   - Download font files (WOFF2 format) vào thư mục `assets/fonts/`

4. Đảm bảo đường dẫn trong `fonts.css` đúng với tên file đã download

## Cách 2: Sử dụng Script Python

1. Cài đặt dependencies:
```bash
pip install requests
```

2. Chạy script:
```bash
python3 download_fonts.py
```

**Lưu ý**: Script này có thể cần điều chỉnh tên file sau khi download để match với `fonts.css`

## Sau khi download fonts:

1. Đảm bảo tất cả font files (.woff2) nằm trong `assets/fonts/`

2. Kiểm tra file `styles/fonts.css` có đường dẫn đúng tên file

3. Test website để đảm bảo fonts hiển thị đúng

## Kiểm tra:

Sau khi download, kiểm tra các file sau có tồn tại:
- `assets/fonts/Bellefair-Regular.woff2`
- `assets/fonts/Sarabun-Light.woff2`
- `assets/fonts/Sarabun-Regular.woff2`
- `assets/fonts/Sarabun-SemiBold.woff2`
- `assets/fonts/B612-Regular.woff2`
- `assets/fonts/B612-Medium.woff2`
- `assets/fonts/Aboreto-Regular.woff2`
- `assets/fonts/ABeeZee-Regular.woff2`
- `assets/fonts/AlexBrush-Regular.woff2` (hoặc Alex-Brush-Regular.woff2)
- `assets/fonts/CastoroTitling-Regular.woff2`
- `assets/fonts/PlayfairDisplay-Medium.woff2`
- `assets/fonts/SourceSansPro-Light.woff2`
- `assets/fonts/SourceSansPro-Regular.woff2`

