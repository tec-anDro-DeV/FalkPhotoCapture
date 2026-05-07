import React, { memo } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { COLORS, FONTS, FontSize } from '../assets/constants';
import { wp } from '../utils/responsive';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    statusBarTranslucent
    onRequestClose={onCancel}
  >
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={onCancel}
    >
      <TouchableOpacity activeOpacity={1} style={styles.card}>
        <CustomText
          size={FontSize.mediumLargeText} // font size → rf
          color={COLORS.primary}
          style={styles.title}
        >
          Logout
        </CustomText>
        <CustomText
          size={FontSize.normalText}
          color={COLORS.greyText}
          style={styles.message}
        >
          Are you sure you want to logout?
        </CustomText>
        <View style={styles.buttons}>
          <CustomButton
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            style={[styles.btn, { marginRight: wp(3) }]}
          />
          <CustomButton
            title="Logout"
            variant="filled"
            onPress={onConfirm}
            style={styles.btn}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(6), // horizontal padding → wp
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4), // radius → rf
    padding: wp(6), // uniform card padding → wp
    width: '100%',
  },
  title: {
    marginBottom: wp(1), // vertical margin → hp
    fontFamily: FONTS.BOLD,
  },
  message: {
    marginBottom: wp(3), // vertical margin → hp
    lineHeight: wp(6), // line-height is text-related → rf
  },
  buttons: {
    flexDirection: 'row',
    marginTop: wp(3),
    // spacing via margin on individual buttons
  },
  btn: {
    flex: 1,
  },
});

export default memo(LogoutModal);
