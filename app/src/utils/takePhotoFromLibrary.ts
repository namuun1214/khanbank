import _ from "lodash";
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";

export const takePhotoFromLibrary = async (): Promise<Asset | undefined> => {
  const options: ImageLibraryOptions = {
    mediaType: "photo",
    includeBase64: true,
  };
  try {
    const response = await launchImageLibrary(options);
    if (response.assets) return _.first(response.assets);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
