import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { Phone } from 'lucide-react-native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTheme } from '@/theme/useTheme';
import { EVWegLogo } from '@/assets/svg';
import { googleImage, appleImage } from '@/assets/images';
import { styles } from './styles';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginFormData {
  phoneNumber: string;
}

// Placeholder functions for social sign-in
const handleGoogleSignIn = async (navigation: LoginScreenNavigationProp) => {
  console.log('Google sign-in clicked');
  // TODO: Implement Google sign-in
  // After successful sign-in, navigate to CompleteProfile
  navigation.navigate('CompleteProfile');
};

const handleAppleSignIn = async (navigation: LoginScreenNavigationProp) => {
  console.log('Apple sign-in clicked');
  // TODO: Implement Apple sign-in
  // After successful sign-in, navigate to CompleteProfile
  navigation.navigate('CompleteProfile');
};

// Placeholder function for sending OTP
const sendOTP = async (phone: string) => {
  console.log('Sending OTP to:', phone);
  // TODO: Implement SMS OTP API call
  return true;
};

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await sendOTP(data.phoneNumber);
      navigation.navigate('OTP', {
        type: 'phone',
        value: data.phoneNumber,
      });
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const isPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return /^[0-9]{10}$/.test(cleaned);
  };

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
          <View style={styles.descriptionContainer}>
            <Text
              style={[
                styles.description,
                { color: theme.colors.text.secondary },
              ]}
            >
              Discover and access{' '}
              <Text
                style={[
                  styles.descriptionBold,
                  { color: theme.colors.text.primary },
                ]}
              >
                EV charging stations
              </Text>{' '}
              near you.{' '}
              <Text
                style={[
                  styles.descriptionBold,
                  { color: theme.colors.text.primary },
                ]}
              >
                Charge your vehicle
              </Text>{' '}
              seamlessly and{' '}
              <Text
                style={[
                  styles.descriptionBold,
                  { color: theme.colors.text.primary },
                ]}
              >
                pay securely
              </Text>{' '}
              with EVWeg.
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Mobile Number
              </Text>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: 'Mobile number is required',
                  validate: value => {
                    if (!isPhone(value)) {
                      return 'Please enter a valid 10-digit mobile number';
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.phoneNumber
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <View style={styles.countryCodeContainer}>
                      <Text style={[styles.flagEmoji, { fontSize: 20 }]}>
                        🇮🇳
                      </Text>
                      <Text
                        style={[
                          styles.countryCode,
                          { color: theme.colors.text.primary },
                        ]}
                      >
                        +91
                      </Text>
                    </View>
                    <Phone
                      size={20}
                      color={
                        errors.phoneNumber
                          ? '#FF6B6B'
                          : theme.colors.text.tertiary
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: theme.colors.text.primary,
                        },
                      ]}
                      placeholder="Enter your mobile number"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={text => {
                        const cleaned = text.replace(/\D/g, '');
                        if (cleaned.length <= 10) {
                          onChange(cleaned);
                        }
                      }}
                      keyboardType="phone-pad"
                      maxLength={10}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.phoneNumber && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            {/* Send OTP Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: theme.colors.buttons.primary.background,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  { color: theme.colors.buttons.primary.text },
                ]}
              >
                Send OTP
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: theme.colors.borders.light },
                ]}
              />
              <Text
                style={[
                  styles.dividerText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                OR
              </Text>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: theme.colors.borders.light },
                ]}
              />
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: theme.colors.backgrounds.card,
                  borderColor: theme.colors.borders.light,
                },
              ]}
              onPress={() => handleGoogleSignIn(navigation)}
            >
              <Image
                source={googleImage}
                style={styles.socialIconImage}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.socialButtonText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Apple Sign-In Button */}
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: theme.colors.backgrounds.card,
                    borderColor: theme.colors.borders.light,
                  },
                ]}
                onPress={() => handleAppleSignIn(navigation)}
              >
                <Image
                  source={appleImage}
                  style={styles.socialIconImage}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.socialButtonText,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
