import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';
import { ChargingStation } from '@/types/charging';

interface StationListCardProps {
  station: ChargingStation;
  onPress: (station: ChargingStation) => void;
}

export const StationListCard: React.FC<StationListCardProps> = ({
  station,
  onPress,
}) => {
  const theme = useTheme();

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

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.colors.accent[700];
      case 'in_use':
        return theme.colors.secondary[400];
      case 'offline':
        return theme.colors.borders.light;
      default:
        return theme.colors.borders.medium;
    }
  };

  // const availablePorts = station.ports.filter(port => port.available).length;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.backgrounds.card,
          borderColor: getBorderColor(station.status),
          borderWidth: station.status === 'available' ? 2 : 1,
        },
      ]}
      onPress={() => onPress(station)}
      activeOpacity={0.7}
    >
      {/* Provider Icon - placeholder circle */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.primary[100] },
        ]}
      >
        <Text style={[styles.iconText, { color: theme.colors.primary[700] }]}>
          {station.provider.charAt(0)}
        </Text>
      </View>

      {/* Station Info */}
      <View style={styles.info}>
        <Text
          style={[styles.stationName, { color: theme.colors.text.primary }]}
          numberOfLines={1}
        >
          {station.name}
        </Text>
        <Text
          style={[styles.location, { color: theme.colors.text.secondary }]}
          numberOfLines={1}
        >
          {station.location.city}
        </Text>
        <Text style={[styles.distance, { color: theme.colors.text.tertiary }]}>
          {station.distance}
        </Text>
      </View>

      {/* Right side - Status and Rating */}
      <View style={styles.rightSection}>
        {station.status === 'available' ? (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(station.status) + '20' },
            ]}
          >
            <CheckCircle
              size={14}
              color={getStatusColor(station.status)}
              fill={getStatusColor(station.status)}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(station.status) },
              ]}
            >
              Available
            </Text>
          </View>
        ) : (
          <Text
            style={[styles.unavailable, { color: theme.colors.text.tertiary }]}
          >
            {station.status === 'in_use' ? 'In Use' : 'Offline'}
          </Text>
        )}

        {/* Connection Type Badge */}
        <View
          style={[
            styles.connectionBadge,
            { backgroundColor: theme.colors.backgrounds.secondary },
          ]}
        >
          <Text
            style={[
              styles.connectionText,
              { color: theme.colors.text.primary },
            ]}
          >
            {station.ports[0]?.type || 'DC'}
          </Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Star size={12} color="#FDB022" fill="#FDB022" />
          <Text style={[styles.rating, { color: theme.colors.text.primary }]}>
            {station.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  stationName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    marginBottom: 2,
  },
  distance: {
    fontSize: 11,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  unavailable: {
    fontSize: 11,
    fontWeight: '500',
  },
  connectionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  connectionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
  },
});
