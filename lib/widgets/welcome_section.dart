import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import 'optimized_image.dart';

class WelcomeSection extends StatelessWidget {
  const WelcomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
        child: Column(
          children: [
            const SizedBox(height: AppSpacing.s50),
            // Title
            Text(
              'WELCOME TO OUR',
              style: AppTextStyles.welcomeTitle,
              textAlign: TextAlign.center,
            ),
            // Love story SVG
            SvgPicture.asset(
              'assets/svg/love_story.svg',
              height: 50,
              placeholderBuilder: (_) => const SizedBox.shrink(),
            ),
            const SizedBox(height: AppSpacing.s16),
            // Welcome text
            Text(
              'Chào mừng đến với khoảnh khắc mở ra cột mốc mới trong câu\n'
              'chuyện tình yêu của chúng em, nơi hành trình mới\n'
              'bên nhau bắt đầu.',
              style: AppTextStyles.welcomeText,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppSpacing.s30),
            // Logo
            SvgPicture.asset('assets/svg/NL_logo.svg', height: 135),
            const SizedBox(height: AppSpacing.s30),
            // Illustration - above the fold, load immediately
            OptimizedImage(
              imagePath: 'assets/images/NL_draw.webp',
              height: 110,
              placeholderColor: Colors.grey[300],
              lazyLoad: false, // Critical image, load immediately
            ),

            const SizedBox(height: AppSpacing.s50),
          ],
        ),
      ),
    );
  }
}
