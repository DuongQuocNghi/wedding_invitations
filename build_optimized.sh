#!/bin/bash

# Build script for optimized Flutter web deployment
# This script builds the app with all performance optimizations enabled

echo "🚀 Building optimized Flutter web app..."

# Clean previous build
echo "📦 Cleaning previous build..."
flutter clean

# Get dependencies
echo "📥 Getting dependencies..."
flutter pub get

# Build for web with optimizations
echo "🔨 Building web app with optimizations..."
flutter build web \
  --release \
  --base-href="/" \
  --source-maps \
  --web-renderer canvaskit

echo "✅ Build complete!"
echo ""
echo "📊 Build output: build/web/"
echo ""
echo "💡 Performance tips:"
echo "   - CSS and JS are automatically minified in release mode"
echo "   - CanvasKit renderer provides better performance on modern browsers"
echo "   - Source maps are generated for debugging"
echo "   - Images should be optimized before deployment (< 500KB each)"
echo "   - Consider using a CDN for static assets"
echo ""
echo "🔍 To analyze performance:"
echo "   - Run: flutter run -d chrome --release"
echo "   - Or deploy and test with PageSpeed Insights"

