import React from 'react';
import { Marker } from 'react-native-maps';
import { ChargingStation } from '@/types/charging';
import { MapMarkerIcon } from './MapMarkerIcon';

interface ChargingStationMarkerProps {
  station: ChargingStation;
  isSelected: boolean;
  onPress: (station: ChargingStation) => void;
}

export const ChargingStationMarker: React.FC<ChargingStationMarkerProps> = ({
  station,
  isSelected,
  onPress,
}) => {
  return (
    <Marker
      coordinate={{
        latitude: station.location.latitude,
        longitude: station.location.longitude,
      }}
      onPress={() => onPress(station)}
      tracksViewChanges={false} // Performance optimization
    >
      <MapMarkerIcon
        provider={station.provider}
        isSelected={isSelected}
        size={40}
      />
    </Marker>
  );
};

