import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { User, Mail } from 'lucide-react-native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTheme } from '@/theme/useTheme';
import { EVWegLogo } from '@/assets/svg';
import { styles } from './styles';

type CompleteProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CompleteProfile'
>;

interface CompleteProfileFormData {
  fullName: string;
  email: string;
}

// Placeholder function for sending email OTP
const sendEmailOTP = async (email: string) => {
  console.log('Sending email OTP to:', email);
  // TODO: Implement email OTP API call
  return true;
};

export const CompleteProfileScreen: React.FC = () => {
  const navigation = useNavigation<CompleteProfileScreenNavigationProp>();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (data: CompleteProfileFormData) => {
    try {
      await sendEmailOTP(data.email);
      navigation.navigate('OTP', {
        type: 'email',
        value: data.email,
      });
    } catch (error) {
      console.error('Failed to send email OTP:', error);
    }
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
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Complete Your Profile
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.text.secondary }]}
          >
            Let's complete your profile to get started with EVWeg
          </Text>

          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Full Name
              </Text>
              <Controller
                control={control}
                name="fullName"
                rules={{
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.fullName
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <User
                      size={20}
                      color={
                        errors.fullName ? '#FF6B6B' : theme.colors.text.tertiary
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
                      placeholder="Enter your full name"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.fullName && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.fullName.message}
                </Text>
              )}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.email
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <Mail
                      size={20}
                      color={
                        errors.email ? '#FF6B6B' : theme.colors.text.tertiary
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
                      placeholder="Enter your email"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
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
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
