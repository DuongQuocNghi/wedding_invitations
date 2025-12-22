import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class CeremonySection extends StatelessWidget {
  const CeremonySection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Left side
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: Image.asset(
                    'assets/images/hinh_5.webp',
                    height: 212,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        height: 212,
                        color: Colors.grey[300],
                      );
                    },
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Text(
                  'Nắm tay nhau bước lên lễ đường, với lời hứa sẽ đồng hành cùng nhau qua những ngày bình yên lẫn giông bão, giữ nhau bằng lòng tin và sự yêu thương.',
                  style: AppTextStyles.textItalic,
                ),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          // Right side
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  'Wedding',
                  style: AppTextStyles.sectionTitle,
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  'Ceremony',
                  style: AppTextStyles.sectionTitle.copyWith(
                    height: 0.8,
                  ),
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: AppSpacing.md),
                Text(
                  'Tình yêu là hành trình trải nghiệm cùng nhau, không phải một đích đến.',
                  style: AppTextStyles.textItalic,
                  textAlign: TextAlign.right,
                ),
                const SizedBox(height: AppSpacing.md),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: Image.asset(
                    'assets/images/hinh_6.webp',
                    height: 218,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        height: 218,
                        color: Colors.grey[300],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

