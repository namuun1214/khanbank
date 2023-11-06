import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
  path: string;
}

interface IUseDoumentUtils {
  updateDocument: <T>(data: T) => Promise<void>;
  deleteDocument: () => Promise<void>;
}

interface IUseDoument<T> {
  loading: boolean;
  data: T | undefined | FirebaseFirestoreTypes.DocumentData;
  error: Error | undefined | unknown;
}

export const useDocumentUtils = (props: Props): IUseDoumentUtils => {
  const { path } = props;

  const updateDocument = async <T>(data: T): Promise<void> => {
    await firestore()
      .doc(`${path}`)
      .set(
        { updatedAt: firestore.FieldValue.serverTimestamp(), ...data },
        { merge: true }
      );
  };

  const deleteDocument = async (): Promise<void> => {
    await firestore().doc(`${path}`).delete();
  };

  return { updateDocument, deleteDocument };
};

export const useDocument = <T>(props: Props): IUseDoument<T> => {
  const { path } = props;
  const [data, setData] = useState<
    T | undefined | FirebaseFirestoreTypes.DocumentData
  >();
  const [error, setError] = useState<Error | undefined | unknown>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = firestore()
        .doc(`${path}`)
        .onSnapshot((document) => {
          setData({ ...document.data(), id: document.id });
          setLoading(false);
        });
      return () => unsubscribe();
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [path]);

  return { data, loading, error };
};
