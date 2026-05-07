import React, { memo } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { rf } from '../utils/responsive';
import { COLORS } from '../assets/constants';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface CustomTextProps extends TextProps {
  size?: number;
  color?: string;
  weight?: FontWeight;
  style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({
  size = 14,
  color = COLORS.black,
  style,
  children,
  ...props
}) => (
  <Text
    style={[
      {
        fontSize: rf(size),
        color,
      },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export default memo(CustomText);
