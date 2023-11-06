import * as admin from 'firebase-admin';


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export * from './onCreateNotification';
export * from './onCreateRoomId';
