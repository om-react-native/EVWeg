import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '@/theme/metrics';
import { scaledFontSize } from '@/theme/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(48),
    marginTop: verticalScale(20),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: scaledFontSize(32),
    fontWeight: '700',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  description: {
    fontSize: scaledFontSize(16),
    fontWeight: '400',
    marginBottom: verticalScale(32),
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(32),
    paddingHorizontal: scale(20),
  },
  otpInput: {
    width: scale(48),
    height: verticalScale(56),
    borderWidth: 2,
    borderRadius: moderateScale(12),
    fontSize: scaledFontSize(24),
    fontWeight: '600',
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    height: verticalScale(56),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  verifyButtonText: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: scaledFontSize(14),
    fontWeight: '400',
  },
  resendLink: {
    fontSize: scaledFontSize(14),
    fontWeight: '600',
  },
});

