import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Navigation, Heart, Zap, Star } from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';
import { ChargingStation } from '@/types/charging';

interface StationDetailsBottomSheetProps {
  station: ChargingStation | null;
  onClose: () => void;
}

export const StationDetailsBottomSheet: React.FC<
  StationDetailsBottomSheetProps
> = ({ station, onClose }) => {
  const theme = useTheme();

  // Snap points: minimal (20%), mid (50%), full (90%)
  const snapPoints = useMemo(() => ['20%', '50%', '90%'], []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.colors.accent[700];
      case 'in_use':
        return theme.colors.secondary[500];
      case 'offline':
        return theme.colors.text.tertiary;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'in_use':
        return 'In Use';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  if (!station) {
    return null;
  }

  const availablePorts = station.ports.filter(port => port.available).length;
  const totalPorts = station.ports.length;

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      backgroundStyle={{
        backgroundColor: theme.colors.backgrounds.card,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.borders.medium,
      }}
      style={styles.bottomSheetContainer}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.stationInfo}>
              <Text
                style={[
                  styles.stationName,
                  { color: theme.colors.text.primary },
                ]}
              >
                {station.name}
              </Text>
              <Text
                style={[
                  styles.stationProvider,
                  { color: theme.colors.text.secondary },
                ]}
              >
                {station.provider}
              </Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={24} color={theme.colors.text.tertiary} />
            </TouchableOpacity>
          </View>

          {/* Rating and Distance */}
          <View style={styles.metaInfo}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FDB022" fill="#FDB022" />
              <Text
                style={[styles.rating, { color: theme.colors.text.primary }]}
              >
                {station.rating}
              </Text>
            </View>
            <Text
              style={[styles.distance, { color: theme.colors.text.secondary }]}
            >
              {station.distance}
            </Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(station.status) + '20' },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(station.status) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(station.status) },
              ]}
            >
              {getStatusText(station.status)}
            </Text>
          </View>
        </View>

        {/* Ports Information */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Charging Ports
          </Text>
          <Text
            style={[styles.portsInfo, { color: theme.colors.text.secondary }]}
          >
            {availablePorts} of {totalPorts} ports available
          </Text>

          <View style={styles.portsContainer}>
            {station.ports.map((port, index) => (
              <View
                key={index}
                style={[
                  styles.portCard,
                  {
                    backgroundColor: theme.colors.backgrounds.secondary,
                    borderColor: port.available
                      ? theme.colors.primary[400]
                      : theme.colors.borders.light,
                  },
                ]}
              >
                <View style={styles.portHeader}>
                  <Zap
                    size={20}
                    color={
                      port.available
                        ? theme.colors.primary[500]
                        : theme.colors.text.tertiary
                    }
                  />
                  <Text
                    style={[
                      styles.portType,
                      {
                        color: port.available
                          ? theme.colors.text.primary
                          : theme.colors.text.tertiary,
                      },
                    ]}
                  >
                    {port.type} - {port.power}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.portPrice,
                    { color: theme.colors.text.secondary },
                  ]}
                >
                  ₹{port.price}/kWh
                </Text>
                <Text
                  style={[
                    styles.portStatus,
                    {
                      color: port.available
                        ? theme.colors.accent[700]
                        : theme.colors.text.tertiary,
                    },
                  ]}
                >
                  {port.available ? 'Available' : 'In Use'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities */}
        {station.amenities.length > 0 && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text.primary },
              ]}
            >
              Amenities
            </Text>
            <View style={styles.amenitiesContainer}>
              {station.amenities.map((amenity, index) => (
                <View
                  key={index}
                  style={[
                    styles.amenityChip,
                    {
                      backgroundColor: theme.colors.backgrounds.secondary,
                      borderColor: theme.colors.borders.light,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.amenityText,
                      { color: theme.colors.text.secondary },
                    ]}
                  >
                    {amenity}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Offer Banner */}
        {station.hasOffer && station.offerText && (
          <View
            style={[
              styles.offerBanner,
              { backgroundColor: theme.colors.accent[100] },
            ]}
          >
            <Text
              style={[styles.offerText, { color: theme.colors.accent[900] }]}
            >
              🎉 {station.offerText}
            </Text>
          </View>
        )}

        {/* Operating Hours */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Operating Hours
          </Text>
          <Text style={[styles.hours, { color: theme.colors.text.secondary }]}>
            {station.isOpen24Hours ? '24 Hours' : station.operatingHours}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Location
          </Text>
          <Text
            style={[styles.address, { color: theme.colors.text.secondary }]}
          >
            {station.location.address}
          </Text>
          <Text style={[styles.city, { color: theme.colors.text.tertiary }]}>
            {station.location.city}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.navigateButton,
              { backgroundColor: theme.colors.buttons.primary.background },
            ]}
          >
            <Navigation size={20} color={theme.colors.buttons.primary.text} />
            <Text
              style={[
                styles.navigateButtonText,
                { color: theme.colors.buttons.primary.text },
              ]}
            >
              Navigate
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    zIndex: 100,
    elevation: 100,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  stationProvider: {
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  portsInfo: {
    fontSize: 14,
    marginBottom: 12,
  },
  portsContainer: {
    gap: 12,
  },
  portCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  portHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  portType: {
    fontSize: 16,
    fontWeight: '600',
  },
  portPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  portStatus: {
    fontSize: 13,
    fontWeight: '500',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  amenityText: {
    fontSize: 13,
  },
  offerBanner: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  offerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hours: {
    fontSize: 14,
  },
  address: {
    fontSize: 14,
    marginBottom: 4,
  },
  city: {
    fontSize: 13,
  },
  actions: {
    marginTop: 8,
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  navigateButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
