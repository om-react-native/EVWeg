import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useTheme } from '@/theme/useTheme';
import { Vehicle } from '@/data/mockVehicles';

interface VehicleNumberBottomSheetProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (vehicleNumber: string) => void;
}

export const VehicleNumberBottomSheet: React.FC<
  VehicleNumberBottomSheetProps
> = ({ vehicle, isOpen, onClose, onSubmit }) => {
  const theme = useTheme();
  const [vehicleNumber, setVehicleNumber] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [activeVehicle, setActiveVehicle] = React.useState<Vehicle | null>(
    null,
  );
  const animation = useRef(new Animated.Value(0)).current;

  const animateTo = useCallback(
    (toValue: 0 | 1, callback?: () => void) => {
      Animated.timing(animation, {
        toValue,
        duration: toValue === 1 ? 300 : 250,
        easing:
          toValue === 1 ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => callback?.());
    },
    [animation],
  );

  const closeSheet = useCallback(
    (shouldNotifyParent = true) => {
      animateTo(0, () => {
        setVisible(false);
        setVehicleNumber('');
        setActiveVehicle(null);
        if (shouldNotifyParent) {
          onClose();
        }
      });
    },
    [animateTo, onClose],
  );

  const openSheet = useCallback(() => {
    setVisible(true);
    requestAnimationFrame(() => animateTo(1));
  }, [animateTo]);

  React.useEffect(() => {
    if (isOpen && vehicle) {
      setActiveVehicle(vehicle);
      openSheet();
    } else if (!isOpen && visible) {
      closeSheet(false);
    }
  }, [closeSheet, isOpen, openSheet, vehicle, visible]);

  const handleSubmit = () => {
    if (!vehicleNumber.trim() || !activeVehicle) {
      return;
    }
    onSubmit(vehicleNumber.trim());
    closeSheet(true);
  };

  const handleBackdropPress = () => {
    closeSheet(true);
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Fixed height for smooth animation
  });

  const backdropOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (!visible && !isOpen) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleBackdropPress}
    >
      <KeyboardAvoidingView
        style={styles.modalWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.backgrounds.card,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Enter your Vehicle Number
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.colors.backgrounds.secondary,
                  borderColor: theme.colors.borders.light,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: theme.colors.text.primary }]}
                placeholder="Vehicle Number"
                placeholderTextColor={theme.colors.text.tertiary}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            <Text
              style={[
                styles.instruction,
                { color: theme.colors.text.secondary },
              ]}
            >
              Enter your {activeVehicle?.name ?? 'vehicle'} registration number.
            </Text>

            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor:
                    vehicleNumber.trim().length > 0
                      ? theme.colors.buttons.primary.background
                      : theme.colors.borders.light,
                },
              ]}
              onPress={handleSubmit}
              disabled={vehicleNumber.trim().length === 0}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  {
                    color:
                      vehicleNumber.trim().length > 0
                        ? theme.colors.buttons.primary.text
                        : theme.colors.text.tertiary,
                  },
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>

            <Text
              style={[styles.footerText, { color: theme.colors.text.tertiary }]}
            >
              Just once! Register your vehicle now, and we'll remember it for
              you.
            </Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
