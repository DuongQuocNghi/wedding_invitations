#!/bin/bash

# Script helper để chạy local server cho wedding invitation project

PORT=8000

echo "🎉 Wedding Invitation Web Server"
echo "================================"
echo ""

# Kiểm tra Python
if command -v python3 &> /dev/null; then
    echo "✅ Tìm thấy Python 3"
    echo "🚀 Đang khởi động server tại http://localhost:$PORT"
    echo "📝 Nhấn Ctrl+C để dừng server"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "✅ Tìm thấy Python 2"
    echo "🚀 Đang khởi động server tại http://localhost:$PORT"
    echo "📝 Nhấn Ctrl+C để dừng server"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v node &> /dev/null; then
    echo "✅ Tìm thấy Node.js"
    echo "🚀 Đang khởi động server tại http://localhost:$PORT"
    echo "📝 Nhấn Ctrl+C để dừng server"
    echo ""
    npx http-server -p $PORT
else
    echo "❌ Không tìm thấy Python hoặc Node.js"
    echo ""
    echo "Vui lòng cài đặt một trong các công cụ sau:"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - Node.js: https://nodejs.org/"
    echo ""
    echo "Hoặc mở trực tiếp file index.html trong trình duyệt"
    exit 1
fi

