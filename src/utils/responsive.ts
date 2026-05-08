import { useWindowDimensions, PixelRatio, Dimensions } from 'react-native';

/**
 * Helper functions to calculate responsive values
 */
const createResponsiveFunctions = (width: number, height: number) => {
  const wp = (percentage: number) => (width * percentage) / 100;
  const hp = (percentage: number) => (height * percentage) / 100;
  const rf = (size: number) => {
    const scale = width / 375; // base width (iPhone X)
    const newSize = size + (scale * size - size) * 0.35;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  return { wp, hp, rf };
};

/**
 * Hook-based responsive helpers (RECOMMENDED)
 * - Auto updates on rotation
 * - Use inside components
 */
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  return { ...createResponsiveFunctions(width, height), width, height };
};

/**
 * Static helpers (OPTIONAL)
 * - Use outside components (constants, styles)
 * - NOT reactive to rotation
 */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const staticResponsive = createResponsiveFunctions(SCREEN_WIDTH, SCREEN_HEIGHT);

export const wp = staticResponsive.wp;
export const hp = staticResponsive.hp;
export const rf = staticResponsive.rf;
