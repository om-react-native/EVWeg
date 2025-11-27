import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingScreen } from '@/screens/onboardingScreen';
import { LoginScreen } from '@/screens/loginScreen';
import { OTPScreen } from '@/screens/otpScreen';
import { CompleteProfileScreen } from '@/screens/completeProfileScreen';
import { VehicleSelectionScreen } from '@/screens/vehicleSelectionScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OTP: { type: 'phone' | 'email'; value: string };
  CompleteProfile: undefined;
  VehicleSelection: undefined;
  MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    const init = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          '@evwegapp:has_seen_onboarding',
        );
        if (hasSeenOnboarding === 'true') {
          setInitialRoute('Login');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (error) {
        console.warn('Failed to load onboarding state', error);
        setInitialRoute('Onboarding');
      }
    };

    init();
  }, []);

  if (!initialRoute) {
    // Simple placeholder while we determine initial route
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
        <Stack.Screen
          name="VehicleSelection"
          component={VehicleSelectionScreen}
        />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
