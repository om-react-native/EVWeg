import React from 'react';
import { Platform, StatusBar, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useThemeContext } from '@/theme/useTheme';
import { AppNavigator } from '@/navigation/AppNavigator';

// Ensure all text respects system font scaling by default.
// React Native's type definitions don't expose `defaultProps`, so we cast to `any`.
const TextAny = Text as any;
const TextInputAny = TextInput as any;

if (!TextAny.defaultProps) {
  TextAny.defaultProps = {};
}
if (!TextInputAny.defaultProps) {
  TextInputAny.defaultProps = {};
}
TextAny.defaultProps.allowFontScaling = true;
TextInputAny.defaultProps.allowFontScaling = true;

function AppContent() {
  const { isDark, theme } = useThemeContext();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={
          Platform.OS === 'android'
            ? theme.colors.backgrounds.primary
            : 'transparent'
        }
        translucent={Platform.OS !== 'android'}
      />
      <AppNavigator />
    </>
  );
}

const styles = {
  gestureRoot: { flex: 1 },
};

function App() {
  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
