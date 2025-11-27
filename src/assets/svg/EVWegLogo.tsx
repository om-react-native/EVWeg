import React from 'react';
import Svg, { Path, Circle, Text, Defs, LinearGradient, Stop } from 'react-native-svg';

interface EVWegLogoProps {
  width?: number;
  height?: number;
  variant?: 'light' | 'dark' | 'white' | 'monochrome';
  color?: string;
}

export const EVWegLogo: React.FC<EVWegLogoProps> = ({
  width = 400,
  height = 120,
  variant = 'light',
  color,
}) => {
  const isDark = variant === 'dark';
  const isWhite = variant === 'white';
  const isMonochrome = variant === 'monochrome';

  const primaryColor = color || (isWhite ? '#FFFFFF' : isDark ? '#FFFFFF' : '#556270');
  const secondaryColor = color || (isWhite ? '#FFFFFF' : isDark ? '#4ECDC4' : '#4ECDC4');
  const gradientStart = isDark ? '#C7F0DB' : '#556270';
  const gradientEnd = '#4ECDC4';

  return (
    <Svg width={width} height={height} viewBox="0 0 400 120">
      <Defs>
        <LinearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={isMonochrome ? 'currentColor' : gradientStart} />
          <Stop offset="100%" stopColor={isMonochrome ? 'currentColor' : gradientEnd} />
        </LinearGradient>
      </Defs>

      {/* Route Path */}
      <Path
        d="M 15 95 Q 31 31, 50 50 T 85 15"
        stroke={isMonochrome ? 'currentColor' : 'url(#pathGradient)'}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        opacity={isWhite ? 0.9 : 1}
      />

      {/* End Point */}
      <Circle
        cx="85"
        cy="15"
        r="5"
        fill={isMonochrome ? 'currentColor' : secondaryColor}
      />

      {/* Lightning Bolt Icon */}
      <Path
        d="M 53 43 L 48 53 L 53 53 L 48 63 L 58 50 L 53 50 L 58 40 Z"
        fill={isMonochrome ? 'currentColor' : isWhite || isDark ? '#FFFFFF' : secondaryColor}
      />

      {/* Text: EV */}
      <Text
        x="110"
        y="75"
        fontFamily="Inter, sans-serif"
        fontSize="60"
        fontWeight="700"
        fill={isMonochrome ? 'currentColor' : primaryColor}
      >
        EV
      </Text>

      {/* Text: Weg */}
      <Text
        x="210"
        y="75"
        fontFamily="Inter, sans-serif"
        fontSize="60"
        fontWeight="700"
        fill={isMonochrome ? 'currentColor' : secondaryColor}
      >
        Weg
      </Text>

      {/* Tagline */}
      <Text
        x="110"
        y="95"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="600"
        fill={isMonochrome ? 'currentColor' : secondaryColor}
        letterSpacing="2"
        opacity={isWhite ? 0.9 : 1}
      >
        YOUR WAY FORWARD
      </Text>
    </Svg>
  );
};

