import * as functions from 'firebase-functions';
import { Messaging } from './model/message';
import { MessagingProvider } from './provider/messaging';

const messsaging = new MessagingProvider();

export const onCreateNotification = functions.firestore
  .document('notifications/{uid}')
  .onCreate(async (change, context) => {
    const { title, description, target, targetValue } = change.data();
    messsaging.send(target, targetValue, new Messaging(title, description), {
      screen: 'notification',
      action: 'navigate',
    });
  });
