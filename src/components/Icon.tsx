import React from 'react';
import { ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '@/theme/useTheme';

type LucideIconName = keyof typeof LucideIcons;

interface IconProps {
  name: LucideIconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const theme = useTheme();
  const IconComponent = LucideIcons[name] as React.ComponentType<{
    size?: number;
    color?: string;
    style?: ViewStyle;
  }>;

  if (!IconComponent) {
    return null;
  }

  const resolvedColor = color ?? theme.colors.text.primary;

  return <IconComponent size={size} color={resolvedColor} style={style} />;
};
