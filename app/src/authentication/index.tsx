import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationRoutes } from "../navigation/NavigationParameter";
import { AuthStack } from "../navigation/stack";

type IAuthContext = {
  user?: FirebaseAuthTypes.User;
  token?: FirebaseAuthTypes.IdTokenResult;
  signout: () => void;
  loading: boolean;
  login: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
};

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  signout: async () => {
    await auth().signOut();
  },
  loading: true,
  login: async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password);
  },
  resetPassword: async (email: string) => {
    await auth().sendPasswordResetEmail(email);
  },
});

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | undefined>();
  const [token, setToken] = useState<FirebaseAuthTypes.IdTokenResult>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
      } else {
        user
          ?.getIdTokenResult(true)
          .then((token) => setToken(token))
          .catch((error) => {
            throw error;
          });

        setUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string): void => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const signout = (): void => {
    auth()
      .signOut()
      .then(() => {
        setUser(() => {
          const user = undefined;
          return user;
        });
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };
  const resetPassword = (email: string): void => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signout,
        loading,
        login,
        resetPassword,
      }}
    >
      {user && children}
      {!user && <AuthStack />}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);

export const useUserUID = (): string => {
  const { user } = useAuth();
  const { uid } = user || {};
  return uid as string;
};
