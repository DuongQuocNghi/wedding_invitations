import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

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
                      ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: Image.asset(
                          'assets/images/hinh_3.webp',
                          height: 163,
                          width: double.infinity,
                          fit: BoxFit.cover,
                          gaplessPlayback: true,
                          cacheHeight: 163,
                          errorBuilder: (_, __, ___) =>
                              Container(height: 163, color: Colors.grey[300]),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: AppSpacing.s8),
                // Right side
                Expanded(
                  child: Transform.translate(
                    offset: const Offset(0, -40),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.asset(
                        'assets/images/hinh_2.webp',
                        height: 224,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        gaplessPlayback: true,
                        cacheHeight: 224,
                        errorBuilder: (_, __, ___) =>
                            Container(height: 224, color: Colors.grey[300]),
                      ),
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
