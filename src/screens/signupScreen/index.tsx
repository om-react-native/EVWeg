import React, { useState } from 'react';
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
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react-native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTheme } from '@/theme/useTheme';
import { EVWegLogo } from '@/assets/svg';
import { styles } from './styles';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CompleteProfile'
>;

interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    // Handle signup logic here
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
            Create Account
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Sign up to get started with EVWeg
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

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Phone Number
              </Text>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.phone
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <Phone
                      size={20}
                      color={
                        errors.phone ? '#FF6B6B' : theme.colors.text.tertiary
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
                      placeholder="Enter your phone number"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.phone.message}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.password
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <Lock
                      size={20}
                      color={
                        errors.password ? '#FF6B6B' : theme.colors.text.tertiary
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
                      placeholder="Enter password"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={theme.colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={theme.colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match',
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.colors.backgrounds.card,
                        borderColor: errors.confirmPassword
                          ? '#FF6B6B'
                          : theme.colors.borders.light,
                      },
                    ]}
                  >
                    <Lock
                      size={20}
                      color={
                        errors.confirmPassword
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
                      placeholder="Confirm password"
                      placeholderTextColor={theme.colors.text.tertiary}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.eyeIcon}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color={theme.colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={theme.colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text style={[styles.errorText, { color: '#FF6B6B' }]}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            {/* Sign Up Button */}
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
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text
                style={[
                  styles.loginText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={[styles.loginLink, { color: theme.colors.text.link }]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
