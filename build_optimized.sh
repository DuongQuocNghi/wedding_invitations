#!/bin/bash

# Build script for optimized Flutter web deployment
# This script builds the app with all performance optimizations enabled

set -e  # Exit on any error (except where explicitly handled)

echo "🚀 Building optimized Flutter web app..."

# Clean previous build
echo "📦 Cleaning previous build..."
flutter clean || echo "⚠️  Clean failed, continuing..."  # Continue even if clean fails

# Get dependencies
echo "📥 Getting dependencies..."
flutter pub get

# Build for web with optimizations
echo "🔨 Building web app with optimizations..."
echo "   - Flutter auto-selects optimal renderer (CanvasKit in 3.35.1+)"
echo "   - Maximum optimization level (O4) - smallest & fastest code"
echo "   - Tree shaking enabled - removes unused code & icons"
echo "   - Source maps disabled - reduces bundle size"
echo "   - Minification enabled - compresses code"
echo ""

# Build for web - using performance optimization flags
# Note: --web-renderer flag is deprecated/removed in Flutter 3.35.1+
# Flutter will automatically choose the optimal renderer (CanvasKit in 3.35.1+)
echo "Running flutter build web with optimizations..."
set +e  # Temporarily disable exit on error
flutter build web \
  --release \
  --base-href="/" \
  --tree-shake-icons \
  --optimization-level=4 \
  --no-source-maps
BUILD_EXIT_CODE=$?
set -e  # Re-enable exit on error

if [ $BUILD_EXIT_CODE -ne 0 ]; then
  echo "❌ Build failed with exit code: $BUILD_EXIT_CODE"
  exit 1
fi

# Verify build output
if [ ! -d "build/web" ]; then
  echo "❌ Error: build/web directory not found after build!"
  exit 1
fi

if [ ! -f "build/web/index.html" ]; then
  echo "❌ Error: build/web/index.html not found after build!"
  exit 1
fi

echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Build output: build/web/"
echo "📏 Bundle size optimizations:"
echo "   ✓ Flutter auto-selects optimal renderer (CanvasKit in 3.35.1+)"
echo "   ✓ Maximum optimization level (O4) - smallest bundle"
echo "   ✓ Tree shaking enabled (removes unused code)"
echo "   ✓ Icon tree shaking (removes unused Material icons - 99%+ reduction)"
echo "   ✓ Source maps disabled (reduces bundle size 10-20%)"
echo "   ✓ Minification enabled (release mode)"
echo ""
echo "💡 Performance optimizations:"
echo "   - Tree shaking reduces bundle size significantly"
echo "   - Minification compresses code"
echo "   - Lazy loading for images"
echo "   - Optimized asset delivery"
echo ""
echo "🔍 To analyze performance:"
echo "   - Run: flutter run -d chrome --release"
echo "   - Or deploy and test with PageSpeed Insights"
echo ""
echo "ℹ️  Note: Flutter automatically selects the optimal renderer"

