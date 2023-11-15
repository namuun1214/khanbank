import React, { useEffect, useMemo, useState } from 'react'
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { BasicScreen } from './SafeAreaScreen'
import { Toggle } from '../components/Toggle'
import { theme } from '../theme'
import { configurePushNotification } from '../utils/configurePushNofitication'
import { Center, Modal, Queue, Spacer, Stack } from '../components/core'
import { Room } from '../components/Room'
import { useCollection, useDocument, useDocumentUtils } from '../hooks'
import { useUserUID } from '../authentication'
import { ROOM_DATA_TYPE, USER_DATA_TYPE, USER_ROOM_DATA_TYPE } from '../types'
import {
  ROOM_STATUS_ACCEPTED,
  ROOM_STATUS_DECLINED,
  ROOM_STATUS_PENDING,
} from '../helpers/consts'
import { Loading } from '../components/Loading'
import { AddIcon, QpayIcon } from '../assets'
import QRCodeScanner from 'react-native-qrcode-scanner'

const ActiveRooms = (): JSX.Element => {
  const userUid = useUserUID()
  const { data, loading } = useDocument<USER_DATA_TYPE>({
    path: `users/${userUid}`,
  })

  const pendingRoomsId: string[] = useMemo(() => {
    if (!data) return ['fe']
    const result = data?.rooms
      ?.filter(
        (item: USER_ROOM_DATA_TYPE) => item.status === ROOM_STATUS_PENDING,
      )
      .map((item: USER_ROOM_DATA_TYPE) => item.id)
    if (result?.length == 0) {
      return ['fe']
    } else {
      return result
    }
  }, [data])

  const acceptedRoomsId: string[] = useMemo(() => {
    if (!data) return ['fe']
    const result = data?.rooms
      ?.filter(
        (item: USER_ROOM_DATA_TYPE) => item.status === ROOM_STATUS_ACCEPTED,
      )
      .map((item: USER_ROOM_DATA_TYPE) => item.id)
    if (result?.length == 0) {
      return ['fe']
    } else {
      return result
    }
  }, [data])
  const {
    data: pendingRoomData,
    loading: pendingRoomDataLoading,
  } = useCollection({
    path: 'rooms',
    where: `_id in ${pendingRoomsId?.join(',')}&isActive == true`,
  })
  const {
    data: acceptedRoomData,
    loading: acceptedRoomDataLoading,
  } = useCollection({
    path: 'rooms',
    where: `_id in ${acceptedRoomsId?.join(',')}&isActive == true`,
  })

  if (acceptedRoomDataLoading || pendingRoomDataLoading) {
    return <Loading />
  }
  return (
    <View style={styles.container}>
      <Stack size={5} width="100%">
        <Text style={styles.status}>Хүлээгдэж буй өрөө</Text>
        {pendingRoomData.map((room, index) => {
          return (
            <Room {...(room as ROOM_DATA_TYPE)} isPending={true} key={index} />
          )
        })}
        <Center>
          {pendingRoomData.length === 0 && (
            <Text style={styles.noRoomText}>
              Танд одоогоор Хүлээгдэж буй өрөө байхгүй байна
            </Text>
          )}
        </Center>
        <Text style={styles.status}>Хаагдаагүй өрөө</Text>
        {acceptedRoomData.map((room, index) => {
          return <Room {...(room as ROOM_DATA_TYPE)} key={index} />
        })}
        <Center>
          {acceptedRoomData.length === 0 && (
            <Text style={styles.noRoomText}>
              Танд одоогоор Хаагдаагүй өрөө байхгүй байна
            </Text>
          )}
        </Center>
      </Stack>
    </View>
  )
}
const History = (): JSX.Element => {
  const userUid = useUserUID()
  const { data, loading } = useDocument<USER_DATA_TYPE>({
    path: `users/${userUid}`,
  })

  const allRoomsId: string[] = useMemo(() => {
    if (!data) return ['fe']
    const result = data?.rooms
      ?.filter(
        (item: USER_ROOM_DATA_TYPE) => item.status !== ROOM_STATUS_DECLINED,
      )
      .map((item: USER_ROOM_DATA_TYPE) => item.id)
    if (result?.length == 0) {
      return ['fe']
    } else {
      return result
    }
  }, [data])
  const { data: allInactiveRoomsData } = useCollection({
    path: 'rooms',
    where: `_id in ${allRoomsId?.join(',')}&isActive == false`,
  })

  return (
    <View style={styles.container}>
      <Stack size={5} width="100%">
        {allInactiveRoomsData.map((room, index) => {
          return (
            <Room {...(room as ROOM_DATA_TYPE)} isPending={false} key={index} />
          )
        })}
        <Center>
          {allInactiveRoomsData.length === 0 && (
            <Text style={styles.noRoomText}>
              Танд одоогоор түүх үүсээгүй байна
            </Text>
          )}
        </Center>
      </Stack>
    </View>
  )
}
export const HomeScreen = (): JSX.Element => {
  const [isQRModalOpen, setQRModalOpen] = useState(false)
  const userUid = useUserUID()
  let roomData = useDocument({ path: `users/${userUid}` }).data?.rooms || []
  let userData = useDocument({ path: `rooms/${userUid}` }).data?.users
  const { updateDocument: updateUserData } = useDocumentUtils({
    path: `users/${userUid}`,
  })
  const onSuccess = async (event) => {
    setQRModalOpen(false)
    roomData?.push({ id: event.data, status: 'accepted' })
    updateUserData({ rooms: roomData })
    userData.push({ id: userUid })
    await firestore()
      .doc(`rooms/${event.data}`)
      .set(
        { updatedAt: firestore.FieldValue.serverTimestamp(), users: userData },
        { merge: true },
      )
    // updateRoomData({ users: userData })
  }
  configurePushNotification()

  return (
    <>
      <BasicScreen>
        <View style={{ width: '100%', height: '100%' }}>
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#027A48',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 50,
              paddingTop: 50,
            }}
          >
            <Text style={styles.title}>Khan Pay-д тавтай морил</Text>
            <Text style={styles.subtitle}>Өдрийн мэнд Намуун</Text>
            <Queue justifyContent="space-between" size={25}>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    height: 48,
                    width: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <QpayIcon />
                </View>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  QPay
                </Text>
              </Stack>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    height: 48,
                    width: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <QpayIcon />
                </View>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  Шилжүүлэг
                </Text>
              </Stack>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    height: 48,
                    width: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <QpayIcon />
                </View>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  Хувааж төлөх
                </Text>
              </Stack>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    height: 48,
                    width: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <QpayIcon />
                </View>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  Мөрч
                </Text>
              </Stack>
            </Queue>
          </View>

          <Stack>
            <Toggle
              tabOneComponent={<ActiveRooms />}
              tabOneText="Өрөөнүүд"
              tabTwoComponent={<History />}
              tabTwoText="Түүх"
            />
          </Stack>
          {isQRModalOpen && (
            <View style={styles.popup}>
              <QRCodeScanner
                onRead={onSuccess}
                containerStyle={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                cameraStyle={{
                  width: 250,
                  height: 250,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                topContent={
                  <View>
                    <Text style={styles.centerText}>
                      Та тооцоо хуваах өрөөнийхөө
                      <Text style={styles.textBold}> QR кодыг</Text> уншуулж
                      орно уу.
                    </Text>
                  </View>
                }
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => {
                      setQRModalOpen(false)
                    }}
                  >
                    <Text style={styles.buttonText}>Буцах</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>
      </BasicScreen>
      {/* <TouchableOpacity
        style={styles.joinRoom}
        onPress={() => {
          setQRModalOpen(true)
        }}
      >
        <Queue
          size={10}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <AddIcon color="white" />
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Өрөөнд нэгдэх
          </Text>
        </Queue>
      </TouchableOpacity> */}
    </>
  )
}

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    width: '100%',
    margin: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: 'white',
  },
  status: {
    fontSize: 15,
    fontWeight: '300',
  },
  noRoomText: {
    maxWidth: '80%',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: '#B8C1CC',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 50,
    color: 'white',
  },
  joinRoom: {
    backgroundColor: theme.palette.primary.light,
    height: 50,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 20,
  },
})
