declare module 'react-native-linear-gradient' {
  import type { ComponentType } from 'react';
  import type { ViewProps } from 'react-native';

  interface LinearGradientProps extends ViewProps {
    colors: string[];
    locations?: number[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    useAngle?: boolean;
    angle?: number;
    angleCenter?: { x: number; y: number };
  }

  const LinearGradient: ComponentType<LinearGradientProps>;
  export default LinearGradient;
}


