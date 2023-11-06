import _ from 'lodash';
import { Asset, CameraOptions, launchCamera } from 'react-native-image-picker';

export const takePhotoOnCamera = async (): Promise<Asset | undefined> => {
  const options: CameraOptions = {
    mediaType: 'photo',
  };
  try {
    const response = await launchCamera(options);
    if (response.assets) return _.first(response.assets);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
