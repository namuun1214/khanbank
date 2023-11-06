import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  path: string;
  orderBy?: string;
  desc?: boolean;
  limit?: number;
  where?: string;
};

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | ">"
  | ">="
  | "!="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

type IUseCollectionUtils = {
  createDocument: <T>(data: T) => Promise<string>;
  updateDocument: <T>(id: string, data: T) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
};

type IUseCollection = {
  data: FirebaseFirestoreTypes.DocumentData[];
  loading: boolean;
};

export const useCollectionUtils = (props: Props): IUseCollectionUtils => {
  const { path } = props;

  const createDocument = async <T>(data: T): Promise<string> => {
    const { id } = await firestore()
      .collection(`${path}`)
      .add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    return id;
  };

  const updateDocument = async <T>(id: string, data: T): Promise<void> => {
    await firestore()
      .doc(`${path}/${id}`)
      .set({ ...data }, { merge: true });
  };

  const deleteDocument = async (id: string): Promise<void> => {
    await firestore().doc(`${path}/${id}`).delete();
  };

  return { createDocument, updateDocument, deleteDocument };
};

export const useCollection = (props: Props): IUseCollection => {
  const { path, limit, desc, where, orderBy } = props;

  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const updateData = (snapshot: FirebaseFirestoreTypes.QuerySnapshot): void => {
    setLoading(false);
    const data = snapshot?.docs?.map(
      (document: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
        return {
          ...document.data(),
          id: document.id,
        };
      }
    );
    setData(data);
  };

  useEffect(() => {
    setLoading(true);

    let query: FirebaseFirestoreTypes.Query = firestore().collection(`${path}`);
    if (desc) {
      query = query.where(
        "createdAt",
        ">",
        firestore.FieldValue.serverTimestamp()
      );
    }

    if (where) {
      const wheres = where.toString().split("&");
      wheres.map((item) => {
        const [field, op, rawValue] = item.split(" ");
        let value: string | string[] | boolean =
          rawValue === "true" || rawValue === "false"
            ? rawValue === "true"
            : rawValue;
        if (["in", "not-in", "array-contains-any"].includes(op)) {
          value = value.toString().split(",");
        }
        query = query.where(
          field === "_id" ? firestore.FieldPath.documentId() : field,
          op as WhereFilterOp,
          value
        );
      });
    }
    if (orderBy) {
      query = query.orderBy(orderBy, desc ? "desc" : "asc");
    }
    if (limit) {
      query = query.limit(limit);
    }

    const unsubscribe = query.onSnapshot(updateData);

    return () => unsubscribe();
  }, [path, limit, orderBy, desc, where]);

  return {
    data,
    loading,
  };
};
