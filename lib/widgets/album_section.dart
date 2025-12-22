import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class AlbumSection extends StatelessWidget {
  const AlbumSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxxxl),
          // CTA
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Wedding Album',
                style: AppTextStyles.sectionTitle.copyWith(
                  fontSize: 24,
                ),
              ),
              const SizedBox(width: AppSpacing.sm),
              const Text(
                '→',
                style: TextStyle(
                  fontSize: 24,
                  color: AppColors.textHighlight,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          // Album box (placeholder for QR code or wedding box)
          Container(
            width: double.infinity,
            height: 200,
            decoration: BoxDecoration(
              color: AppColors.surfaceLight,
              borderRadius: BorderRadius.circular(6),
            ),
            child: Center(
              child: Image.asset(
                'assets/images/wedding_box.webp',
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) {
                  return const SizedBox.shrink();
                },
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xxxxl),
        ],
      ),
    );
  }
}

