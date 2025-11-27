import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTheme } from '@/theme/useTheme';
import { EVWegLogo } from '@/assets/svg';
import { styles } from './styles';

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;

// Placeholder functions for OTP verification
const verifyOTP = async (phone: string, otp: string) => {
  console.log('Verifying OTP:', phone, otp);
  // TODO: Implement OTP verification API
  return true;
};

const verifyEmailOTP = async (email: string, otp: string) => {
  console.log('Verifying Email OTP:', email, otp);
  // TODO: Implement email OTP verification API
  return true;
};

const resendOTP = async (type: 'phone' | 'email', value: string) => {
  console.log('Resending OTP to:', type, value);
  // TODO: Implement resend OTP API
  return true;
};

export const OTPScreen: React.FC = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const theme = useTheme();
  const { type, value } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10) {
      return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  };

  const handleOtpChange = (index: number, text: string) => {
    if (text.length > 1) {
      // Handle paste
      const digits = text.replace(/\D/g, '').slice(0, 6);
      const newOtp = [...otp];
      digits.split('').forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus last filled input
      const lastIndex = Math.min(index + digits.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (index === 5 && text && newOtp.every(digit => digit !== '')) {
      handleVerify();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      return;
    }

    setIsLoading(true);
    try {
      let success = false;
      if (type === 'phone') {
        success = await verifyOTP(value, otpString);
        if (success) {
          navigation.replace('CompleteProfile');
        }
      } else {
        success = await verifyEmailOTP(value, otpString);
        if (success) {
          // Navigate to home screen (placeholder)
          navigation.replace('Login');
        }
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) {
      return;
    }

    try {
      await resendOTP(type, value);
      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const description =
    type === 'phone'
      ? `Enter the 6-digit code sent to ${formatPhoneNumber(value)}`
      : `Enter the 6-digit code sent to ${value}`;

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgrounds.primary },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <EVWegLogo width={280} height={84} variant="light" />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Enter Verification Code
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.text.secondary }]}
          >
            {description}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  {
                    backgroundColor: theme.colors.backgrounds.card,
                    borderColor: digit
                      ? theme.colors.buttons.primary.background
                      : theme.colors.borders.light,
                    color: theme.colors.text.primary,
                  },
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(index, text)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, nativeEvent.key)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              {
                backgroundColor:
                  otp.join('').length === 6
                    ? theme.colors.buttons.primary.background
                    : theme.colors.borders.light,
              },
            ]}
            onPress={handleVerify}
            disabled={otp.join('').length !== 6 || isLoading}
          >
            <Text
              style={[
                styles.verifyButtonText,
                {
                  color:
                    otp.join('').length === 6
                      ? theme.colors.buttons.primary.text
                      : theme.colors.text.tertiary,
                },
              ]}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text
              style={[
                styles.resendText,
                { color: theme.colors.text.secondary },
              ]}
            >
              Didn't receive the code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Text
                style={[
                  styles.resendLink,
                  {
                    color: canResend
                      ? theme.colors.text.link
                      : theme.colors.text.tertiary,
                  },
                ]}
              >
                {canResend ? 'Resend' : `Resend in ${resendTimer}s`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
