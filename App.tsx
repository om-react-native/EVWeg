import React from 'react';
import { StatusBar, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useThemeContext } from '@/theme/useTheme';
import { AppNavigator } from '@/navigation/AppNavigator';

// Ensure all text respects system font scaling by default
if (!Text.defaultProps) {
  Text.defaultProps = {};
}
if (!TextInput.defaultProps) {
  TextInput.defaultProps = {};
}
Text.defaultProps.allowFontScaling = true;
TextInput.defaultProps.allowFontScaling = true;

function AppContent() {
  const { isDark } = useThemeContext();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
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
