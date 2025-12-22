import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class QuoteSection extends StatelessWidget {
  const QuoteSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: AppColors.accent,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.lg,
      ),
      child: Column(
        children: [
          Text(
            '"Tình yêu trở nên trọn vẹn hơn khi được sẻ chia cùng những người ta trân quý."',
            style: AppTextStyles.quoteText,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            'Sự hiện diện và những lời chúc tốt đẹp của cô chú/anh chị sẽ là niềm vinh hạnh, góp phần làm ngày trọng đại của chúng con/em thêm ý nghĩa.',
            style: AppTextStyles.quoteDescription,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

