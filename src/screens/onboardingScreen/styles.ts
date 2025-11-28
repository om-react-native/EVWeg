import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '@/theme/metrics';
import { scaledFontSize } from '@/theme/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(24),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  slide: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(24),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  illustrationContainer: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationImage: {
    width: scale(300),
    height: verticalScale(300),
  },
  slideTitle: {
    fontSize: scaledFontSize(28),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: verticalScale(12),
  },
  slideDescription: {
    fontSize: scaledFontSize(15),
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: scale(12),
  },
  footer: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(16),
  },
  progressBarContainer: {
    height: verticalScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
    marginBottom: verticalScale(16),
  },
  progressBarFill: {
    height: '100%',
    borderRadius: moderateScale(2),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginHorizontal: scale(4),
  },
  primaryButton: {
    height: verticalScale(56),
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
  skipPill: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  skipPillText: {
    fontSize: scaledFontSize(14),
    fontWeight: '500',
  },
});

