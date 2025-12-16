import 'package:flutter/material.dart';

/// Widget hỗ trợ lazy-load ảnh network với placeholder mượt mà.
///
/// Dùng để gắn các ảnh cưới/galleries mà không chặn first paint.
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
    final image = Image.network(
      url,
      fit: fit,
      width: width,
      height: height,
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
