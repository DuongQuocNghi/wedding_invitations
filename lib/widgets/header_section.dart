import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.85,
      width: double.infinity,
      child: Stack(
        children: [
          // Background image
          Image.asset(
            'assets/images/hinh_1.webp',
            width: double.infinity,
            height: double.infinity,
            fit: BoxFit.cover,
            errorBuilder: (context, error, stackTrace) {
              return Container(
                color: Colors.grey[300],
                child: const Center(child: Text('Image not found')),
              );
            },
          ),
          // Overlay decoration
          Positioned(
            top: 37,
            left: 0,
            right: 0,
            child: Center(
              child: SvgPicture.asset(
                'assets/svg/home_header.svg',
                width: 200,
                height: 100,
                placeholderBuilder: (context) => const SizedBox.shrink(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

