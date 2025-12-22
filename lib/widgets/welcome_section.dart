import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class WelcomeSection extends StatelessWidget {
  const WelcomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxxl),
          // Title
          Text(
            'WELCOME TO OUR',
            style: AppTextStyles.welcomeTitle,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.md),
          // Love story SVG
          SvgPicture.asset(
            'assets/svg/love_story.svg',
            width: 200,
            height: 50,
            placeholderBuilder: (context) => const SizedBox.shrink(),
          ),
          const SizedBox(height: AppSpacing.md),
          // Welcome text
          Text(
            'Chào mừng đến với khoảnh khắc mở ra cột mốc mới trong câu\n'
            'chuyện tình yêu của chúng em, nơi hành trình mới\n'
            'bên nhau bắt đầu.',
            style: AppTextStyles.welcomeText,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.lg),
          // Logo
          SvgPicture.asset(
            'assets/svg/NL_logo.svg',
            width: 150,
            height: 80,
            placeholderBuilder: (context) => const SizedBox.shrink(),
          ),
          const SizedBox(height: AppSpacing.lg),
          // Illustration
          Image.asset(
            'assets/images/NL_draw.webp',
            width: 200,
            height: 150,
            fit: BoxFit.contain,
            errorBuilder: (context, error, stackTrace) {
              return const SizedBox.shrink();
            },
          ),
        ],
      ),
    );
  }
}

