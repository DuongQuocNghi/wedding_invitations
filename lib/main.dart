import 'package:flutter/material.dart';

void main() {
  runApp(const WeddingInvitationApp());
}

class WeddingInvitationApp extends StatelessWidget {
  const WeddingInvitationApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Thiệp Cưới Quốc Nghi & Mỹ Lan',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Georgia',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF8B6F47),
          brightness: Brightness.light,
        ),
      ),
      home: const WeddingInvitationPage(),
    );
  }
}

class WeddingInvitationPage extends StatelessWidget {
  const WeddingInvitationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header Section
            const HeaderSection(),

            // Welcome Section
            const WelcomeSection(),

            // Event Details Section
            const EventDetailsSection(),

            // Quote Section
            const QuoteSection(),

            // Our Wedding Memories Section
            const MemoriesSection(),

            // Dating Section
            const DatingSection(),

            // Wedding Ceremony Section
            const CeremonySection(),

            // Together Forever Section
            const TogetherForeverSection(),

            // Wedding Album Section
            const WeddingAlbumSection(),

            // Thank You Section
            const ThankYouSection(),
          ],
        ),
      ),
    );
  }
}

// Header Section
class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFF5F0E8), Color(0xFFF5F0E8)],
        ),
      ),
      child: Column(
        children: [
          const SizedBox(height: 40),
          // Couple Names
          Text(
            'QUỐC NGHI',
            style: TextStyle(
              fontSize: isMobile ? 36 : 56,
              fontWeight: FontWeight.w300,
              letterSpacing: 4,
              color: const Color(0xFF8B6F47),
              fontFamily: 'Georgia',
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'MỸ LAN',
            style: TextStyle(
              fontSize: isMobile ? 36 : 56,
              fontWeight: FontWeight.w300,
              letterSpacing: 4,
              color: const Color(0xFF8B6F47),
              fontFamily: 'Georgia',
            ),
          ),
          const SizedBox(height: 16),
          // Date
          Text(
            '08.02.2026',
            style: TextStyle(
              fontSize: isMobile ? 18 : 24,
              color: const Color(0xFF8B6F47),
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 40),
          // Couple Photo Placeholder
          Container(
            width: double.infinity,
            height: isMobile ? 300 : 500,
            margin: const EdgeInsets.symmetric(horizontal: 20),
            decoration: BoxDecoration(
              color: const Color(0xFFD4C4B0),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Icon(Icons.photo_camera, size: 60, color: Colors.white70),
            ),
          ),
          const SizedBox(height: 40),
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
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        children: [
          // Title
          RichText(
            textAlign: TextAlign.center,
            text: TextSpan(
              style: TextStyle(
                fontSize: isMobile ? 24 : 32,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF5C4A37),
                letterSpacing: 2,
              ),
              children: const [
                TextSpan(text: 'WELCOME TO OUR\n'),
                TextSpan(
                  text: 'love Story',
                  style: TextStyle(
                    color: Color(0xFF8B1A1A),
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.normal,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 40),
          // Vietnamese Text
          Text(
            'Chúng tôi rất vui mừng được chia sẻ câu chuyện tình yêu của mình với bạn. '
            'Đây là hành trình đầy ắp những khoảnh khắc đẹp, những nụ cười và những kỷ niệm đáng nhớ.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: isMobile ? 14 : 16,
              color: const Color(0xFF5C4A37),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 40),
          // Monogram
          Container(
            width: isMobile ? 120 : 150,
            height: isMobile ? 120 : 150,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFF8B6F47), width: 2),
            ),
            child: Center(
              child: Text(
                'NL',
                style: TextStyle(
                  fontSize: isMobile ? 36 : 48,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF8B6F47),
                  letterSpacing: 4,
                ),
              ),
            ),
          ),
          const SizedBox(height: 40),
          // Couple Illustration Placeholder
          Container(
            width: isMobile ? 150 : 200,
            height: isMobile ? 150 : 200,
            decoration: BoxDecoration(
              color: const Color(0xFFE8DCC6),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Icon(Icons.favorite, size: 60, color: Color(0xFF8B1A1A)),
            ),
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
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      width: double.infinity,
      color: const Color(0xFFF5F0E8),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 60,
        vertical: 60,
      ),
      child: Column(
        children: [
          // Buttons Row
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: _EventButton(text: 'Tiệc nhà gái', isMobile: isMobile),
              ),
              const SizedBox(width: 20),
              Container(
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: const Color(0xFF8B6F47), width: 2),
                ),
                child: Center(
                  child: Text(
                    'NL',
                    style: TextStyle(
                      fontSize: isMobile ? 20 : 28,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF8B6F47),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: _EventButton(text: 'Lễ tân hôn', isMobile: isMobile),
              ),
            ],
          ),
          const SizedBox(height: 60),
          // Family Details
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'NHÀ TRAI',
                      style: TextStyle(
                        fontSize: isMobile ? 14 : 16,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF5C4A37),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _FamilyMember('Ông DƯƠNG VĂN MINH', isMobile),
                    _FamilyMember('Bà DƯƠNG THỊ HOA', isMobile),
                    _FamilyMember('Anh DƯƠNG QUỐC NGHI', isMobile),
                  ],
                ),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'NHÀ GÁI',
                      style: TextStyle(
                        fontSize: isMobile ? 14 : 16,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF5C4A37),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _FamilyMember('Ông LÝ CỨU', isMobile),
                    _FamilyMember('Bà LÝ THỊ LAN', isMobile),
                    _FamilyMember('Cô LÝ MỸ LAN', isMobile),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 60),
          // Main Event Details
          Container(
            padding: const EdgeInsets.all(40),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(color: const Color(0xFF8B6F47), width: 1),
                bottom: BorderSide(color: const Color(0xFF8B6F47), width: 1),
              ),
            ),
            child: Column(
              children: [
                Text(
                  'THỨ BẢY',
                  style: TextStyle(
                    fontSize: isMobile ? 18 : 24,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF5C4A37),
                    letterSpacing: 2,
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'LÚC 18:30',
                      style: TextStyle(
                        fontSize: isMobile ? 16 : 20,
                        color: const Color(0xFF5C4A37),
                        letterSpacing: 1,
                      ),
                    ),
                    const SizedBox(width: 20),
                    Text(
                      '31',
                      style: TextStyle(
                        fontSize: isMobile ? 32 : 48,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF8B1A1A),
                      ),
                    ),
                    const SizedBox(width: 20),
                    Text(
                      'NĂM 2026',
                      style: TextStyle(
                        fontSize: isMobile ? 16 : 20,
                        color: const Color(0xFF5C4A37),
                        letterSpacing: 1,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'THÁNG 01',
                  style: TextStyle(
                    fontSize: isMobile ? 16 : 20,
                    color: const Color(0xFF5C4A37),
                    letterSpacing: 1,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 40),
          // Location
          Column(
            children: [
              Text(
                'NHÀ HÀNG AI HƯƠNG 2',
                style: TextStyle(
                  fontSize: isMobile ? 18 : 24,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF5C4A37),
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                '338 Trần Hưng Đạo, Phường 11, Quận 5',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: isMobile ? 14 : 16,
                  color: const Color(0xFF5C4A37),
                ),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () {
                  // Open map
                },
                child: Text(
                  'Xem bản đồ',
                  style: TextStyle(
                    fontSize: isMobile ? 14 : 16,
                    color: const Color(0xFF8B1A1A),
                    decoration: TextDecoration.underline,
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
  final bool isMobile;

  const _EventButton({required this.text, required this.isMobile});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 16 : 24,
        vertical: isMobile ? 12 : 16,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFF8B6F47), width: 1),
      ),
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: isMobile ? 12 : 14,
          color: const Color(0xFF5C4A37),
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class _FamilyMember extends StatelessWidget {
  final String name;
  final bool isMobile;

  const _FamilyMember(this.name, this.isMobile);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        name,
        style: TextStyle(
          fontSize: isMobile ? 12 : 14,
          color: const Color(0xFF5C4A37),
        ),
      ),
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
                      Container(
                        width: double.infinity,
                        height: 250,
                        decoration: BoxDecoration(
                          color: const Color(0xFFD4C4B0),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Center(
                          child: Icon(
                            Icons.photo,
                            size: 50,
                            color: Colors.white70,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Container(
                        width: double.infinity,
                        height: 250,
                        decoration: BoxDecoration(
                          color: const Color(0xFFD4C4B0),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Center(
                          child: Icon(
                            Icons.photo,
                            size: 50,
                            color: Colors.white70,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
          if (isMobile) ...[
            const SizedBox(height: 20),
            Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                color: const Color(0xFFD4C4B0),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Icon(Icons.photo, size: 50, color: Colors.white70),
              ),
            ),
            const SizedBox(height: 20),
            Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                color: const Color(0xFFD4C4B0),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Icon(Icons.photo, size: 50, color: Colors.white70),
              ),
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
                          Container(
                            width: double.infinity,
                            height: 200,
                            decoration: BoxDecoration(
                              color: const Color(0xFFD4C4B0),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Center(
                              child: Icon(
                                Icons.photo,
                                size: 50,
                                color: Colors.white70,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          Container(
                            width: double.infinity,
                            height: 250,
                            decoration: BoxDecoration(
                              color: const Color(0xFFD4C4B0),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Center(
                              child: Icon(
                                Icons.photo,
                                size: 50,
                                color: Colors.white70,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
              if (isMobile) ...[
                const SizedBox(height: 20),
                Container(
                  width: double.infinity,
                  height: 180,
                  decoration: BoxDecoration(
                    color: const Color(0xFFD4C4B0),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Center(
                    child: Icon(Icons.photo, size: 50, color: Colors.white70),
                  ),
                ),
                const SizedBox(height: 20),
                Container(
                  width: double.infinity,
                  height: 220,
                  decoration: BoxDecoration(
                    color: const Color(0xFFD4C4B0),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Center(
                    child: Icon(Icons.photo, size: 50, color: Colors.white70),
                  ),
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
                    Container(
                      width: double.infinity,
                      height: isMobile ? 200 : 300,
                      decoration: BoxDecoration(
                        color: const Color(0xFFD4C4B0),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.photo,
                          size: 50,
                          color: Colors.white70,
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Container(
                      width: double.infinity,
                      height: isMobile ? 200 : 300,
                      decoration: BoxDecoration(
                        color: const Color(0xFFD4C4B0),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.photo,
                          size: 50,
                          color: Colors.white70,
                        ),
                      ),
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
            Expanded(
              flex: 3,
              child: Container(
                height: 350,
                decoration: BoxDecoration(
                  color: const Color(0xFFD4C4B0),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(
                  child: Icon(Icons.photo, size: 50, color: Colors.white70),
                ),
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
