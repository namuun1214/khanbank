import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const token = await messaging().getToken();
        }
    } catch (error) {
        throw error;
    }
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});
