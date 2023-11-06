import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
  requestNotifications,
  checkNotifications,
} from "react-native-permissions";
import { useUserUID } from "../authentication";
import { useDocumentUtils } from "../hooks";
import messaging from "@react-native-firebase/messaging";

interface IPermissionContext {
  cameraEnabled: boolean;
  requestCameraPermission: () => void;
  cameraStatus: string;
  contactEnabled: boolean;
  requestContactPermission: () => void;
  contactStatus: string;
  notificationEnabled: boolean;
  requestNotificationPermission: () => void;
}

export const PermissionContext = createContext<IPermissionContext>({
  cameraEnabled: false,
  requestCameraPermission: async () => {
    await request(PERMISSIONS.IOS.CAMERA);
  },
  cameraStatus: "denied",
  contactEnabled: false,
  requestContactPermission: async () => {
    await request(PERMISSIONS.IOS.CONTACTS);
  },
  notificationEnabled: false,
  requestNotificationPermission: async () => {
    await requestNotifications(["alert", "sound"]);
  },
  contactStatus: "denied",
});

export const PermissionProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<string>("");
  const [contactEnabled, setContactEnabled] = useState(false);
  const [contactStatus, setContactStatus] = useState<string>("");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const uid = useUserUID();

  useEffect(() => {
    const handleCameraStatus = async (): Promise<void> => {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.DENIED) {
        setCameraStatus("denied");
      }
      if (result === RESULTS.GRANTED) {
        setCameraStatus("granted");
      }
      if (result === RESULTS.BLOCKED) {
        setCameraStatus("blocked");
      }
    };
    handleCameraStatus()
      .then()
      .catch((error) => {
        throw error;
      });
  }, []);
  useEffect(() => {
    const handleContactStatus = async (): Promise<void> => {
      const result = await check(PERMISSIONS.IOS.CONTACTS);
      if (result === RESULTS.DENIED) {
        setContactStatus("denied");
      }
      if (result === RESULTS.GRANTED) {
        setContactStatus("granted");
      }
      if (result === RESULTS.BLOCKED) {
        setContactStatus("blocked");
      }
    };
    handleContactStatus()
      .then()
      .catch((error) => {
        throw error;
      });
    const requestNotificationPermission = async () => {
      try {
        let result = await checkNotifications();

        if (result.status === RESULTS.GRANTED) {
          setNotificationEnabled(true);
        }
        if (result.status != RESULTS.GRANTED) {
          result = await requestNotifications(["alert", "sound", "badge"]);
        }
        if (result.status === RESULTS.BLOCKED) {
          openSettings();
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestNotificationPermission()
      .then()
      .catch((error) => {
        throw error;
      });
  }, []);

  const requestCameraPermission = async (): Promise<void> => {
    try {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.DENIED) {
        const cameraResult = await request(PERMISSIONS.IOS.CAMERA);
        setCameraStatus(cameraResult);
      }
      if (result === RESULTS.GRANTED) {
        setCameraStatus("granted");
        setCameraEnabled(true);
      }
      if (result === RESULTS.BLOCKED) {
        setCameraStatus("blocked");
        await openSettings();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const requestContactPermission = async (): Promise<void> => {
    try {
      const result = await check(PERMISSIONS.IOS.CONTACTS);
      if (result === RESULTS.DENIED) {
        const contactResult = await request(PERMISSIONS.IOS.CONTACTS);
        setContactStatus(contactResult);
      }
      if (result === RESULTS.GRANTED) {
        setContactStatus("granted");
        setContactEnabled(true);
      }
      if (result === RESULTS.BLOCKED) {
        setContactStatus("blocked");
        await openSettings();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <PermissionContext.Provider
      value={{
        cameraEnabled,
        requestCameraPermission,
        cameraStatus,
        contactEnabled,
        requestContactPermission,
        contactStatus,
        notificationEnabled,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): IPermissionContext =>
  useContext(PermissionContext);
