import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';
import 'optimized_image.dart';

class ThankYouSection extends StatelessWidget {
  const ThankYouSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s30),
        color: AppColors.accent,
        child: Transform.translate(
          offset: const Offset(0, -80),
          child: Column(
            children: [
              // Photo with border
              Stack(
                alignment: Alignment.center,
                children: [
                  OptimizedImage(
                    imagePath: 'assets/images/THO_3990.webp',
                    width: 160,
                    height: 160,
                    fit: BoxFit.cover,
                    borderRadius: BorderRadius.circular(80),
                    placeholderColor: Colors.grey[300],
                  ),
                  SvgPicture.asset('assets/svg/border_avatar.svg', height: 182),
                ],
              ),
              const SizedBox(height: AppSpacing.s32),
              // Title
              Text('THANK YOU', style: AppTextStyles.thankYouTitle),
              const SizedBox(height: AppSpacing.s8),
              // Text
              Text(
                'Chúng con/em xin chân thành gửi lời cảm ơn sự chúc phúc và tình cảm quý báu đã dành cho chúng con/em trong ngày trọng đại này.',
                style: AppTextStyles.thankYouText,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.s60),
            ],
          ),
        ),
      ),
    );
  }
}
