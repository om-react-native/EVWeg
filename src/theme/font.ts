import { PixelRatio } from 'react-native';
import { moderateScale } from './metrics';

const fontScale = PixelRatio.getFontScale();

/**
 * Returns a font size that:
 * - scales with device width (via moderateScale)
 * - respects system font scaling (fontScale)
 * - is capped at a safe maximum so layouts don't completely break
 */
export const scaledFontSize = (baseSize: number, maxScale = 1.3) => {
  const safeScale = Math.min(fontScale, maxScale);
  return moderateScale(baseSize) * safeScale;
};


