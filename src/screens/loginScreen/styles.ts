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
  },
  descriptionContainer: {
    marginBottom: verticalScale(32),
    paddingHorizontal: scale(20),
  },
  description: {
    fontSize: scaledFontSize(16),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: scaledFontSize(16) * 1.5,
  },
  descriptionBold: {
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontSize: scaledFontSize(14),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
    paddingRight: scale(8),
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  flagEmoji: {
    marginRight: scale(4),
  },
  countryCode: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
  inputIcon: {
    marginRight: scale(12),
  },
  input: {
    flex: 1,
    fontSize: scaledFontSize(16),
    fontWeight: '400',
  },
  errorText: {
    fontSize: scaledFontSize(12),
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
  submitButton: {
    height: verticalScale(56),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  submitButtonText: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(24),
  },
  dividerLine: {
    flex: 1,
    height: verticalScale(1),
  },
  dividerText: {
    fontSize: scaledFontSize(14),
    fontWeight: '500',
    marginHorizontal: scale(16),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(56),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    marginBottom: verticalScale(12),
  },
  socialIconImage: {
    width: scale(20),
    height: verticalScale(20),
    marginRight: scale(12),
  },
  socialButtonText: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
});

