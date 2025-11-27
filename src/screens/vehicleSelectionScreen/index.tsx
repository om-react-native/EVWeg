import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';
import { mockVehicles, BRANDS, Vehicle } from '@/data/mockVehicles';
import { VehicleNumberBottomSheet } from '@/components/VehicleNumberBottomSheet';
import { styles } from './styles';

export const VehicleSelectionScreen: React.FC = () => {
  const theme = useTheme();
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const flatListRef = useRef<FlatList<Vehicle>>(null);

  const filteredVehicles = useMemo(() => {
    let filtered = mockVehicles;

    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(vehicle => vehicle.brand === selectedBrand);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        vehicle =>
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.brand.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [selectedBrand, searchQuery]);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBottomSheetOpen(true);
  };

  const handleAddVehicle = () => {
    if (selectedVehicle) {
      setIsBottomSheetOpen(true);
    }
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
    // Don't clear selectedVehicle here - user might want to try again
  };

  const handleVehicleSubmit = (vehicleNumber: string) => {
    console.log('Vehicle registered:', {
      vehicle: selectedVehicle,
      vehicleNumber,
    });
    // TODO: Implement API call to register vehicle
    handleBottomSheetClose();
    setSelectedVehicle(null); // Clear selection after successful submission
    // TODO: Navigate to next screen after successful registration
  };

  const renderBrandTab = (brand: string) => {
    const isActive = selectedBrand === brand;
    return (
      <TouchableOpacity
        key={brand}
        style={[
          styles.brandTab,
          isActive && [
            styles.brandTabActive,
            { borderBottomColor: theme.colors.buttons.primary.background },
          ],
        ]}
        onPress={() => {
          // Reset list scroll position when changing brand so layout stays consistent
          flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
          setSelectedBrand(brand);
        }}
      >
        <Text
          style={[
            styles.brandTabText,
            {
              color: isActive
                ? theme.colors.text.primary
                : theme.colors.text.tertiary,
              fontWeight: isActive ? '600' : '400',
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {brand}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVehicleCard = ({ item }: { item: Vehicle }) => {
    const isSelected = selectedVehicle?.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.vehicleCard,
          { backgroundColor: theme.colors.backgrounds.card },
          isSelected && [
            styles.vehicleCardSelected,
            { borderColor: theme.colors.buttons.primary.background },
          ],
        ]}
        onPress={() => handleVehicleSelect(item)}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.vehicleImage}
          resizeMode="cover"
          onError={() => {
            // Image failed to load - placeholder will show background color
            console.warn(`Failed to load image for ${item.name}`);
          }}
        />
        <Text
          style={[styles.vehicleName, { color: theme.colors.text.primary }]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgrounds.primary },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Select your vehicle
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandTabsContainer}
          contentContainerStyle={styles.brandTabsScroll}
        >
          {BRANDS.map(brand => renderBrandTab(brand))}
        </ScrollView>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: theme.colors.backgrounds.card,
                borderColor: theme.colors.borders.light,
                borderWidth: 1,
              },
            ]}
          >
            <Search size={20} color={theme.colors.text.tertiary} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text.primary }]}
              placeholder="Search for vehicle"
              placeholderTextColor={theme.colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <FlatList
          key={selectedBrand}
          ref={flatListRef}
          data={filteredVehicles}
          renderItem={renderVehicleCard}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.vehicleGrid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: theme.colors.text.tertiary, fontSize: 16 }}>
                No vehicles found
              </Text>
            </View>
          }
        />

        <View
          style={[
            styles.addVehicleButton,
            {
              backgroundColor: theme.colors.backgrounds.primary,
              borderTopColor: theme.colors.borders.light,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.addVehicleButtonContent,
              {
                backgroundColor: selectedVehicle
                  ? theme.colors.buttons.primary.background
                  : theme.colors.borders.light,
              },
              !selectedVehicle && styles.addVehicleButtonDisabled,
            ]}
            onPress={handleAddVehicle}
            disabled={!selectedVehicle}
          >
            <Text
              style={[
                styles.addVehicleButtonText,
                {
                  color: selectedVehicle
                    ? theme.colors.buttons.primary.text
                    : theme.colors.text.tertiary,
                },
              ]}
            >
              Add Vehicle
            </Text>
          </TouchableOpacity>
        </View>

        <VehicleNumberBottomSheet
          vehicle={selectedVehicle}
          isOpen={isBottomSheetOpen}
          onClose={handleBottomSheetClose}
          onSubmit={handleVehicleSubmit}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
