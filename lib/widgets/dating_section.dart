import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class DatingSection extends StatelessWidget {
  const DatingSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Stack(
        children: [
          // Brown background layer
          Positioned.fill(
            child: Container(
              margin: const EdgeInsets.only(top: 100),
              decoration: BoxDecoration(
                color: AppColors.bgDark,
                borderRadius: BorderRadius.circular(6),
              ),
            ),
          ),
          // Main content
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: AppSpacing.xxxxl),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Left side: Text
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 100),
                      child: Text(
                        'Giây phút chiếc nhẫn chạm vào tay là hành trình mới của chúng ta bắt đầu. Từ khoảnh khắc ấy, em, anh, không còn là hai cuộc đời riêng nữa.',
                        style: AppTextStyles.textBodyLight,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  // Right side: Image
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 50),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: Image.asset(
                          'assets/images/hinh_4.webp',
                          height: 320,
                          width: double.infinity,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return Container(
                              height: 320,
                              color: Colors.grey[300],
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.xl),
              // Date at bottom left
              Row(
                children: [
                  Text(
                    '28',
                    style: AppTextStyles.sectionTitle.copyWith(
                      fontSize: 60,
                      color: AppColors.accent,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    '04',
                    style: AppTextStyles.sectionTitle.copyWith(
                      fontSize: 60,
                      color: AppColors.accent,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.xxxxl),
            ],
          ),
        ],
      ),
    );
  }
}

