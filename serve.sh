#!/bin/bash

# Script helper để chạy local server cho wedding invitation project

PORT=8000

echo "🎉 Wedding Invitation Web Server"
echo "================================"
echo ""

# Kiểm tra Python 3 với custom server (khuyến nghị - không có BrokenPipeError)
if command -v python3 &> /dev/null && [ -f "server.py" ]; then
    echo "✅ Sử dụng custom Python server (không có BrokenPipeError)"
    echo ""
    python3 server.py
# Kiểm tra Python 3 với http.server mặc định
elif command -v python3 &> /dev/null; then
    echo "✅ Tìm thấy Python 3"
    echo "🚀 Đang khởi động server tại http://localhost:$PORT"
    echo "📝 Nhấn Ctrl+C để dừng server"
    echo "💡 Tip: Sử dụng server.py để tránh BrokenPipeError"
    echo ""
    python3 -m http.server $PORT 2>&1 | grep -v "BrokenPipeError" || true
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

