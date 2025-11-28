import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Wallet, MessageCircle, Route } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/useTheme';
import { MapScreen } from '@/screens/mapScreen';
import { WalletScreen } from '@/screens/walletScreen';
import { BuzzScreen } from '@/screens/buzzScreen';
import { TripsScreen } from '@/screens/tripsScreen';

export type BottomTabParamList = {
  Map: undefined;
  Wallet: undefined;
  Buzz: undefined;
  Trips: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.buttons.primary.background,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.backgrounds.card,
          borderTopColor: theme.colors.borders.light,
          borderTopWidth: 1,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          // Let the tab bar grow with safe area instead of hard-coding height
          // This keeps it above the gesture bar / navigation buttons on iOS & Android
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Buzz"
        component={BuzzScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Route size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
