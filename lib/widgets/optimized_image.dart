import 'package:flutter/material.dart';
import 'skeleton_loader.dart';

/// Optimized image widget for better performance
/// Uses proper caching, loading states, and lazy loading
class OptimizedImage extends StatefulWidget {
  final String imagePath;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final Color? placeholderColor;
  final bool lazyLoad;

  const OptimizedImage({
    super.key,
    required this.imagePath,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.placeholderColor,
    this.lazyLoad = true,
  });

  @override
  State<OptimizedImage> createState() => _OptimizedImageState();
}

class _OptimizedImageState extends State<OptimizedImage> {
  bool _isVisible = false;
  final _key = GlobalKey();

  @override
  void initState() {
    super.initState();
    if (!widget.lazyLoad) {
      // Load immediately if not lazy loading
      _isVisible = true;
    } else {
      // For lazy loading, check visibility after first frame
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkVisibility();
      });
      // Fallback: load image after 1 second if still not visible
      // This ensures images will eventually load even if visibility check fails
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted && !_isVisible) {
          setState(() {
            _isVisible = true;
          });
        }
      });
    }
  }

  void _checkVisibility() {
    if (!mounted || _isVisible) return;
    
    try {
      final RenderObject? renderObject = _key.currentContext?.findRenderObject();
      if (renderObject != null && renderObject is RenderBox) {
        final position = renderObject.localToGlobal(Offset.zero);
        final size = renderObject.size;
        final screenHeight = MediaQuery.of(context).size.height;
        
        // Load if image is within 2 screen heights of viewport
        // This ensures images load before user scrolls to them
        if (position.dy < screenHeight * 2 && position.dy + size.height > -screenHeight) {
          if (mounted) {
            setState(() {
              _isVisible = true;
            });
          }
        } else {
          // If not visible yet, check again after a delay
          Future.delayed(const Duration(milliseconds: 200), () {
            if (mounted && !_isVisible) {
              _checkVisibility();
            }
          });
        }
      } else {
        // If render object not available yet, try again after a delay
        Future.delayed(const Duration(milliseconds: 100), () {
          if (mounted && !_isVisible) {
            _checkVisibility();
          }
        });
      }
    } catch (e) {
      // If visibility check fails, load image anyway to prevent blank spaces
      if (mounted) {
        setState(() {
          _isVisible = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      key: _key,
      width: widget.width,
      height: widget.height,
      decoration: widget.borderRadius != null
          ? BoxDecoration(
              borderRadius: widget.borderRadius,
              color: widget.placeholderColor ?? Colors.grey[200],
            )
          : null,
      child: _isVisible ? _buildImage() : _buildPlaceholder(),
    );
  }

  Widget _buildImage() {
    final devicePixelRatio = MediaQuery.of(context).devicePixelRatio;
    // Only calculate cache dimensions if width/height are finite numbers
    // Limit cache size to reasonable dimensions to reduce memory usage
    final maxCacheDimension = 2048; // Max 2K resolution
    final cacheWidth = widget.width != null && widget.width!.isFinite
        ? ((widget.width! * devicePixelRatio).round()).clamp(0, maxCacheDimension)
        : null;
    final cacheHeight = widget.height != null && widget.height!.isFinite
        ? ((widget.height! * devicePixelRatio).round()).clamp(0, maxCacheDimension)
        : null;

    Widget image = Image.asset(
      widget.imagePath,
      width: widget.width,
      height: widget.height,
      fit: widget.fit,
      gaplessPlayback: true,
      cacheWidth: cacheWidth,
      cacheHeight: cacheHeight,
      errorBuilder: (context, error, stackTrace) => Container(
        width: widget.width,
        height: widget.height,
        color: widget.placeholderColor ?? Colors.grey[300],
        child: const Icon(Icons.broken_image, color: Colors.grey),
      ),
      // Use frameBuilder for smooth loading
      frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
        if (wasSynchronouslyLoaded) return child;
        return AnimatedOpacity(
          opacity: frame == null ? 0 : 1,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
          child: child,
        );
      },
    );

    if (widget.borderRadius != null) {
      image = ClipRRect(borderRadius: widget.borderRadius!, child: image);
    }

    return image;
  }

  Widget _buildPlaceholder() {
    // Use skeleton loader for better perceived performance
    if (widget.borderRadius != null) {
      return SkeletonLoader(
        width: widget.width,
        height: widget.height,
        borderRadius: widget.borderRadius!.topLeft.x,
      );
    }
    
    return Container(
      width: widget.width,
      height: widget.height,
      color: widget.placeholderColor ?? Colors.grey[200],
    );
  }
}
