import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';    

export const onCreateRoomId = functions.firestore
  .document('rooms/{roomid}')
  .onCreate(async (change, context) => {
    const auth = admin.auth()
    const firestore = admin.firestore();
    
    const snapshotRooms = await firestore.doc(`rooms/${context.params.roomid}`).get();
    const { users }: any = { ...snapshotRooms.data() }

    change.data().users.map(async (el: any, index: number) => {
        await auth.getUserByPhoneNumber(`+976${el.phoneNumber}`).then( async user => {
            const snapshotUsers = await firestore.doc(`users/${user.uid}`).get();
            const collUser : any = { ...snapshotUsers.data() }
            users[index].id = user.uid
            await firestore.doc(`rooms/${context.params.roomid}`).set({ users: users }, { merge: true });
            
            try{
                if(collUser.rooms){
                    const isRoomThere = collUser.rooms.find((room: any) => room.id == context.params.roomid  );
                    !isRoomThere ? collUser.rooms.push({ id: context.params.roomid, status: 'pending' }) : collUser.rooms
                    await firestore.doc(`users/${user.uid}`).set({ rooms: collUser.rooms }, { merge: true });
                }else{
                    await firestore.doc(`users/${user.uid}`).set({ rooms: [{ id: context.params.roomid, status: 'pending' }] }, { merge: true });
                }
            }catch(e){ console.log(e) }
        })
    })    
    return 'success'
  });
