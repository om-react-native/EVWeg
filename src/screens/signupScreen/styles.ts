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
  title: {
    fontSize: scaledFontSize(32),
    fontWeight: '700',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaledFontSize(16),
    fontWeight: '400',
    marginBottom: verticalScale(32),
    textAlign: 'center',
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
  inputIcon: {
    marginRight: scale(12),
  },
  input: {
    flex: 1,
    fontSize: scaledFontSize(16),
    fontWeight: '400',
  },
  eyeIcon: {
    padding: scale(4),
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
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },
  submitButtonText: {
    fontSize: scaledFontSize(16),
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: scaledFontSize(14),
    fontWeight: '400',
  },
  loginLink: {
    fontSize: scaledFontSize(14),
    fontWeight: '600',
  },
});

