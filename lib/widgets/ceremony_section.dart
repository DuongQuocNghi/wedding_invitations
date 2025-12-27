import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class CeremonySection extends StatelessWidget {
  const CeremonySection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Left side
            Expanded(
              flex: 3,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: AppSpacing.s90),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: Image.asset(
                      'assets/images/hinh_5.webp',
                      height: 212,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      gaplessPlayback: true,
                      cacheHeight: 212,
                      errorBuilder: (_, __, ___) => Container(
                        height: 212,
                        color: Colors.grey[300],
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.s36),
                  Text(
                    'Nắm tay nhau bước lên lễ đường, với lời hứa sẽ đồng hành cùng nhau qua những ngày bình yên lẫn giông bão, giữ nhau bằng lòng tin và sự yêu thương.',
                    style: AppTextStyles.textItalic,
                  ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.s4),
            // Right side
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: AppSpacing.s40),
                  Transform.translate(
                    offset: const Offset(-90, 0),
                    child: Text(
                      'Wedding',
                      style: AppTextStyles.sectionTitle,
                      textAlign: TextAlign.right,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.s4),
                  Text(
                    'Ceremony',
                    style: AppTextStyles.sectionTitle,
                    textAlign: TextAlign.right,
                  ),
                  const SizedBox(height: AppSpacing.s16),
                  Text(
                    'Tình yêu là hành trình trải nghiệm cùng nhau, không phải một đích đến.',
                    style: AppTextStyles.textItalic,
                  ),
                  const SizedBox(height: AppSpacing.s36),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: Image.asset(
                      'assets/images/hinh_6.webp',
                      height: 218,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      gaplessPlayback: true,
                      cacheHeight: 218,
                      errorBuilder: (_, __, ___) => Container(
                        height: 218,
                        color: Colors.grey[300],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
