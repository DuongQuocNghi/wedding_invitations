#!/bin/bash

# Script để nén video cho web playback
# Sử dụng: ./compress_video.sh input_video.mp4 output_video.mp4

INPUT_VIDEO="${1:-public/assets/videos/nghi_lan.mp4}"
OUTPUT_VIDEO="${2:-public/assets/videos/nghi_lan_compressed.mp4}"

echo "🚀 Bắt đầu nén video..."
echo "Input: $INPUT_VIDEO"
echo "Output: $OUTPUT_VIDEO"
echo ""

# Kiểm tra ffmpeg
FFMPEG_CMD="ffmpeg"

# Kiểm tra ffmpeg trong PATH
if ! command -v ffmpeg &> /dev/null; then
    # Kiểm tra ffmpeg local trong thư mục dự án
    if [ -f "./ffmpeg" ] && [ -x "./ffmpeg" ]; then
        FFMPEG_CMD="./ffmpeg"
        echo "✅ Sử dụng ffmpeg local trong thư mục dự án"
    else
        echo "❌ ffmpeg chưa được cài đặt!"
        echo ""
        echo "📖 Hướng dẫn cài đặt ffmpeg (KHÔNG CẦN BREW):"
        echo ""
        echo "Cách 1: Tải binary build sẵn (Dễ nhất)"
        echo "  1. Truy cập: https://evermeet.cx/ffmpeg/"
        echo "  2. Tải file 'ffmpeg' về"
        echo "  3. Chạy các lệnh sau:"
        echo "     sudo mkdir -p /usr/local/bin"
        echo "     sudo cp ~/Downloads/ffmpeg /usr/local/bin/"
        echo "     sudo chmod +x /usr/local/bin/ffmpeg"
        echo ""
        echo "Hoặc tải về thư mục dự án và chạy:"
        echo "  chmod +x ffmpeg"
        echo ""
        echo "📚 Xem chi tiết trong file: INSTALL_FFMPEG.md"
        exit 1
    fi
fi

# Tùy chọn 1: H.264 với CRF (Constant Rate Factor) - Chất lượng tốt, kích thước nhỏ
# CRF 18-23: Chất lượng rất tốt (18 = tốt nhất, 23 = cân bằng)
# CRF 23-28: Chất lượng tốt (khuyến nghị cho web)
echo "📹 Đang nén với H.264 (CRF 23 - cân bằng chất lượng/kích thước)..."
$FFMPEG_CMD -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  "$OUTPUT_VIDEO" \
  -y

if [ $? -eq 0 ]; then
    INPUT_SIZE=$(du -h "$INPUT_VIDEO" | cut -f1)
    OUTPUT_SIZE=$(du -h "$OUTPUT_VIDEO" | cut -f1)
    echo ""
    echo "✅ Hoàn thành!"
    echo "Kích thước gốc: $INPUT_SIZE"
    echo "Kích thước sau nén: $OUTPUT_SIZE"
    echo ""
    echo "💡 Mẹo:"
    echo "  - Nếu muốn chất lượng cao hơn: giảm CRF xuống 20-22"
    echo "  - Nếu muốn file nhỏ hơn: tăng CRF lên 25-28"
    echo "  - Để nén nhanh hơn: đổi preset từ 'slow' sang 'medium' hoặc 'fast'"
else
    echo "❌ Lỗi khi nén video!"
    exit 1
fi

