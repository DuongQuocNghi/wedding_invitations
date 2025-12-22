import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
        fontFamily: 'Sarabun',
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.accent,
          primary: AppColors.accent,
          surface: AppColors.bgPrimary,
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
      backgroundColor: AppColors.bgPrimary,
      body: SingleChildScrollView(
        child: Column(
          children: const [
            HeaderSection(),
            WelcomeSection(),
            EventDetailsSection(),
            QuoteSection(),
            MemoriesSection(),
            DatingSection(),
            CeremonySection(),
            TogetherSection(),
            AlbumSection(),
            ThankYouSection(),
          ],
        ),
      ),
    );
  }
}
