import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import {
  Search,
  SlidersHorizontal,
  Navigation,
  Plus,
  List,
  ChevronDown,
  User,
  CheckCircle2,
  Tag,
  Zap,
} from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';
import { createStyles } from './styles';
import { ChargingStationMarker } from '@/components/ChargingStationMarker';
import { StationDetailsBottomSheet } from '@/components/StationDetailsBottomSheet';
import { StationListCard } from '@/components/StationListCard';
import {
  mockChargingStations,
  defaultMapRegion,
  filterStations,
} from '@/data/mockChargingStations';
import { ChargingStation, FilterType } from '@/types/charging';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const MapScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const mapRef = useRef<MapView>(null);

  // State management
  const [selectedStation, setSelectedStation] =
    useState<ChargingStation | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stations based on active filter
  const filteredStations = filterStations(mockChargingStations, activeFilter);

  // Handle marker press
  const handleMarkerPress = (station: ChargingStation) => {
    setSelectedStation(station);
    // Animate to selected station
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: station.location.latitude,
          longitude: station.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    }
  };

  // Handle station card press from horizontal list
  const handleStationCardPress = (station: ChargingStation) => {
    setSelectedStation(station);
    // Animate to selected station
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: station.location.latitude,
          longitude: station.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    }
  };

  // Handle filter toggle
  const handleFilterPress = (filter: FilterType) => {
    setActiveFilter(filter);
    // Close bottom sheet when changing filters
    if (filter !== activeFilter) {
      setSelectedStation(null);
    }
  };

  // Handle current location button
  const handleLocationPress = () => {
    // TODO: Implement user location tracking
    // For now, reset to default region
    if (mapRef.current) {
      mapRef.current.animateToRegion(defaultMapRegion, 1000);
    }
  };

  // Handle bottom sheet close
  const handleBottomSheetClose = () => {
    setSelectedStation(null);
  };

  // Render filter chip
  const renderFilterChip = (
    filter: FilterType,
    label: string,
    icon?: React.ReactNode,
  ) => {
    const isActive = activeFilter === filter;
    return (
      <TouchableOpacity
        key={filter}
        style={[
          styles.filterChip,
          isActive ? styles.filterChipActive : styles.filterChipInactive,
        ]}
        onPress={() => handleFilterPress(filter)}
      >
        {icon}
        <Text
          style={[
            styles.filterChipText,
            isActive
              ? styles.filterChipTextActive
              : styles.filterChipTextInactive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Map View */}
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={defaultMapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
        >
          {/* Render charging station markers */}
          {filteredStations.map(station => (
            <ChargingStationMarker
              key={station.id}
              station={station}
              isSelected={selectedStation?.id === station.id}
              onPress={handleMarkerPress}
            />
          ))}
        </MapView>

        {/* Header with Gradient */}
        <SafeAreaView style={styles.header}>
          {/* Gradient Background Effect */}
          <LinearGradient
            colors={[
              theme.colors.secondary[900],
              theme.colors.secondary[800],
              theme.colors.secondary[700] + 'CC',
              theme.colors.secondary[700] + '80',
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerGradient}
          />

          {/* Top Row: Vehicle Selector, Miles Button, Profile */}
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.vehicleSelector}>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>Tata Nexon EV</Text>
                <Text style={styles.vehicleNumber}>APO7BM0523</Text>
              </View>
              <ChevronDown size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton}>
              <User size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={theme.colors.text.tertiary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Station... Place... City..."
              placeholderTextColor={theme.colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterIcon}>
              <SlidersHorizontal size={20} color={theme.colors.text.tertiary} />
            </TouchableOpacity>
          </View>

          {/* Filter Chips */}
          <View style={styles.filtersContainer}>
            {renderFilterChip('all', 'All Chargers')}
            {renderFilterChip(
              'offers',
              'Offers',
              <Tag
                size={16}
                color={
                  activeFilter === 'offers'
                    ? '#FFFFFF'
                    : theme.colors.text.secondary
                }
              />,
            )}
            {renderFilterChip(
              'available',
              'Available',
              <CheckCircle2
                size={16}
                color={
                  activeFilter === 'available'
                    ? '#FFFFFF'
                    : theme.colors.text.secondary
                }
              />,
            )}
          </View>
        </SafeAreaView>

        {/* Floating Buttons */}
        {/* Current Location Button */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <Navigation size={20} color={theme.colors.primary[500]} />
        </TouchableOpacity>

        {/* Right-side Floating Buttons (Add, Start, List) */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={styles.floatingButton}>
            <Plus size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingButton}>
            <Zap size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingButton}>
            <List size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Horizontal Scrollable Station List */}
        {!selectedStation && (
          <View style={styles.stationListContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stationListScroll}
            >
              {filteredStations.slice(0, 10).map(station => (
                <StationListCard
                  key={station.id}
                  station={station}
                  onPress={handleStationCardPress}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Bottom Sheet for Station Details */}
        {selectedStation && (
          <View style={styles.bottomSheetWrapper}>
            <StationDetailsBottomSheet
              station={selectedStation}
              onClose={handleBottomSheetClose}
            />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};
