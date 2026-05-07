import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Ionicons from '@react-native-vector-icons/ionicons';
import Header from '../components/Header';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import ImageCard from '../components/ImageCard';
import DeleteImageModal from '../components/DeleteImageModal';
import { COLORS, FONTS, FontSize } from '../assets/constants';
import { wp } from '../utils/responsive';
import { usePhotoStore, type PhotoItem } from '../store/photoStore';
import { useShipmentStore } from '../store/shipmentStore';
import { useImagePicker } from '../hooks/useImagePicker';
import { uploadService } from '../services/uploadService';
import type {
  ShipmentDetailNavigationProp,
  ShipmentDetailRouteProp,
} from '../navigation/types';

const MAX_PHOTOS = 20;

const ShipmentDetailScreen: React.FC<{
  navigation: ShipmentDetailNavigationProp;
  route: ShipmentDetailRouteProp;
}> = ({ navigation, route }) => {
  const { shipmentId, bolNumber } = route.params;
  const [uploading, setUploading] = useState(false);
  const [deleteImageModalVisible, setDeleteImageModalVisible] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const { addPhoto, removePhoto, getPhotos } = usePhotoStore();
  const { updateShipmentStatus } = useShipmentStore();
  const { takePhoto, pickFromGallery } = useImagePicker();

  const photos = getPhotos(shipmentId);

  const handleAddPhoto = useCallback(
    async (source: 'camera' | 'gallery') => {
      if (photos.length >= MAX_PHOTOS) {
        Toast.show({
          type: 'error',
          text1: 'Limit Reached',
          text2: `You can add up to ${MAX_PHOTOS} photos.`,
        });
        return;
      }
      const photo =
        source === 'camera' ? await takePhoto() : await pickFromGallery();
      if (photo) {
        await addPhoto(shipmentId, photo);
      }
    },
    [photos.length, takePhoto, pickFromGallery, addPhoto, shipmentId],
  );

  const handleRemove = useCallback((photoId: string) => {
    setSelectedPhotoId(photoId);
    setDeleteImageModalVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedPhotoId) {
      await removePhoto(shipmentId, selectedPhotoId);
      setDeleteImageModalVisible(false);
      setSelectedPhotoId(null);
    }
  }, [selectedPhotoId, removePhoto, shipmentId]);

  const handleUpload = useCallback(async () => {
    if (!photos.length) {
      Toast.show({
        type: 'error',
        text1: 'No Photos',
        text2: 'Please add at least one photo before uploading.',
      });
      return;
    }
    try {
      setUploading(true);
      const result = await uploadService.uploadPhotos(shipmentId, photos);
      updateShipmentStatus(shipmentId, 'Uploaded', result.uploadedCount);
      Toast.show({
        type: 'success',
        text1: 'Upload Successful',
        text2: `${result.uploadedCount} photo(s) uploaded successfully.`,
      });
      navigation.goBack();
    } catch (err: unknown) {
      updateShipmentStatus(shipmentId, 'Failed');
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: err instanceof Error ? err.message : 'Please try again.',
      });
    } finally {
      setUploading(false);
    }
  }, [photos, shipmentId, updateShipmentStatus, navigation]);

  const renderPhoto = useCallback(
    ({ item }: { item: PhotoItem }) => (
      <ImageCard uri={item.uri} onRemove={() => handleRemove(item.id)} />
    ),
    [handleRemove],
  );

  return (
    <View style={styles.root}>
      <Header
        title="Shipment"
        onLeftPress={() => navigation.goBack()}
        leftIconName="arrow-back"
      />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + wp(4) }, // vertical safe area → hp
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* BoL Number */}
        <View style={styles.section}>
          <CustomText
            size={FontSize.normalText}
            color={COLORS.primary}
            style={{ fontFamily: FONTS.REGULAR }}
          >
            BoL Number
          </CustomText>
          <View style={styles.bolContainer}>
            <CustomText
              size={FontSize.largeText}
              color={COLORS.primary}
              style={{ fontFamily: FONTS.BOLD }}
            >
              {bolNumber}
            </CustomText>
          </View>
        </View>

        {/* Choose Photos */}
        <View style={styles.section}>
          <CustomText
            size={FontSize.normalText}
            color={COLORS.black}
            style={styles.sectionTitle}
          >
            Choose Photos
          </CustomText>
          <View style={styles.photoOptions}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleAddPhoto('camera')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="camera-outline"
                size={wp(10)} // icon size → rf
                color={COLORS.primary}
                style={{ marginRight: wp(4) }}
              />
              <View>
                <CustomText
                  size={FontSize.normalText}
                  style={{ fontFamily: FONTS.BOLD }}
                  color={COLORS.primary}
                >
                  Take Photo
                </CustomText>
                <CustomText size={FontSize.smallText} color={COLORS.primary}>
                  Open Camera
                </CustomText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleAddPhoto('gallery')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="images-outline"
                size={wp(10)} // icon size → rf
                color={COLORS.primary}
                style={{ marginRight: wp(4) }}
              />
              <View>
                <CustomText
                  size={FontSize.normalText}
                  style={{ fontFamily: FONTS.BOLD }}
                  color={COLORS.primary}
                >
                  Choose from Gallery
                </CustomText>
                <CustomText size={FontSize.smallText} color={COLORS.primary}>
                  Select from device
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Photos */}
        <View style={styles.section}>
          <CustomText
            size={FontSize.normalText}
            color={COLORS.black}
            style={styles.sectionTitle}
          >
            Selected Photos ({photos.length}/{MAX_PHOTOS})
          </CustomText>

          {photos.length > 0 ? (
            <FlatList
              data={photos}
              renderItem={renderPhoto}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.photoGrid}
            />
          ) : (
            <View style={styles.emptyPhotos}>
              <Ionicons
                name="image-outline"
                size={wp(10)} // icon size → rf
                color={COLORS.greyText}
              />
              <CustomText
                size={FontSize.normalText}
                color={COLORS.greyText}
                style={styles.emptyText}
              >
                No photos selected yet.
              </CustomText>
            </View>
          )}

          <CustomText
            size={FontSize.smallMediumText}
            color={COLORS.greyText}
            style={styles.hint}
          >
            You can add up to {MAX_PHOTOS} photos.
          </CustomText>
        </View>

        <CustomButton
          title="  Upload"
          onPress={handleUpload}
          loading={uploading}
          disabled={!photos.length}
          style={styles.uploadBtn}
        />
      </ScrollView>

      <DeleteImageModal
        visible={deleteImageModalVisible}
        onCancel={() => {
          setDeleteImageModalVisible(false);
          setSelectedPhotoId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: wp(4), // uniform screen padding → wp
  },
  section: {
    marginBottom: wp(4), // vertical margin → hp
  },
  sectionTitle: {
    marginBottom: wp(2), // vertical margin → hp
    fontFamily: FONTS.SEMIBOLD,
  },
  bolContainer: {},
  photoOptions: {
    // vertical spacing handled via optionCard margin
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(4), // vertical spacing between option cards
    backgroundColor: COLORS.white,
    borderRadius: wp(2), // radius → rf
    padding: wp(4), // uniform card padding → wp
    borderWidth: wp(0.2), // border width → rf
    borderColor: COLORS.primary,
  },
  photoGrid: {
    // spacing handled by individual ImageCard margin
  },

  emptyPhotos: {
    backgroundColor: COLORS.white,
    borderRadius: wp(2), // radius → rf
    paddingVertical: wp(4), // vertical padding → hp
    alignItems: 'center',
    borderWidth: wp(0.5), // border width → rf
    borderColor: COLORS.border,
  },
  emptyText: {
    fontFamily: FONTS.REGULAR,
    marginTop: wp(2), // vertical margin → hp
  },
  hint: {
    fontFamily: FONTS.REGULAR,
    marginTop: wp(2), // vertical margin → hp
    textAlign: 'center',
  },
  uploadBtn: {
    marginTop: wp(4), // vertical margin → hp
  },
});

export default ShipmentDetailScreen;
