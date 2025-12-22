import 'package:flutter/material.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';

class MemoriesSection extends StatelessWidget {
  const MemoriesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title
          Text(
            'Our Wedding\nMemories',
            style: AppTextStyles.sectionTitle,
          ),
          const SizedBox(height: AppSpacing.lg),
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
                    const SizedBox(height: AppSpacing.md),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.asset(
                        'assets/images/hinh_3.webp',
                        height: 123,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            height: 123,
                            color: Colors.grey[300],
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              // Right side
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: Image.asset(
                    'assets/images/hinh_2.webp',
                    height: 300,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        height: 300,
                        color: Colors.grey[300],
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.xl),
          // Footer
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              'Dating',
              style: AppTextStyles.sectionFooter,
            ),
          ),
        ],
      ),
    );
  }
}

