import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: SizedBox(
        height: MediaQuery.of(context).size.height * 0.85,
        width: double.infinity,
        child: Stack(
          children: [
            // Background image
            Positioned.fill(
              child: Image.asset(
                'assets/images/hinh_1.webp',
                fit: BoxFit.cover,
                gaplessPlayback: true,
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
                  height: MediaQuery.of(context).size.height * 0.3,
                  placeholderBuilder: (context) => const SizedBox.shrink(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
