import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Search, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';
import { mockVehicles, BRANDS, Vehicle } from '@/data/mockVehicles';
import { VehicleNumberBottomSheet } from '@/components/VehicleNumberBottomSheet';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { styles } from './styles';

type VehicleSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VehicleSelection'
>;

export const VehicleSelectionScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<VehicleSelectionScreenNavigationProp>();
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
    // Toggle selection: tap again to unselect
    if (selectedVehicle?.id === vehicle.id) {
      setSelectedVehicle(null);
    } else {
      setSelectedVehicle(vehicle);
    }
  };

  const handleAddVehicle = () => {
    if (selectedVehicle) {
      console.log('Opening bottom sheet for vehicle:', selectedVehicle.name);
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
    setSelectedVehicle(null);
    // Navigate to main app tabs
    navigation.replace('MainTabs');
  };

  const renderBrandTab = (brand: string) => {
    const isActive = selectedBrand === brand;
    return (
      <Pressable
        key={brand}
        style={({ pressed }) => [
          styles.brandTab,
          {
            backgroundColor: isActive
              ? theme.colors.buttons.primary.background
              : theme.colors.backgrounds.card,
            borderColor: isActive
              ? theme.colors.buttons.primary.background
              : theme.colors.borders.light,
            transform: [{ scale: pressed ? 0.96 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
        ]}
        onPress={() => {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
          setSelectedBrand(brand);
        }}
      >
        <Text
          style={[
            styles.brandTabText,
            {
              color: isActive
                ? theme.colors.buttons.primary.text
                : theme.colors.text.primary,
            },
          ]}
        >
          {brand}
        </Text>
      </Pressable>
    );
  };

  const renderVehicleCard = ({ item }: { item: Vehicle }) => {
    const isSelected = selectedVehicle?.id === item.id;
    return (
      <Pressable
        style={({ pressed }) => [
          styles.vehicleCard,
          {
            backgroundColor: theme.colors.backgrounds.card,
            borderColor: isSelected
              ? theme.colors.buttons.primary.background
              : theme.colors.borders.light,
          },
          isSelected && styles.vehicleCardSelected,
          {
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
        onPress={() => handleVehicleSelect(item)}
      >
        <View style={styles.vehicleImageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.vehicleImage}
            resizeMode="contain"
            onError={() => {
              console.warn(`Failed to load image for ${item.name}`);
            }}
          />
          {isSelected && (
            <View
              style={[
                styles.selectedBadge,
                {
                  backgroundColor: theme.colors.buttons.primary.background,
                },
              ]}
            >
              <CheckCircle2
                size={20}
                color="#FFFFFF"
                fill={theme.colors.buttons.primary.background}
                strokeWidth={3}
              />
            </View>
          )}
        </View>
        <View style={styles.vehicleNameContainer}>
          <Text
            style={[
              styles.vehicleName,
              isSelected && styles.vehicleNameSelected,
              {
                color: isSelected
                  ? theme.colors.buttons.primary.background
                  : theme.colors.text.primary,
              },
            ]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const handleSkip = () => {
    handleBottomSheetClose();
    setSelectedVehicle(null);
    // Navigate to main app tabs
    navigation.replace('MainTabs');
  };

  return (
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
        <Text
          style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          numberOfLines={2}
        >
          Choose from our wide range of electric vehicles
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
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.vehicleGrid}
        showsVerticalScrollIndicator={false}
        style={filteredVehicles.length === 0 ? styles.flatListEmpty : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Search
              size={48}
              color={theme.colors.text.tertiary}
              strokeWidth={1.5}
            />
            <Text
              style={[styles.emptyText, { color: theme.colors.text.tertiary }]}
            >
              No vehicles found
            </Text>
            <Text
              style={[
                styles.emptyText,
                styles.emptySubText,
                { color: theme.colors.text.tertiary },
              ]}
            >
              Try adjusting your search
            </Text>
          </View>
        }
      />

      <View
        style={[
          styles.addVehicleButton,
          {
            backgroundColor: theme.colors.backgrounds.primary,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.addVehicleButtonContent,
            {
              backgroundColor: selectedVehicle
                ? theme.colors.buttons.primary.background
                : theme.colors.borders.light,
              transform: [{ scale: pressed && selectedVehicle ? 0.98 : 1 }],
              opacity: pressed && selectedVehicle ? 0.9 : 1,
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
            {selectedVehicle
              ? 'Continue with Selected Vehicle'
              : 'Select a Vehicle'}
          </Text>
        </Pressable>
      </View>
      <VehicleNumberBottomSheet
        vehicle={selectedVehicle}
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        onSubmit={handleVehicleSubmit}
        onSkip={handleSkip}
      />
    </SafeAreaView>
  );
};
