import type { PhotoItem } from '../store/photoStore';

export interface UploadResult {
  success: boolean;
  shipmentId: string;
  uploadedCount: number;
}

export const uploadService = {
  uploadPhotos: async (
    shipmentId: string,
    photos: PhotoItem[],
  ): Promise<UploadResult> => {
    if (!photos.length) {
      throw new Error('No photos to upload.');
    }

    await new Promise<void>(resolve => setTimeout(resolve, 2000));

    const shouldSucceed = Math.random() > 0.2;
    if (!shouldSucceed) {
      throw new Error('Upload failed. Please try again.');
    }

    return {
      success: true,
      shipmentId,
      uploadedCount: photos.length,
    };
  },
};
