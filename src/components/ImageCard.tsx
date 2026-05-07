import React, { memo } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../assets/constants';
import { wp } from '../utils/responsive';

interface ImageCardProps {
  uri: string;
  onRemove: () => void;
}

// Square thumbnail — width-driven so wp is the right anchor
const IMAGE_SIZE = wp(26);

const ImageCard: React.FC<ImageCardProps> = ({ uri, onRemove }) => (
  <View style={styles.container}>
    <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    <TouchableOpacity
      onPress={onRemove}
      style={styles.removeBtn}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
    >
      <Ionicons name="close-circle" size={wp(6)} color={COLORS.failed} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: IMAGE_SIZE, // width → wp
    height: IMAGE_SIZE, // square → same wp value for height
    margin: wp(1), // uniform margin → wp
    borderRadius: wp(2), // radius → rf
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.white,
    borderRadius: wp(2), // radius → rf
  },
});

export default memo(ImageCard);
