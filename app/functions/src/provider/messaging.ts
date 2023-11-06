import * as admin from 'firebase-admin';
import { COLLECTION_USERS } from './consts';
export const TARGET_TOPIC = 'topic';
export const TARGET_PHONE = 'phone';
export const TARGET_TOKEN = 'token';

export type MESSAGING_TARGET_TYPE = 'topic' | 'phone' | 'token'

export class MessagingProvider {
  private messaging: admin.messaging.Messaging;
  private firestore: admin.firestore.Firestore;

  constructor() {
    this.messaging = admin.messaging();
    this.firestore = admin.firestore();
  }

  async send(
    target: MESSAGING_TARGET_TYPE,
    targetValue: string,
    messaging: any,
    extras?: any
  ) {
    try {
      let user;
      switch (target) {
        case TARGET_TOPIC:
          this.messaging.sendToTopic(targetValue, {
            notification: messaging,
            data: extras,
          });
          break;
        case TARGET_TOKEN:
          this.messaging.sendToDevice(targetValue, {
            notification: messaging,
            data: extras,
          }, 
          {
            priority: 'high',
            timeToLive: 200,
            content_available: true, //important for iOS
            time_to_live: 50000,
          }).catch((err) => {
            console.log(err);
          });;
          break;
        case TARGET_PHONE:
          user = await this.getUserByPhoneNumber(targetValue);
          if (user != null)
            this.messaging
              .sendToDevice(
                user.notificationToken,
                {
                  notification: messaging,
                  data: extras,
                },
                {
                  priority: 'high',
                  timeToLive: 200,
                  content_available: true, //important for iOS
                  time_to_live: 50000,
                }
              )
              .catch((err) => {
                console.log(err);
              });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getUserByPhoneNumber(phoneNumber: string) {
    const snapshots = await this.firestore
      .collection(COLLECTION_USERS)
      .where('phoneNumber', '==', phoneNumber)
      .get();
    if (!snapshots.empty) {
      return snapshots.docs[0].data();
    }
    return null;
  }

}
