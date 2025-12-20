# Wedding Invitation Web - Quốc Nghi & Mỹ Lan

Website thiệp cưới được xây dựng bằng HTML/CSS/JavaScript thuần để đạt hiệu suất tối ưu và tốc độ tải nhanh.

## Tính năng

- ✨ **Hiệu suất cao**: Bundle size nhỏ (~50-200KB), tải nhanh hơn Flutter web rất nhiều
- 🎨 **100% khớp thiết kế**: Pixel-perfect với file SVG design gốc
- 📱 **Responsive**: Tối ưu cho mobile, tablet và desktop
- 🚀 **SEO friendly**: Nội dung có sẵn trong HTML
- ⚡ **First Load < 1 giây**: Tối ưu assets và CSS

## Cấu trúc dự án

```
.
├── index.html          # File HTML chính
├── styles/
│   ├── main.css        # CSS chính (variables, reset, utilities)
│   └── sections.css    # CSS cho các sections
├── scripts/
│   └── main.js         # JavaScript tối thiểu (tab switching)
├── assets/
│   ├── images/         # Hình ảnh (JPG, PNG)
│   └── svg/            # SVG files
└── README.md
```

## Cách chạy dự án

### Cách 1: Sử dụng Python (Khuyến nghị - đơn giản nhất)

```bash
# Chạy local server
python3 -m http.server 8000

# Hoặc nếu dùng Python 2
python -m SimpleHTTPServer 8000
```

Sau đó mở trình duyệt và truy cập: **http://localhost:8000**

### Cách 2: Sử dụng Node.js http-server

```bash
# Cài đặt http-server (chỉ cần 1 lần)
npm install -g http-server

# Chạy server
http-server -p 8000

# Hoặc không cần cài đặt, dùng npx
npx http-server -p 8000
```

Sau đó mở trình duyệt và truy cập: **http://localhost:8000**

### Cách 3: Sử dụng VS Code Live Server

1. Cài đặt extension "Live Server" trong VS Code
2. Click chuột phải vào file `index.html`
3. Chọn "Open with Live Server"

### Cách 4: Mở trực tiếp (Không khuyến nghị)

Có thể mở trực tiếp file `index.html` trong trình duyệt, nhưng một số tính năng có thể không hoạt động do CORS policy.

### Script helper (macOS/Linux)

Chạy script helper để tự động khởi động server:

```bash
chmod +x serve.sh
./serve.sh
```

## Deployment

### Tự động deploy với GitHub Actions + Netlify

Dự án đã được cấu hình để tự động deploy lên Netlify khi push code lên branch `main` hoặc `master`.

#### Setup ban đầu:

1. **Tạo Netlify Site:**
   - Đăng nhập vào [Netlify](https://app.netlify.com)
   - Tạo site mới (có thể bỏ qua, sẽ tự động tạo khi deploy lần đầu)

2. **Lấy Netlify Auth Token:**
   - Vào [Netlify User Settings > Applications](https://app.netlify.com/user/applications)
   - Click "New access token"
   - Copy token (chỉ hiển thị 1 lần)

3. **Lấy Site ID:**
   - Vào site settings trên Netlify
   - Copy Site ID từ "Site information"

4. **Thêm GitHub Secrets:**
   - Vào GitHub repository > Settings > Secrets and variables > Actions
   - Thêm 2 secrets:
     - `NETLIFY_AUTH_TOKEN`: Token đã lấy ở bước 2
     - `NETLIFY_SITE_ID`: Site ID đã lấy ở bước 3

5. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Setup GitHub Actions deployment"
   git push origin main
   ```

Workflow sẽ tự động chạy và deploy lên Netlify!

#### Cách hoạt động:

- **Push vào `main/master`**: Deploy production
- **Pull Request**: Deploy preview (có link preview riêng)

### Deploy thủ công

Có thể deploy lên bất kỳ static hosting nào:
- **Netlify**: Kéo thả thư mục vào Netlify hoặc dùng Netlify CLI
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Push code lên GitHub và enable Pages

## Màu sắc

- Background chính: `#F4F1EA`
- Background section: `#F5F0E8`
- Text brown: `#5C4A37`
- Text dark red: `#5E121F`
- Text gray: `#565857`
- Accent brown: `#9F7D6A`
- Background dark: `#5C4A37`

## Fonts

Sử dụng Google Fonts:
- **Bellefair**: Tiêu đề "WELCOME TO OUR"
- **Sarabun**: Text tiếng Việt (weight 300)
- **B612**: Tên và thông tin gia đình
- **Aboreto**: Text mời
- **ABeeZee**: Thông tin ngày giờ, địa điểm

## Sections

1. **Header**: Ảnh nền với logo overlay
2. **Welcome**: Giới thiệu và logo
3. **Event Details**: Thông tin tiệc cưới, gia đình, ngày giờ, địa điểm
4. **Quote**: Trích dẫn và lời cảm ơn
5. **Memories**: Khoảnh khắc đám cưới
6. **Dating**: Hành trình yêu thương
7. **Ceremony**: Lễ cưới
8. **Together Forever**: Lời hứa
9. **Wedding Album**: QR code wedding box
10. **Thank You**: Lời cảm ơn

## Tối ưu hóa

- ✅ Lazy loading cho images (trừ header image)
- ✅ Preconnect Google Fonts
- ✅ CSS được tách thành nhiều file để tối ưu
- ✅ Minimal JavaScript
- ✅ Semantic HTML cho SEO

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for wedding invitation.
