import 'package:flutter/material.dart';

/// Optimized image widget for better performance
/// Uses proper caching and loading states
class OptimizedImage extends StatelessWidget {
  final String imagePath;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final Color? placeholderColor;

  const OptimizedImage({
    super.key,
    required this.imagePath,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.placeholderColor,
  });

  @override
  Widget build(BuildContext context) {
    final devicePixelRatio = MediaQuery.of(context).devicePixelRatio;
    // Only calculate cache dimensions if width/height are finite numbers
    final cacheWidth = width != null && width!.isFinite
        ? (width! * devicePixelRatio).round()
        : null;
    final cacheHeight = height != null && height!.isFinite
        ? (height! * devicePixelRatio).round()
        : null;

    Widget image = Image.asset(
      imagePath,
      width: width,
      height: height,
      fit: fit,
      gaplessPlayback: true,
      cacheWidth: cacheWidth,
      cacheHeight: cacheHeight,
      errorBuilder: (context, error, stackTrace) => Container(
        width: width,
        height: height,
        color: placeholderColor ?? Colors.grey[300],
        child: const Icon(Icons.broken_image, color: Colors.grey),
      ),
      // Note: loadingBuilder is only available for Image.network, not Image.asset
      // Asset images load synchronously in Flutter, so no loading state needed
    );

    if (borderRadius != null) {
      image = ClipRRect(borderRadius: borderRadius!, child: image);
    }

    return image;
  }
}
