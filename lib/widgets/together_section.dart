import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class TogetherSection extends StatelessWidget {
  const TogetherSection({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.s16,
          vertical: AppSpacing.s40,
        ),
        child: Row(
          children: [
            // Title
            Expanded(
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Together', style: AppTextStyles.sectionTitle),
                      const SizedBox(height: AppSpacing.s11),
                      Padding(
                        padding: EdgeInsets.only(left: AppSpacing.s40),
                        child: Text(
                          'Forever',
                          style: AppTextStyles.sectionTitle,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.s24),
                  // Text
                  Column(
                    children: [
                      Text(
                        'Nhà là nơi có nhau, nơi yêu thương được gìn giữ từng ngày.',
                        style: AppTextStyles.textItalic,
                        textAlign: TextAlign.left,
                      ),
                      const SizedBox(height: AppSpacing.s8),
                      Text(
                        'Và dù con đường \'mãi mãi\' kéo dài đến đâu, anh và em vẫn chọn cùng nhau đi hết quãng đường ấy.',
                        style: AppTextStyles.textItalic,
                        textAlign: TextAlign.left,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.s4),
            // Image
            Expanded(
              child: Image.asset(
                'assets/images/hinh_7.webp',
                height: 321,
                fit: BoxFit.cover,
                gaplessPlayback: true,
                cacheHeight: 321,
                errorBuilder: (_, __, ___) =>
                    Container(height: 321, color: Colors.grey[300]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
