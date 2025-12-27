import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import 'optimized_image.dart';

class MemoriesSection extends StatelessWidget {
  const MemoriesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: AppSpacing.s65),

            // Title
            Text('Our Wedding\nMemories', style: AppTextStyles.sectionTitle),
            const SizedBox(height: AppSpacing.s18),
            // Layout
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Left side
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Ngay từ ngày đầu gặp gỡ, trái tim chúng ta đã hòa chung nhịp đập, thì thầm rằng người ấy chính là duy nhất.',
                        style: AppTextStyles.textItalic,
                      ),
                      const SizedBox(height: AppSpacing.s47),
                      OptimizedImage(
                        imagePath: 'assets/images/hinh_3.webp',
                        height: 163,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        borderRadius: BorderRadius.circular(6),
                        placeholderColor: Colors.grey[300],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: AppSpacing.s8),
                // Right side
                Expanded(
                  child: Transform.translate(
                    offset: const Offset(0, -40),
                    child: OptimizedImage(
                      imagePath: 'assets/images/hinh_2.webp',
                      height: 224,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.circular(6),
                      placeholderColor: Colors.grey[300],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.s4),
            // Footer
            Align(
              alignment: Alignment.centerRight,
              child: Transform.translate(
                offset: const Offset(40, 0),
                child: Text('Dating', style: AppTextStyles.sectionFooter),
              ),
            ),

            const SizedBox(height: AppSpacing.s50),
          ],
        ),
      ),
    );
  }
}
