import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class AlbumSection extends StatelessWidget {
  const AlbumSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
        child: Column(
          children: [
            // CTA
            Container(
              height: 53,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(27),
                border: Border.all(
                  width: 1,
                  color: AppColors.accent.withAlpha(128),
                ),
              ),
              child: Center(
                child: Text(
                  'Wedding Album →',
                  style: AppTextStyles.sectionTitle.copyWith(fontSize: 24),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.s90),
            // Album box (placeholder for QR code or wedding box)
            Center(
              child: Image.asset(
                'assets/images/wedding_box.webp',
                fit: BoxFit.contain,
                gaplessPlayback: true,
              ),
            ),
            const SizedBox(height: AppSpacing.s150),
          ],
        ),
      ),
    );
  }
}
