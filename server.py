#!/usr/bin/env python3
"""
Custom HTTP server that handles BrokenPipeError gracefully.
This suppresses the noisy error messages when clients disconnect early.
"""

import http.server
import socketserver
import sys
import os

PORT = 8000

class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP Request Handler that suppresses BrokenPipeError."""
    
    def log_message(self, format, *args):
        """Override to customize logging."""
        # Only log successful requests, not errors
        if '200' in format % args:
            super().log_message(format, *args)
    
    def handle_one_request(self):
        """Handle a single HTTP request, suppressing BrokenPipeError."""
        try:
            super().handle_one_request()
        except BrokenPipeError:
            # Client disconnected early, this is normal and harmless
            pass
        except OSError as e:
            # Suppress other connection-related errors
            if e.errno not in (32, 104):  # Broken pipe, Connection reset
                raise
    
    def end_headers(self):
        """Send the response headers, suppressing BrokenPipeError."""
        try:
            super().end_headers()
        except BrokenPipeError:
            # Client disconnected before headers were sent
            pass
    
    def finish(self):
        """Finish the request, suppressing BrokenPipeError."""
        try:
            super().finish()
        except (BrokenPipeError, OSError):
            # Client disconnected, ignore
            pass

def main():
    """Start the HTTP server."""
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = QuietHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("🎉 Wedding Invitation Web Server")
            print("=" * 32)
            print(f"🚀 Server đang chạy tại http://localhost:{PORT}")
            print("📝 Nhấn Ctrl+C để dừng server")
            print("")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Đã dừng server")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} đã được sử dụng. Vui lòng chọn port khác.")
            print(f"   Hoặc dừng process đang sử dụng port {PORT}")
        else:
            print(f"❌ Lỗi: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

