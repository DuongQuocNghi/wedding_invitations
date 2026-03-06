# sử dụng: python3 tool/optimize_photos.py

import os
from pathlib import Path
from PIL import Image

# ĐƯỜNG DẪN CẦN SỬA CHO PHÙ HỢP MÁY ANH
SOURCE_DIR = Path("/Users/duongquocnghi/Desktop/delete/QuocNghi&MyLan_Album/Hinh PTS")
OUTPUT_DIR = Path("/Users/duongquocnghi/Desktop/Hinh_PTS_optimized_1")

# Cấu hình tối ưu
MAX_LONG_EDGE = 3072    # px - cạnh dài nhất
JPEG_QUALITY = 90       # 0–100, 80 là điểm cân bằng đẹp/nhẹ

SUPPORTED_EXT = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def optimize_image(src_path: Path, dst_path: Path):
    dst_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src_path) as im:
        im = im.convert("RGB")  # đảm bảo format an toàn cho JPEG

        # Resize nếu ảnh quá lớn
        w, h = im.size
        long_edge = max(w, h)
        if long_edge > MAX_LONG_EDGE:
            scale = MAX_LONG_EDGE / float(long_edge)
            new_w = int(w * scale)
            new_h = int(h * scale)
            im = im.resize((new_w, new_h), Image.LANCZOS)

        # Luôn lưu dạng JPEG tối ưu
        dst_file = dst_path.with_suffix(".jpg")
        im.save(
            dst_file,
            format="JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
        print(f"✅ {src_path} -> {dst_file}")


def main():
    if not SOURCE_DIR.exists():
        print(f"Source folder không tồn tại: {SOURCE_DIR}")
        return

    print(f"Source:  {SOURCE_DIR}")
    print(f"Output:  {OUTPUT_DIR}")
    print("Bắt đầu tối ưu ảnh...\n")

    count = 0
    for root, _, files in os.walk(SOURCE_DIR):
        root_path = Path(root)
        for name in files:
            # Bỏ qua file ẩn kiểu .DS_Store, ._GIA00831.jpg, v.v.
            if name.startswith("."):
                continue

            ext = Path(name).suffix
            if ext not in SUPPORTED_EXT:
                continue

            src_path = root_path / name
            # Giữ cấu trúc thư mục con
            rel_path = src_path.relative_to(SOURCE_DIR)
            dst_path = OUTPUT_DIR / rel_path

            try:
                optimize_image(src_path, dst_path)
                count += 1
            except Exception as e:
                # Log nhẹ rồi bỏ qua file lỗi
                print(f"⚠️  Bỏ qua file lỗi {src_path}: {e}")

    print(f"\nHoàn thành. Đã xử lý {count} ảnh.")
    print(f"Ảnh tối ưu nằm trong: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()