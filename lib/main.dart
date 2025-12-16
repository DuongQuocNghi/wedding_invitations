import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'lazy_image.dart';

void main() {
  runApp(const WeddingInvitationApp());
}

class WeddingInvitationApp extends StatelessWidget {
  const WeddingInvitationApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quốc Nghi & Mỹ Lan',
      debugShowCheckedModeBanner: false,
      home: const WeddingInvitationPage(),
    );
  }
}

class WeddingInvitationPage extends StatelessWidget {
  const WeddingInvitationPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Để tối ưu first-load trên web, chỉ render các section quan trọng trước.
    // Các section nặng hơn (nhiều ảnh, nội dung dài) sẽ được load trễ sau 1 frame.
    return Scaffold(
      backgroundColor: const Color(0xFFF4F1EA),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header Section
            const HeaderSection(),

            const SizedBox(height: 50),

            // Welcome Section
            const WelcomeSection(),

            const SizedBox(height: 50),

            // Event Details Section
            const EventDetailsSection(),

            // Quote Section
            const QuoteSection(),

            // Các section dưới đây được load lazy để giảm công việc build ban đầu.
            const _LazyContentSections(),
          ],
        ),
      ),
    );
  }
}

/// Các section nội dung dài được render sau khi frame đầu tiên hoàn tất.
class _LazyContentSections extends StatefulWidget {
  const _LazyContentSections();

  @override
  State<_LazyContentSections> createState() => _LazyContentSectionsState();
}

class _LazyContentSectionsState extends State<_LazyContentSections> {
  bool _ready = false;

  @override
  void initState() {
    super.initState();
    // Đợi sau frame đầu tiên để không chặn first paint.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() {
          _ready = true;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_ready) {
      // Placeholder mỏng để giữ bố cục, có thể tinh chỉnh thêm nếu cần.
      return const SizedBox.shrink();
    }

    return Column(
      children: const [
        // Our Wedding Memories Section
        MemoriesSection(),

        // Dating Section
        DatingSection(),

        // Wedding Ceremony Section
        CeremonySection(),

        // Together Forever Section
        TogetherForeverSection(),

        // Wedding Album Section
        WeddingAlbumSection(),

        // Thank You Section
        ThankYouSection(),
      ],
    );
  }
}

// Header Section
class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      // Chiều cao bằng chiều cao màn hình
      height: MediaQuery.of(context).size.height * 0.85,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Sử dụng Image.asset không giới hạn cacheWidth để giữ nguyên chất lượng
          Image.asset(
            'assets/THO_3493.JPG',
            fit: BoxFit.cover,
            // Sử dụng frameBuilder để hiển thị placeholder khi đang load
            frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
              if (wasSynchronouslyLoaded) return child;
              return AnimatedOpacity(
                opacity: frame == null ? 0 : 1,
                duration: const Duration(milliseconds: 300),
                child: child,
              );
            },
          ),
          Align(
            alignment: Alignment.topCenter,
            child: Padding(
              padding: const EdgeInsets.only(top: 37),
              child: SvgPicture.asset(
                'assets/home_header.svg',
                fit: BoxFit.fill,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// Welcome Section
class WelcomeSection extends StatelessWidget {
  const WelcomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          // Title
          Column(
            children: [
              Text(
                'WELCOME TO OUR',
                textAlign: TextAlign.center,
                style: GoogleFonts.bellefair(
                  fontSize: 28,
                  fontWeight: FontWeight.normal,
                  color: const Color(0xFF5C4A37),
                  letterSpacing: 1.91, // ~7% of font size
                  height: 1.0,
                ),
              ),
              SvgPicture.asset('assets/love_story.svg', fit: BoxFit.contain),
            ],
          ),
          const SizedBox(height: 16),
          // Vietnamese Text
          Text(
            'Chào mừng đến với khoảnh khắc mở ra cột mốc mới trong câu\n'
            'chuyện tình yêu của chúng em, nơi hành trình mới\n'
            'bên nhau bắt đầu.',
            textAlign: TextAlign.center,
            style: GoogleFonts.sarabun(
              fontSize: 12,
              fontWeight: FontWeight.w300,
              color: const Color(0xFF5C4A37),
            ),
          ),
          const SizedBox(height: 30),
          // Monogram
          Center(
            child: SvgPicture.asset('assets/NL_logo.svg', fit: BoxFit.contain),
          ),
          const SizedBox(height: 40),
          // Couple Illustration - tối ưu với cacheWidth
          Image.asset(
            'assets/NL_draw.png',
            height: 150,
            fit: BoxFit.contain,
            cacheWidth: 300, // Tối ưu cho mobile
          ),
        ],
      ),
    );
  }
}

// Event Details Section
class EventDetailsSection extends StatelessWidget {
  const EventDetailsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          // Buttons Row
          Stack(
            alignment: Alignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: _EventButton(text: 'Tiệc nhà gái', isSelected: true),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _EventButton(text: 'Lễ tân hôn', isSelected: false),
                  ),
                ],
              ),
              SvgPicture.asset('assets/NL_tab.svg', fit: BoxFit.contain),
            ],
          ),
          const SizedBox(height: 16),
          // Family Details
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Center(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'NHÀ TRAI',
                        style: GoogleFonts.b612(
                          fontSize: 10,
                          fontWeight: FontWeight.normal,
                          color: const Color(0xFF5C4A37),
                        ),
                      ),
                      const SizedBox(height: 4),
                      _FamilyMember('Ông', 'DƯƠNG VĂN MINH'),
                      _FamilyMember('Bà', 'DƯƠNG THỊ HOA'),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Center(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'NHÀ GÁI',
                        style: GoogleFonts.b612(
                          fontSize: 10,
                          fontWeight: FontWeight.normal,
                          color: const Color(0xFF5C4A37),
                        ),
                      ),
                      const SizedBox(height: 4),
                      _FamilyMember('Ông', 'LÝ CỨU'),
                      _FamilyMember('Bà', 'LÝ THỊ LAN'),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Trân trọng kính mời đến dự bữa tiệc rượu chung vui\n'
            'được tổ chức vào',
            textAlign: TextAlign.center,
            style: GoogleFonts.aboreto(
              fontSize: 14,
              fontWeight: FontWeight.normal,
              color: const Color(0xFF565857),
            ),
          ),
          const SizedBox(height: 16),
          // Main Event Details
          Column(
            children: [
              Text(
                'THỨ BẢY',
                style: GoogleFonts.aBeeZee(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: const Color(0xFF5E121F),
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'LÚC 18:30',
                    style: GoogleFonts.aBeeZee(
                      fontSize: 12,
                      fontWeight: FontWeight.normal,
                      color: const Color(0xFF5E121F),
                    ),
                  ),
                  const SizedBox(width: 20),
                  Text(
                    '31',
                    style: GoogleFonts.b612(
                      fontSize: 32,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF5E121F),
                    ),
                  ),
                  const SizedBox(width: 20),
                  Text(
                    'NĂM 2026',
                    style: GoogleFonts.aBeeZee(
                      fontSize: 12,
                      fontWeight: FontWeight.normal,
                      color: const Color(0xFF5E121F),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'THÁNG 01',
                style: GoogleFonts.aBeeZee(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: const Color(0xFF5E121F),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Location
          Column(
            children: [
              Text(
                'Tại',
                style: GoogleFonts.aboreto(
                  fontSize: 10,
                  color: const Color(0xFF565857),
                ),
              ),
              Text(
                'NHÀ HÀNG ÁI HUÊ 2',
                style: GoogleFonts.aBeeZee(
                  fontSize: 10,
                  fontWeight: FontWeight.normal,
                  color: const Color(0xFF565857),
                  letterSpacing: 1,
                ),
              ),
              Text(
                '338 Trần Hưng Đạo, Phường 11, Quận 5',
                textAlign: TextAlign.center,
                style: GoogleFonts.aBeeZee(
                  fontSize: 10,
                  fontWeight: FontWeight.normal,
                  color: const Color(0xFF565857),
                  letterSpacing: 1,
                ),
              ),
              TextButton(
                onPressed: () {
                  // Open map
                },
                child: Text(
                  'Xem bản đồ',
                  style: TextStyle(
                    fontSize: 10,
                    color: const Color(0xFF5054D3),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _EventButton extends StatelessWidget {
  final String text;
  final bool isSelected;

  const _EventButton({required this.text, this.isSelected = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 44,
      decoration: BoxDecoration(
        color: isSelected ? const Color(0xFFEBDAD0) : const Color(0xFFF4F1EA),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFF9F7D6A), width: 1),
      ),
      child: Center(
        child: Text(
          text,
          textAlign: TextAlign.center,
          style: GoogleFonts.aboreto(
            fontSize: 20,
            fontWeight: FontWeight.normal,
            color: isSelected
                ? const Color(0xFF5E121F)
                : const Color(0xFF9F7D6A),
          ),
        ),
      ),
    );
  }
}

class _FamilyMember extends StatelessWidget {
  final String title;
  final String name;

  const _FamilyMember(this.title, this.name);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 30,
          child: Text(
            '$title ',
            style: GoogleFonts.aBeeZee(
              fontSize: 10,
              fontWeight: FontWeight.normal,
              color: const Color(0xFF5C4A37),
            ),
          ),
        ), // Frutiger
        Text(
          name,
          style: GoogleFonts.aBeeZee(
            fontSize: 10,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF5C4A37),
          ),
        ),
      ],
    );
  }
}

// Quote Section
class QuoteSection extends StatelessWidget {
  const QuoteSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFF5C4A37),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        children: [
          Text(
            '"Tình yêu trở nên trọn vẹn hơn khi được chia sẻ với những người ta yêu thương."',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: isMobile ? 16 : 20,
              color: Colors.white,
              fontStyle: FontStyle.italic,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Chúng tôi rất vui mừng và hạnh phúc khi được đón tiếp quý khách đến tham dự '
            'lễ cưới của chúng tôi. Sự hiện diện của quý khách là niềm vinh dự và hạnh phúc lớn nhất của chúng tôi.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: isMobile ? 14 : 16,
              color: Colors.white70,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}

// Memories Section
class MemoriesSection extends StatelessWidget {
  const MemoriesSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Our Wedding Memories',
            style: TextStyle(
              fontSize: isMobile ? 24 : 32,
              color: const Color(0xFF8B1A1A),
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: isMobile ? 1 : 2,
                child: Text(
                  'Những khoảnh khắc đẹp trong ngày cưới của chúng tôi sẽ mãi mãi được lưu giữ. '
                  'Mỗi bức ảnh là một câu chuyện, mỗi nụ cười là một kỷ niệm đáng nhớ.',
                  style: TextStyle(
                    fontSize: isMobile ? 14 : 16,
                    color: const Color(0xFF5C4A37),
                    height: 1.6,
                  ),
                ),
              ),
              if (!isMobile) const SizedBox(width: 40),
              if (!isMobile)
                Expanded(
                  flex: 3,
                  child: Column(
                    children: [
                      const LazyNetworkImage(
                        url: 'https://example.com/wedding-memory-1.webp',
                        width: double.infinity,
                        height: 250,
                      ),
                      const SizedBox(height: 20),
                      const LazyNetworkImage(
                        url: 'https://example.com/wedding-memory-2.webp',
                        width: double.infinity,
                        height: 250,
                      ),
                    ],
                  ),
                ),
            ],
          ),
          if (isMobile) ...[
            const SizedBox(height: 20),
            const LazyNetworkImage(
              url: 'https://example.com/wedding-memory-3.webp',
              width: double.infinity,
              height: 200,
            ),
            const SizedBox(height: 20),
            const LazyNetworkImage(
              url: 'https://example.com/wedding-memory-4.webp',
              width: double.infinity,
              height: 200,
            ),
          ],
        ],
      ),
    );
  }
}

// Dating Section
class DatingSection extends StatelessWidget {
  const DatingSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Stack(
        children: [
          Positioned(
            right: isMobile ? 20 : 60,
            top: 40,
            child: Opacity(
              opacity: 0.2,
              child: Text(
                'Dating',
                style: TextStyle(
                  fontSize: isMobile ? 60 : 120,
                  color: const Color(0xFF8B6F47),
                  fontStyle: FontStyle.italic,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    flex: isMobile ? 1 : 2,
                    child: Text(
                      'Hành trình yêu thương của chúng tôi bắt đầu từ những ngày tháng đẹp đẽ. '
                      'Mỗi khoảnh khắc bên nhau đều là những kỷ niệm quý giá.',
                      style: TextStyle(
                        fontSize: isMobile ? 14 : 16,
                        color: const Color(0xFF5C4A37),
                        height: 1.6,
                      ),
                    ),
                  ),
                  if (!isMobile) const SizedBox(width: 40),
                  if (!isMobile)
                    Expanded(
                      flex: 3,
                      child: Column(
                        children: [
                          const LazyNetworkImage(
                            url: 'https://example.com/dating-1.webp',
                            width: double.infinity,
                            height: 200,
                          ),
                          const SizedBox(height: 20),
                          const LazyNetworkImage(
                            url: 'https://example.com/dating-2.webp',
                            width: double.infinity,
                            height: 250,
                          ),
                        ],
                      ),
                    ),
                ],
              ),
              if (isMobile) ...[
                const SizedBox(height: 20),
                const LazyNetworkImage(
                  url: 'https://example.com/dating-3.webp',
                  width: double.infinity,
                  height: 180,
                ),
                const SizedBox(height: 20),
                const LazyNetworkImage(
                  url: 'https://example.com/dating-4.webp',
                  width: double.infinity,
                  height: 220,
                ),
              ],
              const SizedBox(height: 20),
              Opacity(
                opacity: 0.5,
                child: Text(
                  '28 04',
                  style: TextStyle(
                    fontSize: isMobile ? 24 : 36,
                    color: const Color(0xFF8B6F47),
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.w300,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// Ceremony Section
class CeremonySection extends StatelessWidget {
  const CeremonySection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Wedding Ceremony',
            style: TextStyle(
              fontSize: isMobile ? 24 : 32,
              color: const Color(0xFF8B1A1A),
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 3,
                child: Column(
                  children: [
                    LazyNetworkImage(
                      url: 'https://example.com/ceremony-1.webp',
                      width: double.infinity,
                      height: isMobile ? 200 : 300,
                    ),
                    const SizedBox(height: 20),
                    LazyNetworkImage(
                      url: 'https://example.com/ceremony-2.webp',
                      width: double.infinity,
                      height: isMobile ? 200 : 300,
                    ),
                  ],
                ),
              ),
              if (!isMobile) const SizedBox(width: 40),
              if (!isMobile)
                Expanded(
                  flex: 2,
                  child: Text(
                    'Ngày cưới là ngày đẹp nhất trong cuộc đời chúng tôi. '
                    'Được đứng bên nhau, hứa hẹn sẽ yêu thương và chăm sóc nhau suốt đời.',
                    style: TextStyle(
                      fontSize: 16,
                      color: const Color(0xFF5C4A37),
                      height: 1.6,
                    ),
                  ),
                ),
            ],
          ),
          if (isMobile) ...[
            const SizedBox(height: 20),
            Text(
              'Ngày cưới là ngày đẹp nhất trong cuộc đời chúng tôi. '
              'Được đứng bên nhau, hứa hẹn sẽ yêu thương và chăm sóc nhau suốt đời.',
              style: TextStyle(
                fontSize: 14,
                color: const Color(0xFF5C4A37),
                height: 1.6,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

// Together Forever Section
class TogetherForeverSection extends StatelessWidget {
  const TogetherForeverSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: isMobile ? 1 : 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Together Forever',
                  style: TextStyle(
                    fontSize: isMobile ? 24 : 32,
                    color: const Color(0xFF8B1A1A),
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  'Chúng tôi hứa sẽ cùng nhau đi qua mọi thăng trầm của cuộc sống, '
                  'chia sẻ niềm vui và nỗi buồn, và luôn yêu thương nhau mãi mãi.',
                  style: TextStyle(
                    fontSize: isMobile ? 14 : 16,
                    color: const Color(0xFF5C4A37),
                    height: 1.6,
                  ),
                ),
              ],
            ),
          ),
          if (!isMobile) const SizedBox(width: 40),
          if (!isMobile)
            const Expanded(
              flex: 3,
              child: LazyNetworkImage(
                url: 'https://example.com/together-forever.webp',
                height: 350,
              ),
            ),
        ],
      ),
    );
  }
}

// Wedding Album Section
class WeddingAlbumSection extends StatelessWidget {
  const WeddingAlbumSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFF5F0E8), Color(0xFF5C4A37)],
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Wedding Album',
                style: TextStyle(
                  fontSize: isMobile ? 24 : 32,
                  color: const Color(0xFF8B1A1A),
                  fontStyle: FontStyle.italic,
                  fontWeight: FontWeight.w300,
                ),
              ),
              const SizedBox(width: 12),
              const Icon(
                Icons.arrow_forward,
                color: Color(0xFF8B1A1A),
                size: 24,
              ),
            ],
          ),
          const SizedBox(height: 40),
          Container(
            width: isMobile ? double.infinity : 400,
            padding: const EdgeInsets.all(40),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF8B6F47), width: 1),
            ),
            child: Column(
              children: [
                Text(
                  'WEDDING BOX',
                  style: TextStyle(
                    fontSize: isMobile ? 18 : 24,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF5C4A37),
                    letterSpacing: 2,
                  ),
                ),
                const SizedBox(height: 24),
                // QR Code Placeholder
                Container(
                  width: isMobile ? 150 : 200,
                  height: isMobile ? 150 : 200,
                  decoration: BoxDecoration(
                    color: Colors.grey[300],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Center(
                    child: Icon(Icons.qr_code, size: 100, color: Colors.grey),
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

// Thank You Section
class ThankYouSection extends StatelessWidget {
  const ThankYouSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFF5C4A37),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        children: [
          // Circular Photo Placeholder
          Container(
            width: isMobile ? 150 : 200,
            height: isMobile ? 150 : 200,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFF8B6F47), width: 3),
              color: const Color(0xFFD4C4B0),
            ),
            child: const Center(
              child: Icon(Icons.photo, size: 60, color: Colors.white70),
            ),
          ),
          const SizedBox(height: 40),
          Text(
            'THANK YOU',
            style: TextStyle(
              fontSize: isMobile ? 32 : 48,
              fontWeight: FontWeight.bold,
              color: const Color(0xFFF5F0E8),
              letterSpacing: 4,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Chúng tôi chân thành cảm ơn quý khách đã dành thời gian đến tham dự lễ cưới của chúng tôi. '
            'Sự hiện diện và những lời chúc phúc của quý khách là món quà ý nghĩa nhất trong ngày đặc biệt này.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: isMobile ? 14 : 16,
              color: Colors.white70,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }
}
