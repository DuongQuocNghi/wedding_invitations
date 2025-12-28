import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'constants/colors.dart';
import 'widgets/header_section.dart';
import 'widgets/welcome_section.dart';
import 'widgets/event_details_section.dart';
import 'widgets/quote_section.dart';
import 'widgets/memories_section.dart';
import 'widgets/dating_section.dart';
import 'widgets/ceremony_section.dart';
import 'widgets/together_section.dart';
import 'widgets/album_section.dart';
import 'widgets/thank_you_section.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Set preferred orientations
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Optimize for web performance
  if (const bool.fromEnvironment('dart.vm.product')) {
    // Production optimizations
    debugPrint = (String? message, {int? wrapWidth}) {}; // Disable debug prints
  }

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Thiệp Cưới Nghi & Lan',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: AppColors.bgPrimary,
        scaffoldBackgroundColor: AppColors.bgPrimary,
        textTheme: GoogleFonts.sarabunTextTheme(),
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.accent,
          primary: AppColors.accent,
          surface: AppColors.bgPrimary,
        ),
        // Optimize material rendering for web
        useMaterial3: true,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const WeddingInvitationPage(),
    );
  }
}

class WeddingInvitationPage extends StatefulWidget {
  const WeddingInvitationPage({super.key});

  @override
  State<WeddingInvitationPage> createState() => _WeddingInvitationPageState();
}

class _WeddingInvitationPageState extends State<WeddingInvitationPage> {
  // Track which sections should be loaded
  // Load critical sections immediately, lazy load others
  bool _showQuoteSection = false;
  bool _showMemoriesSection = false;
  bool _showDatingSection = false;
  bool _showCeremonySection = false;
  bool _showTogetherSection = false;
  bool _showAlbumSection = false;
  bool _showThankYouSection = false;

  @override
  void initState() {
    super.initState();
    // Load critical sections immediately
    // Load non-critical sections after a short delay to improve initial render
    WidgetsBinding.instance.addPostFrameCallback((_) {
      // Load sections progressively to avoid blocking initial render
      Future.delayed(const Duration(milliseconds: 100), () {
        if (mounted) setState(() => _showQuoteSection = true);
      });
      Future.delayed(const Duration(milliseconds: 200), () {
        if (mounted) setState(() => _showMemoriesSection = true);
      });
      Future.delayed(const Duration(milliseconds: 300), () {
        if (mounted) setState(() => _showDatingSection = true);
      });
      Future.delayed(const Duration(milliseconds: 400), () {
        if (mounted) setState(() => _showCeremonySection = true);
      });
      Future.delayed(const Duration(milliseconds: 500), () {
        if (mounted) setState(() => _showTogetherSection = true);
      });
      Future.delayed(const Duration(milliseconds: 600), () {
        if (mounted) setState(() => _showAlbumSection = true);
      });
      Future.delayed(const Duration(milliseconds: 700), () {
        if (mounted) setState(() => _showThankYouSection = true);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: SingleChildScrollView(
        physics: const ClampingScrollPhysics(),
        child: Column(
          children: [
            // Critical sections - load immediately (above fold)
            const HeaderSection(),
            const WelcomeSection(),
            const EventDetailsSection(),
            // Non-critical sections - lazy load
            if (_showQuoteSection) const QuoteSection(),
            if (_showMemoriesSection) const MemoriesSection(),
            if (_showDatingSection) const DatingSection(),
            if (_showCeremonySection) const CeremonySection(),
            if (_showTogetherSection) const TogetherSection(),
            if (_showAlbumSection) const AlbumSection(),
            if (_showThankYouSection) const ThankYouSection(),
          ],
        ),
      ),
    );
  }
}
