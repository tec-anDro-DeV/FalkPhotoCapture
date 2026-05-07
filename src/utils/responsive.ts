import { useWindowDimensions, PixelRatio, Dimensions } from 'react-native';

/**
 * Hook-based responsive helpers (RECOMMENDED)
 * - Auto updates on rotation
 * - Use inside components
 */
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const wp = (percentage: number) => (width * percentage) / 100;
  const hp = (percentage: number) => (height * percentage) / 100;

  const rf = (size: number) => {
    const scale = width / 375; // base width (iPhone X)
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  };

  return { wp, hp, rf, width, height };
};

/**
 * Static helpers (OPTIONAL)
 * - Use outside components (constants, styles)
 * - NOT reactive to rotation
 */

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;

export const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

export const rf = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
