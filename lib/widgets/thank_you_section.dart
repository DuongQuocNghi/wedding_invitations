import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class ThankYouSection extends StatelessWidget {
  const ThankYouSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxxxl),
          // Photo with border
          Stack(
            alignment: Alignment.center,
            children: [
              SvgPicture.asset(
                'assets/svg/border_avatar.svg',
                width: 212,
                height: 182,
                placeholderBuilder: (context) => const SizedBox.shrink(),
              ),
              Image.asset(
                'assets/images/THO_3990.webp',
                width: 160,
                height: 160,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return const SizedBox.shrink();
                },
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          // Title
          Text(
            'THANK YOU',
            style: AppTextStyles.thankYouTitle,
          ),
          const SizedBox(height: AppSpacing.lg),
          // Text
          Text(
            'Chúng tôi chân thành cảm ơn quý khách đã dành thời gian đến tham dự lễ cưới của chúng tôi. Sự hiện diện và những lời chúc phúc của quý khách là món quà ý nghĩa nhất trong ngày đặc biệt này.',
            style: AppTextStyles.thankYouText,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.xxxxl),
        ],
      ),
    );
  }
}

