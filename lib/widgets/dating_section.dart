import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class DatingSection extends StatelessWidget {
  const DatingSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        child: Stack(
          children: [
            // Brown background layer
            Positioned.fill(
              child: Container(
                margin: const EdgeInsets.only(top: 32, bottom: 83),
                color: AppColors.bgDark,
              ),
            ),

            // Main content
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(width: AppSpacing.s16),
                // Left side: Text
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: AppSpacing.s80),
                      Text(
                        'Giây phút chiếc nhẫn chạm vào tay là hành trình mới của chúng ta bắt đầu. Từ khoảnh khắc ấy, em, anh, không còn là hai cuộc đời riêng nữa.',
                        style: AppTextStyles.textBodyLight,
                      ),

                      // Date at bottom left
                      const SizedBox(height: AppSpacing.s60),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Transform.translate(
                            offset: const Offset(0, 20),
                            child: Text(
                              '28',
                              style: AppTextStyles.sectionTitle.copyWith(
                                fontSize: 60,
                                color: AppColors.accent,
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(
                              left: AppSpacing.s50,
                            ),
                            child: Text(
                              '04',
                              style: AppTextStyles.sectionTitle.copyWith(
                                fontSize: 60,
                                color: AppColors.accent,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: AppSpacing.s4),
                // Right side: Image
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: Image.asset(
                      'assets/images/hinh_4.webp',
                      height: 320,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      gaplessPlayback: true,
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.s16),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
