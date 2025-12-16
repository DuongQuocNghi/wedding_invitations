import 'package:flutter/material.dart';

/// Widget hỗ trợ lazy-load ảnh network với placeholder mượt mà.
///
/// Dùng để gắn các ảnh cưới/galleries mà không chặn first paint.
/// Tối ưu cho mobile web với image caching và memory optimization.
class LazyNetworkImage extends StatelessWidget {
  final String url;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  const LazyNetworkImage({
    super.key,
    required this.url,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isMobile = size.width < 600;
    // Tính toán cacheWidth để tối ưu memory trên mobile
    // Chỉ decode width cần thiết, giảm memory usage đáng kể
    // Xử lý trường hợp width có thể là double.infinity
    final effectiveWidth = (width != null && width != double.infinity)
        ? width!
        : size.width;
    // Mobile: dùng multiplier nhỏ hơn để giảm memory usage
    // Desktop: có thể dùng multiplier cao hơn vì có nhiều RAM hơn
    final cacheWidth = (effectiveWidth * (isMobile ? 1.0 : 1.5)).toInt().clamp(
      200,
      1920,
    );

    final image = Image.network(
      url,
      fit: fit,
      width: width,
      height: height,
      // Tối ưu memory trên mobile bằng cách chỉ decode width cần thiết
      cacheWidth: cacheWidth,
      // Sử dụng loadingBuilder để hiển thị placeholder mượt mà
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return _buildPlaceholder();
      },
      errorBuilder: (context, _, __) => _buildPlaceholder(
        child: const Icon(Icons.broken_image, color: Colors.white70),
      ),
    );

    if (borderRadius == null) {
      return ClipRRect(borderRadius: BorderRadius.circular(12), child: image);
    }

    return ClipRRect(
      borderRadius: borderRadius ?? BorderRadius.circular(12),
      child: image,
    );
  }

  Widget _buildPlaceholder({Widget? child}) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: const Color(0xFFD4C4B0),
        borderRadius: borderRadius ?? BorderRadius.circular(12),
      ),
      child:
          child ??
          const Center(
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white70),
            ),
          ),
    );
  }
}
