import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { ProviderType } from '@/types/charging';

interface MapMarkerIconProps {
  provider: ProviderType;
  size?: number;
  isSelected?: boolean;
}

// Color mapping for different providers
const providerColors: Record<ProviderType, string> = {
  'Statiq': '#4ECDC4', // Teal/Turquoise
  'Tata Power': '#1E40AF', // Blue
  'Fortum': '#7C3AED', // Purple
  'Hyundai': '#DC2626', // Red
  'MG': '#EA580C', // Orange
  'Jaguar': '#059669', // Green
  'Mercedes': '#6B7280', // Gray
  'ChargePoint': '#0EA5E9', // Light Blue
  'Ather': '#10B981', // Emerald
};

export const MapMarkerIcon: React.FC<MapMarkerIconProps> = ({
  provider,
  size = 40,
  isSelected = false,
}) => {
  const color = providerColors[provider] || '#4ECDC4';
  const scale = isSelected ? 1.2 : 1;

  return (
    <Svg
      width={size * scale}
      height={size * scale * 1.2}
      viewBox="0 0 24 36"
    >
      <G>
        {/* Pin shadow */}
        {isSelected && (
          <Circle
            cx="12"
            cy="34"
            r="4"
            fill="#000"
            opacity="0.2"
          />
        )}
        
        {/* Main pin body */}
        <Path
          d="M12 0C7.032 0 3 4.032 3 9c0 7.5 9 18 9 18s9-10.5 9-18c0-4.968-4.032-9-9-9z"
          fill={color}
          stroke={isSelected ? '#FFF' : 'none'}
          strokeWidth={isSelected ? '2' : '0'}
        />
        
        {/* Inner circle for provider initial or icon */}
        <Circle
          cx="12"
          cy="9"
          r="4"
          fill="#FFF"
        />
        
        {/* Charging bolt icon */}
        <Path
          d="M13 5.5h-1.5l.75 2.25h-1.5l1.5 3 .75-2.25h1.5z"
          fill={color}
          transform="translate(-1, 0)"
        />
      </G>
    </Svg>
  );
};

