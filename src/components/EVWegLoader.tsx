import React from 'react';
import { Modal, View, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { useTheme } from '@/theme/useTheme';

interface EVWegLoaderProps {
  visible: boolean;
  text?: string;
}

export const EVWegLoader: React.FC<EVWegLoaderProps> = ({ visible, text }) => {
  const theme = useTheme();

  const primary = theme.colors.buttons.primary.background;

  // Make halo size and style responsive to context

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.backgrounds.card,
              borderColor: theme.colors.borders.light,
              shadowColor: primary,
            },
          ]}
        >
          <ActivityIndicator
            color={theme.colors.buttons.primary.background}
            size="large"
          />
          {text ? (
            <Text
              style={[
                styles.text,
                {
                  color: theme.colors.text.primary,
                },
              ]}
            >
              {text}
            </Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 120,
    height: 120,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: StyleSheet.hairlineWidth,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  halo: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
});
