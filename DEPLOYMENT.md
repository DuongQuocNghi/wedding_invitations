# Hướng dẫn Deploy Website Thiệp Cưới

## 🌐 Cách 1: GitHub Pages (Khuyên dùng - Miễn phí)

### Bước 1: Khởi tạo Git repository (nếu chưa có)
```bash
git init
git add .
git commit -m "Initial commit - Wedding invitation website"
```

### Bước 2: Tạo repository trên GitHub
1. Vào https://github.com/new
2. Đặt tên repository: `wedding_invitations`
3. Chọn Public
4. KHÔNG chọn "Add README" (vì đã có rồi)
5. Click "Create repository"

### Bước 3: Push code lên GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/wedding_invitations.git
git branch -M main
git push -u origin main
```

### Bước 4: Enable GitHub Pages
1. Vào repository trên GitHub
2. Click vào tab "Settings"
3. Scroll xuống "Pages" ở sidebar bên trái
4. Ở phần "Source", chọn "GitHub Actions"
5. Workflow đã được tạo sẵn, chỉ cần đợi nó chạy

### Bước 5: Truy cập website
Sau khi build xong (khoảng 2-3 phút), website sẽ có tại:
```
https://YOUR_USERNAME.github.io/wedding_invitations/
```

---

## 🔥 Cách 2: Firebase Hosting (Nhanh & Miễn phí)

### Bước 1: Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
```

### Bước 2: Login Firebase
```bash
firebase login
```

### Bước 3: Khởi tạo Firebase project
```bash
firebase init hosting
```
Chọn:
- Create a new project hoặc chọn project có sẵn
- Public directory: `build/web`
- Single-page app: `Yes`
- Set up automatic builds: `No`

### Bước 4: Build Flutter web
```bash
flutter build web --release
```

### Bước 5: Deploy
```bash
firebase deploy --only hosting
```

Website sẽ có tại: `https://your-project-id.web.app`

---

## ⚡ Cách 3: Netlify (Đơn giản nhất)

### Bước 1: Build Flutter web
```bash
flutter build web --release
```

### Bước 2: Deploy bằng Netlify CLI
```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --dir=build/web --prod
```

Hoặc dùng Netlify Drop:
1. Vào https://app.netlify.com/drop
2. Kéo thả folder `build/web` vào
3. Website sẽ live ngay lập tức!

---

## 🚀 Cách 4: Vercel (Tự động deploy từ Git)

### Bước 1: Push code lên GitHub (như Cách 1)

### Bước 2: Import vào Vercel
1. Vào https://vercel.com
2. Click "New Project"
3. Import repository từ GitHub
4. Vercel sẽ tự động detect Flutter và build

---

## 📱 Cách 5: Ngrok (Tạm thời để test)

Nếu chỉ muốn share tạm thời để test:

```bash
# Chạy Flutter web
flutter run -d chrome --web-port 8080

# Mở terminal khác, chạy ngrok
ngrok http 8080
```

Ngrok sẽ cho bạn một URL công khai như: `https://abc123.ngrok.io`
**Lưu ý**: Link này chỉ hoạt động khi máy bạn đang chạy!

---

## 🎯 Khuyến nghị

**Dùng GitHub Pages** - Vì:
- ✅ Miễn phí 100%
- ✅ Không giới hạn băng thông
- ✅ Tự động deploy khi push code
- ✅ Có HTTPS mặc định
- ✅ Không cần cài đặt thêm tool

**Nếu muốn custom domain**:
- GitHub Pages: Hỗ trợ custom domain miễn phí
- Firebase/Netlify/Vercel: Cũng hỗ trợ custom domain miễn phí

---

## 🔧 Troubleshooting

### Lỗi fonts không load trên production
Nếu Google Fonts không load, kiểm tra file `web/index.html` đã có:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Lỗi routing trên production
Thêm vào `web/index.html` trong `<head>`:
```html
<base href="/">
```

Hoặc khi build chỉ định base-href:
```bash
flutter build web --release --base-href "/"
```

### Images không hiển thị
Kiểm tra paths trong code sử dụng `assets/` prefix

