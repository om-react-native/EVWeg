import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [vehicleNumber, setVehicleNumber] = React.useState('');

  const snapPoints = useMemo(() => ['50%'], []);

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
        setVehicleNumber('');
      }
    },
    [onClose],
  );

  const handleSubmit = () => {
    if (vehicleNumber.trim()) {
      onSubmit(vehicleNumber.trim());
      setVehicleNumber('');
      bottomSheetRef.current?.close();
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  if (!vehicle) {
    return null;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: theme.colors.backgrounds.card,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.borders.medium,
      }}
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
          style={[styles.instruction, { color: theme.colors.text.secondary }]}
        >
          Enter your {vehicle.name} registration number.
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
          Just once! Register your vehicle now, and we'll remember it for you.
        </Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
