import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";
import { checkNotifications, RESULTS } from "react-native-permissions";
import { NavigationRoutes } from "../navigation/NavigationParameter";
import { useApnBadge } from "../providers/NotificationProvider";
import { useNavigation } from "@react-navigation/native";
import { useDocumentUtils } from "../hooks";
import { useUserUID } from "../authentication";

export const configurePushNotification = async () => {
  const { setBadge, badge } = useApnBadge();
  const { navigate } = useNavigation();
  const userUid = useUserUID();
  PushNotificationIOS.setApplicationIconBadgeNumber(0);
  const myToken = await AsyncStorage.getItem("fcmToken");
  if (myToken == null) {
    const fcmToken = await messaging().getToken();
    AsyncStorage.setItem("fcmToken", fcmToken);
  }
  // permission check
  checkNotifications().then((result) => {
    if (result.status == RESULTS.GRANTED) {
      messaging().onTokenRefresh((newToken) => {
        // Called when a new registration token is generated for the device. For example, this event can happen when a token expires or when the server invalidates the token.
        AsyncStorage.setItem("fcmToken", newToken);
        useDocumentUtils({
          path: `users/${userUid}`,
        }).updateDocument({
          notificationToken: newToken,
        });
      });
      messaging().onNotificationOpenedApp((notif) => {
        if (Platform.OS == "ios") {
          const newBadge = badge - 1;
          // Badge nemeh
          setBadge(newBadge);
        }
        //When the user presses a notification displayed via FCM, this listener will be called if the app has opened from a background state.
        if (notif) {
          const { data: notifData } = notif;
          if (notifData?.action === "navigate") {
            navigate(NavigationRoutes.NotificationScreen);
          }
        }
      });
      messaging()
        .getInitialNotification() // When a notification from FCM has triggered the application to open from a quit state.
        .then((notif) => {
          if (notif) {
            const { data: notifData } = notif;
            if (notifData?.action === "navigate") {
              navigate(NavigationRoutes.NotificationScreen);
            }
          }
        });
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log(remoteMessage, "setBackgroundMessageHandler");
        let newBadge = badge + 1;
        setBadge(newBadge);
      });
      messaging().onMessage(async (remoteMessage) => {
        //When any FCM payload is received, the listener callback is called with a RemoteMessage.
        if (Platform.OS == "ios") {
          PushNotificationIOS.addNotificationRequest({
            id: remoteMessage.messageId,
            title: remoteMessage.notification.title ?? "",
            body: remoteMessage.notification.body ?? "",
            // badge: badge,
            sound: "default",
          });
        } else {
          PushNotification.localNotification({
            id: remoteMessage.messageId,
            title: remoteMessage.notification.title ?? "",
            body: remoteMessage.notification.body ?? "",
            channel_id: "androidChannel",
            priority: "high",
            android_channel_id: "androidChannel",
            ignoreInForeground: false,
            sound: "default",
            badge: badge,
            vibrate: true,
            playSound: true,
          });
        }
      });
    }
  });
  return;
};
