import React, { createContext, useContext, useState, useRef } from "react";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export const APNBadgeContext = createContext({
  badge: 0,
  setBadge: (val: any) => {},
});
export const useApnBadge = () => useContext(APNBadgeContext);

export const APNBadgeProvider = ({ children }) => {
  const [badge, _setBadge] = useState(0);
  const badgeRef = useRef(badge);

  const setBadge = (val) => {
    PushNotificationIOS.getApplicationIconBadgeNumber((num) => {
      _setBadge(num);
    });
    badgeRef.current = val;
    PushNotificationIOS.setApplicationIconBadgeNumber(val);
    _setBadge(val);
  };

  return (
    <APNBadgeContext.Provider
      value={{
        badge: badgeRef.current,
        setBadge: setBadge,
      }}
    >
      {children}
    </APNBadgeContext.Provider>
  );
};
