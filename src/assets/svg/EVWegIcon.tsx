import React from 'react';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

interface EVWegIconProps {
  width?: number;
  height?: number;
  showBackground?: boolean;
}

export const EVWegIcon: React.FC<EVWegIconProps> = ({
  width = 512,
  height = 512,
  showBackground = true,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <Defs>
        <LinearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#556270" />
          <Stop offset="100%" stopColor="#4ECDC4" />
        </LinearGradient>
      </Defs>

      {/* Background */}
      {showBackground && (
        <Rect width="512" height="512" rx="110" fill="url(#iconGradient)" />
      )}

      {/* Route Path */}
      <Path
        d="M 80 432 Q 160 160, 256 256 T 432 80"
        stroke="#FFFFFF"
        strokeWidth="45"
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />

      {/* End Point */}
      <Circle cx="432" cy="80" r="30" fill="#FFFFFF" />

      {/* Lightning Bolt Icon */}
      <Path
        d="M 276 226 L 236 296 L 276 296 L 236 366 L 316 256 L 276 256 L 316 186 Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
};

