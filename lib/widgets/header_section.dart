import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'optimized_image.dart';

class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final screenHeight = mediaQuery.size.height;
    final headerHeight = screenHeight * 0.85;
    final svgHeight = screenHeight * 0.3;

    return RepaintBoundary(
      child: SizedBox(
        height: headerHeight,
        width: double.infinity,
        child: Stack(
          children: [
            // Background image - above the fold, load immediately
            Positioned.fill(
              child: OptimizedImage(
                imagePath: 'assets/images/hinh_1.webp',
                height: headerHeight,
                fit: BoxFit.cover,
                placeholderColor: Colors.grey[300],
                lazyLoad: false, // Critical image, load immediately
              ),
            ),
            // Overlay decoration
            Positioned(
              top: 37,
              left: 16,
              right: 16,
              child: Center(
                child: SvgPicture.asset(
                  'assets/svg/home_header.svg',
                  height: svgHeight,
                  placeholderBuilder: (_) => const SizedBox.shrink(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
