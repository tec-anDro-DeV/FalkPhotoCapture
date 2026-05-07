import React, { memo } from 'react';
import { ActivityIndicator, View, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../assets/constants';
import { wp } from '../utils/responsive';

interface LoaderProps {
  visible?: boolean;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  visible = true,
  fullScreen = false,
}) => {
  if (!visible) {
    return null;
  }

  if (fullScreen) {
    return (
      <Modal transparent animationType="none" statusBarTranslucent>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(4), // padding → wp
  },
});

export default memo(Loader);
