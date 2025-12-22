import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../constants/text_styles.dart';
import '../constants/spacing.dart';
import '../constants/colors.dart';

class EventDetailsSection extends StatefulWidget {
  const EventDetailsSection({super.key});

  @override
  State<EventDetailsSection> createState() => _EventDetailsSectionState();
}

class _EventDetailsSectionState extends State<EventDetailsSection> {
  int _selectedTab = 0; // 0 = bride, 1 = reception

  void _openMap(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxxxl),
          // Tabs
          _buildTabs(),
          const SizedBox(height: AppSpacing.lg),
          // Tab content
          _selectedTab == 0 ? _buildBrideContent() : _buildReceptionContent(),
        ],
      ),
    );
  }

  Widget _buildTabs() {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Tab buttons
        Row(
          children: [
            Expanded(
              child: _TabButton(
                text: 'Tiệc nhà gái',
                isActive: _selectedTab == 0,
                onTap: () => setState(() => _selectedTab = 0),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: _TabButton(
                text: 'Lễ tân hôn',
                isActive: _selectedTab == 1,
                onTap: () => setState(() => _selectedTab = 1),
              ),
            ),
          ],
        ),
        // Decoration SVG (centered)
        Positioned.fill(
          child: Center(
            child: SvgPicture.asset(
              'assets/svg/NL_tab.svg',
              width: double.infinity,
              height: 50,
              fit: BoxFit.contain,
              placeholderBuilder: (context) => const SizedBox.shrink(),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBrideContent() {
    return Column(
      children: [
        // Family details
        _buildFamilyDetails(
          brideFamily: [
            {'title': 'Ông', 'name': 'LÝ CỨU'},
            {'title': 'Bà', 'name': 'CHUNG THỊ CẨM VÂN'},
          ],
          groomFamily: [
            {'title': 'Ông', 'name': 'DƯƠNG VĂN MINH'},
            {'title': 'Bà', 'name': 'NGUYỄN LÊ TUYẾT PHƯỢNG'},
          ],
        ),
        const SizedBox(height: AppSpacing.lg),
        // Invitation text
        Text(
          'Trân trọng kính mời đến dự bữa tiệc rượu chung vui\n'
          'được tổ chức vào',
          style: AppTextStyles.invitationText,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: AppSpacing.lg),
        // Event date
        _buildEventDate(
          day: 'THỨ BẢY',
          time: 'LÚC 18:30',
          date: '31',
          month: 'THÁNG 01',
          year: 'NĂM 2026',
        ),
        const SizedBox(height: AppSpacing.lg),
        // Location
        _buildLocation(
          name: 'NHÀ HÀNG ÁI HUÊ 2',
          address: [
            '338 Trần Hưng Đạo, Phường 11, Quận 5,',
            'Thành phố Hồ Chí Minh',
          ],
          mapUrl: 'https://maps.app.goo.gl/qpimk6XEoDmA6src7',
        ),
      ],
    );
  }

  Widget _buildReceptionContent() {
    return Column(
      children: [
        // Family details
        _buildFamilyDetails(
          brideFamily: [
            {'title': 'Ông', 'name': 'LÝ CỨU'},
            {'title': 'Bà', 'name': 'CHUNG THỊ CẨM VÂN'},
          ],
          groomFamily: [
            {'title': 'Ông', 'name': 'DƯƠNG VĂN MINH'},
            {'title': 'Bà', 'name': 'NGUYỄN LÊ TUYẾT PHƯỢNG'},
          ],
          reverse: true,
        ),
        const SizedBox(height: AppSpacing.lg),
        // Invitation text
        Text(
          'Trân trọng kính mời đến dự bữa tiệc rượu chung vui\n'
          'được tổ chức vào',
          style: AppTextStyles.invitationText,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: AppSpacing.lg),
        // Event date
        _buildEventDate(
          day: 'CHỦ NHẬT',
          time: 'LÚC 10:15',
          date: '08',
          month: 'THÁNG 02',
          year: 'NĂM 2026',
        ),
        const SizedBox(height: AppSpacing.lg),
        // Location
        _buildLocation(
          name: 'NHÀ HÀNG Minh Phú',
          address: [
            '146 Đ. Lê Văn Việt, Tăng Nhơn Phú B, Thủ Đức,',
            'Thành phố Hồ Chí Minh',
          ],
          mapUrl: 'https://maps.app.goo.gl/MCkVr82wMV39BA4V9',
        ),
      ],
    );
  }

  Widget _buildFamilyDetails({
    required List<Map<String, String>> brideFamily,
    required List<Map<String, String>> groomFamily,
    bool reverse = false,
  }) {
    final leftFamily = reverse ? groomFamily : brideFamily;
    final rightFamily = reverse ? brideFamily : groomFamily;
    final leftLabel = reverse ? 'NHÀ TRAI' : 'NHÀ GÁI';
    final rightLabel = reverse ? 'NHÀ GÁI' : 'NHÀ TRAI';

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(leftLabel, style: AppTextStyles.familyLabel),
              const SizedBox(height: AppSpacing.sm),
              ...leftFamily.map((member) => Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.xs),
                    child: Row(
                      children: [
                        Text(
                          '${member['title']} ',
                          style: AppTextStyles.familyMemberTitle,
                        ),
                        Expanded(
                          child: Text(
                            member['name']!,
                            style: AppTextStyles.familyMemberName,
                          ),
                        ),
                      ],
                    ),
                  )),
            ],
          ),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(rightLabel, style: AppTextStyles.familyLabel),
              const SizedBox(height: AppSpacing.sm),
              ...rightFamily.map((member) => Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.xs),
                    child: Row(
                      children: [
                        Text(
                          '${member['title']} ',
                          style: AppTextStyles.familyMemberTitle,
                        ),
                        Expanded(
                          child: Text(
                            member['name']!,
                            style: AppTextStyles.familyMemberName,
                          ),
                        ),
                      ],
                    ),
                  )),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildEventDate({
    required String day,
    required String time,
    required String date,
    required String month,
    required String year,
  }) {
    return Column(
      children: [
        Text(day, style: AppTextStyles.eventDay),
        const SizedBox(height: AppSpacing.sm),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Text(time, style: AppTextStyles.eventTime),
            const SizedBox(width: AppSpacing.sm),
            SizedBox(
              width: 90,
              child: Text(
                date,
                style: AppTextStyles.eventDateNumber,
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Text(year, style: AppTextStyles.eventTime),
          ],
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(month, style: AppTextStyles.eventMonthYear),
      ],
    );
  }

  Widget _buildLocation({
    required String name,
    required List<String> address,
    required String mapUrl,
  }) {
    return Column(
      children: [
        Text('Tại', style: AppTextStyles.locationLabel),
        const SizedBox(height: AppSpacing.xs),
        Text(name, style: AppTextStyles.locationName),
        const SizedBox(height: AppSpacing.xs),
        ...address.map((line) => Text(
              line,
              style: AppTextStyles.locationAddress,
            )),
        const SizedBox(height: AppSpacing.sm),
        TextButton(
          onPressed: () => _openMap(mapUrl),
          style: TextButton.styleFrom(
            padding: EdgeInsets.zero,
            minimumSize: Size.zero,
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          child: Text(
            'Xem bản đồ',
            style: AppTextStyles.mapLinkButton,
          ),
        ),
      ],
    );
  }
}

class _TabButton extends StatelessWidget {
  final String text;
  final bool isActive;
  final VoidCallback onTap;

  const _TabButton({
    required this.text,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 44,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(22),
          border: Border.all(
            color: isActive ? AppColors.accent : AppColors.surfaceMedium,
            width: 1,
          ),
          color: isActive ? AppColors.surfaceMedium : AppColors.surfaceLight,
          boxShadow: [
            BoxShadow(
              color: AppColors.accent.withValues(alpha: isActive ? 0.12 : 0.04),
              blurRadius: 6,
              offset: Offset(1, isActive ? 4 : 2),
            ),
          ],
        ),
        child: Center(
          child: Text(
            text,
            style: isActive
                ? AppTextStyles.tabButtonActive
                : AppTextStyles.tabButton,
          ),
        ),
      ),
    );
  }
}

