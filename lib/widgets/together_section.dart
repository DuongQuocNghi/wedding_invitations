import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class TogetherSection extends StatelessWidget {
  const TogetherSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxxxl),
          // Title
          Column(
            children: [
              Text(
                'Together',
                style: AppTextStyles.sectionTitle,
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                'Forever',
                style: AppTextStyles.sectionTitle.copyWith(
                  height: 0.8,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          // Text
          Column(
            children: [
              Text(
                'Nhà là nơi có nhau, nơi yêu thương được gìn giữ từng ngày.',
                style: AppTextStyles.textItalic,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Và dù con đường \'mãi mãi\' kéo dài đến đâu, anh và em vẫn chọn cùng nhau đi hết quãng đường ấy.',
                style: AppTextStyles.textItalic,
                textAlign: TextAlign.center,
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.xl),
          // Image
          Image.asset(
            'assets/images/hinh_7.webp',
            width: 258,
            height: 250,
            fit: BoxFit.contain,
            errorBuilder: (context, error, stackTrace) {
              return const SizedBox.shrink();
            },
          ),
          const SizedBox(height: AppSpacing.xxxxl),
        ],
      ),
    );
  }
}

