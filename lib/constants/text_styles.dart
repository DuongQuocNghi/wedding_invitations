import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'colors.dart';

class AppTextStyles {
  // Welcome title - Sarabun (replaced Bellefair to reduce font requests)
  static TextStyle get welcomeTitle => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontSize: 27.31,
    height: 1.0,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Welcome text - Sarabun Light
  static TextStyle get welcomeText => GoogleFonts.sarabun(
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.textGray,
  );

  // Section title - Alex Brush
  static TextStyle get sectionTitle => GoogleFonts.alexBrush(
    fontWeight: FontWeight.w400,
    fontSize: 50,
    height: 0.8,
    color: AppColors.textHighlight,
  );

  // Section footer - Alex Brush with large size
  static TextStyle get sectionFooter => GoogleFonts.alexBrush(
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 140,
    height: 0.43,
    letterSpacing: -4,
    color: AppColors.accent.withValues(alpha: 0.08),
  );

  // Text italic - Sarabun Regular Italic
  static TextStyle get textItalic => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 10,
    height: 1.6,
    color: AppColors.textGray,
  );

  // Text body - Sarabun Light
  static TextStyle get textBody => GoogleFonts.sarabun(
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.textGray,
  );

  // Text body light - Sarabun Light with light color
  static TextStyle get textBodyLight => GoogleFonts.sarabun(
    fontWeight: FontWeight.w300,
    fontSize: 12,
    height: 1.67,
    color: AppColors.surfaceLight,
  );

  // Family label - Sarabun (replaced B612 to reduce font requests)
  static TextStyle get familyLabel => GoogleFonts.sarabun(
    fontWeight: FontWeight.w600,
    fontSize: 10,
    height: 1.2,
    letterSpacing: 0.1,
    color: AppColors.textBrown,
  );

  // Family member title - Sarabun (replaced B612 to reduce font requests)
  static TextStyle get familyMemberTitle => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.2,
    color: AppColors.textBrown,
  );

  // Family member name - Sarabun (replaced B612 to reduce font requests)
  static TextStyle get familyMemberName => GoogleFonts.sarabun(
    fontWeight: FontWeight.w700,
    fontSize: 10,
    height: 1.2,
    letterSpacing: 0.05,
    color: AppColors.textBrown,
  );

  // Invitation text - Sarabun (replaced Aboreto to reduce font requests)
  static TextStyle get invitationText => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    color: AppColors.textBrown,
  );

  // Event day - Sarabun (replaced ABeeZee to reduce font requests)
  static TextStyle get eventDay => GoogleFonts.sarabun(
    fontWeight: FontWeight.w500,
    fontSize: 14,
    height: 1.2,
    letterSpacing: 0.05,
    color: AppColors.textBrown,
  );

  // Event time - Sarabun (replaced ABeeZee to reduce font requests)
  static TextStyle get eventTime => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontSize: 12,
    height: 1.2,
    color: AppColors.textBrown,
  );

  // Event date number - Sarabun (replaced B612 to reduce font requests)
  static TextStyle get eventDateNumber => GoogleFonts.sarabun(
    fontWeight: FontWeight.w700,
    fontSize: 32,
    height: 1.0,
    letterSpacing: 0.07,
    color: AppColors.textHighlight,
  );

  // Event month/year - Sansita Swashed Regular
  static TextStyle get eventMonthYear => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 14,
    height: 1.43,
    letterSpacing: 0.09,
    color: AppColors.textHighlight,
  );

  // Location label - Sansita Swashed Light
  static TextStyle get locationLabel => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.0,
    color: AppColors.textGray,
  );

  // Location name - Sansita Swashed Regular
  static TextStyle get locationName => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Location address - Sansita Swashed Regular
  static TextStyle get locationAddress => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Tab button - Sansita Swashed
  static TextStyle get tabButton => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 18,
    height: 1.56,
    letterSpacing: 0.07,
    color: AppColors.textGray,
  );

  // Tab button active - Sansita Swashed
  static TextStyle get tabButtonActive => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 18,
    height: 1.56,
    letterSpacing: 0.07,
    color: AppColors.textHighlight,
  );

  // Quote text - Sarabun Regular Italic
  static TextStyle get quoteText => GoogleFonts.sarabun(
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    fontSize: 12,
    height: 1.67,
    color: AppColors.white,
  );

  // Quote description - Sarabun Light
  static TextStyle get quoteDescription => GoogleFonts.sarabun(
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.6,
    color: AppColors.white,
  );

  // Thank you title - Sansita Swashed (replaced Castoro Titling to reduce font requests)
  static TextStyle get thankYouTitle => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 24,
    height: 1.2,
    letterSpacing: 0.1,
    color: AppColors.bgPrimary,
  );

  // Thank you text - Sarabun Light
  static TextStyle get thankYouText => GoogleFonts.sarabun(
    fontWeight: FontWeight.w300,
    fontSize: 10,
    height: 1.6,
    color: AppColors.bgPrimary,
  );

  // Map link button - Sansita Swashed Regular
  static TextStyle get mapLinkButton => GoogleFonts.sansitaSwashed(
    fontWeight: FontWeight.w400,
    fontSize: 10,
    height: 1.6,
    letterSpacing: 0.07,
    color: AppColors.link,
    decoration: TextDecoration.underline,
  );
}
