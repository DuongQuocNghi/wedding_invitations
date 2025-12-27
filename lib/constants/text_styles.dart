import 'package:flutter/material.dart';
import 'colors.dart';

class AppTextStyles {
  // Welcome title - Bellefair
  static TextStyle welcomeTitle = const TextStyle(
    fontFamily: 'Bellefair',
    fontWeight: FontWeight.w400,
    fontSize: 27.31,
    height: 1.0,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Welcome text - Sarabun Light
  static TextStyle welcomeText = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.textGray,
  );

  // Section title - Alex Brush
  static TextStyle sectionTitle = const TextStyle(
    fontFamily: 'AlexBrush',
    fontWeight: FontWeight.w400,
    fontSize: 50,
    height: 0.8,
    color: AppColors.textHighlight,
  );

  // Section footer - Brush Script MT (fallback to cursive)
  // Note: Brush Script MT may not be available, using AlexBrush as fallback
  static TextStyle sectionFooter = TextStyle(
    fontFamily: 'AlexBrush',
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 140,
    height: 0.43,
    letterSpacing: -4,
    color: AppColors.accent.withValues(alpha: 0.08),
  );

  // Text italic - Sarabun Regular Italic
  static TextStyle textItalic = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 10,
    height: 1.6,
    color: AppColors.textGray,
  );

  // Text body - Sarabun Light
  static TextStyle textBody = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.textGray,
  );

  // Text body light - Sarabun Light with light color
  static TextStyle textBodyLight = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.surfaceLight,
  );

  // Family label - B612 Bold
  static TextStyle familyLabel = const TextStyle(
    fontFamily: 'B612',
    fontWeight: FontWeight.w500,
    fontSize: 10,
    height: 1.2,
    letterSpacing: 0.1,
    color: AppColors.textBrown,
  );

  // Family member title - B612 Regular
  static TextStyle familyMemberTitle = const TextStyle(
    fontFamily: 'B612',
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.2,
    color: AppColors.textBrown,
  );

  // Family member name - B612 Bold
  static TextStyle familyMemberName = const TextStyle(
    fontFamily: 'B612',
    fontWeight: FontWeight.w600,
    fontSize: 10,
    height: 1.2,
    letterSpacing: 0.05,
    color: AppColors.textBrown,
  );

  // Invitation text - Aboreto
  static TextStyle invitationText = const TextStyle(
    fontFamily: 'Aboreto',
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    color: AppColors.textBrown,
  );

  // Event day - ABeeZee
  static TextStyle eventDay = const TextStyle(
    fontFamily: 'ABeeZee',
    fontWeight: FontWeight.w400,
    fontSize: 14,
    height: 1.2,
    letterSpacing: 0.05,
    color: AppColors.textBrown,
  );

  // Event time - ABeeZee
  static TextStyle eventTime = const TextStyle(
    fontFamily: 'ABeeZee',
    fontWeight: FontWeight.w400,
    fontSize: 12,
    height: 1.2,
    color: AppColors.textBrown,
  );

  // Event date number - B612 Bold
  static TextStyle eventDateNumber = const TextStyle(
    fontFamily: 'B612',
    fontWeight: FontWeight.w500,
    fontSize: 32,
    height: 1.0,
    letterSpacing: 0.07,
    color: AppColors.textHighlight,
  );

  // Event month/year - Source Sans Pro Regular
  static TextStyle eventMonthYear = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 14,
    height: 1.43,
    letterSpacing: 0.09,
    color: AppColors.textHighlight,
  );

  // Location label - Source Sans Pro Light
  static TextStyle locationLabel = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.0,
    color: AppColors.textGray,
  );

  // Location name - Source Sans Pro Regular
  static TextStyle locationName = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Location address - Source Sans Pro Regular
  static TextStyle locationAddress = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Tab button - Source Sans Pro
  static TextStyle tabButton = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 18,
    height: 1.56,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Tab button active - Source Sans Pro
  static TextStyle tabButtonActive = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 18,
    height: 1.56,
    letterSpacing: 0.07,
    color: AppColors.textHighlight,
  );

  // Quote text - Sarabun Regular Italic
  static TextStyle quoteText = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 12,
    height: 1.67,
    color: AppColors.white,
  );

  // Quote description - Sarabun Light
  static TextStyle quoteDescription = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.6,
    color: AppColors.white,
  );

  // Thank you title - Castoro Titling
  static TextStyle thankYouTitle = const TextStyle(
    fontFamily: 'CastoroTitling',
    fontWeight: FontWeight.w400,
    fontSize: 24,
    height: 1.2,
    letterSpacing: 0.1,
    color: AppColors.bgPrimary,
  );

  // Thank you text - Sarabun Light
  static TextStyle thankYouText = const TextStyle(
    fontFamily: 'Sarabun',
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.6,
    color: AppColors.bgPrimary,
  );

  // Map link button - Source Sans Pro Regular
  static TextStyle mapLinkButton = const TextStyle(
    fontFamily: 'SourceSansPro',
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.link,
    decoration: TextDecoration.underline,
  );
}
