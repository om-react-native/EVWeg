import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

export const BuzzScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgrounds.primary },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Buzz
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
        Latest updates and news
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
