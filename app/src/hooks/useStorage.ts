import storage from '@react-native-firebase/storage';
import _ from 'lodash';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';

interface Props {
  path: string;
}

interface IUseStorage {
  loading: boolean;
  url?: string;
  uploadFile: (file: Asset, name: string) => Promise<string>;
  progress?: number;
}

export const useStorage = (props: Props): IUseStorage => {
  const { path } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: Asset, name: string): Promise<string> => {
    setLoading(true);
    const extension = _.chain(file?.type).split('/').last().value();
    const fileName = _.join([name, extension], '.');

    const reference = storage().ref(`${path}/${fileName}`);

    // putting a file to storage

    await reference.putFile(file.uri as string);

    // getting a url of uploaded file
    try {
      const url = await reference.getDownloadURL();
      Alert.alert('Successfully uploaded photo');
      setLoading(false);
      return url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { uploadFile, loading };
};
