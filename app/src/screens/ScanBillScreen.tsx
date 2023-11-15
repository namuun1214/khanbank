import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import { SafeAreaScreen } from './SafeAreaScreen'
import _ from 'lodash'
import { takePhotoFromLibrary } from '../utils'
import { Asset } from 'react-native-image-picker'
import {
  CaptureButtonIcon,
  GetFromGalleryIcon,
  RetryCaptureButtonIcon,
  TugrikIcon,
} from '../assets'
import axios from 'axios'
import { theme } from '../theme'
import { Toggle } from '../components/Toggle'
import { Input } from '../components/Input'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../navigation/NavigationParameter'
import ImageResizer from 'react-native-image-resizer'
import { Loading } from '../components/Loading'
import { Spacer } from '../components/core'
const width = Dimensions.get('window').width

export default async function base64File(url: string) {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })
}
const b64toBlob = async (base64: any, type = 'application/octet-stream') =>
  await fetch(base64).then((res) => res.blob())

export const ScanBillScreen = ({ route }: any): JSX.Element => {
  const roomId = route?.params?.roomId
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [total, setTotal] = useState('')
  const [error, setError] = useState(false)
  const [photo, setPhoto] = useState<Asset | undefined>(undefined)
  const onPhoto = useCallback(async (): Promise<void> => {
    const photo = await takePhotoFromLibrary()
    setPhoto(photo)
  }, [])
  const capturePhoto = async () => {
    setLoading(true)
    if (photo?.uri) {
      await ImageResizer.createResizedImage(
        photo.uri,
        photo.width ? photo.width : 800,
        photo.height ? photo.height : 800,
        'JPEG',
        70,
        0,
      ).then(async (resizedImage) => {
        resizedImage.name = roomId + '.jpeg'
        const data: any = await axios
          .post(
            'https://meum1nzv4m.execute-api.us-east-1.amazonaws.com/dev/',
            {
              query: `query Query($key: String) {
                GetPresignedUrl(key: $key)
              }`,
              variables: {
                key: resizedImage.name,
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .catch((e) => {
            console.log(e, 'err')
          })

        const presignedUrl = data.data.data.GetPresignedUrl
        var base64String = await base64File(resizedImage.uri)
        const blob = await b64toBlob(base64String)
        console.log('Sending file to S3...')
        const axiosResponse = await fetch(presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg',
          },
          body: blob,
        })
        if (axiosResponse.status === 200) {
          navigation.navigate(NavigationRoutes.BillScreen, {
            roomId: roomId,
          })
        }
      })
    } else {
      onPhoto()
    }
    setLoading(false)
  }
  return (
    <SafeAreaScreen>
      <>
        {/* <Loading /> */}
        {/* {loading && <Loading />} */}
        <Toggle
          tabOneComponent={
            <View style={{ height: '85%', justifyContent: 'space-between' }}>
              <View
                style={{
                  width: width * 0.9,
                  height: 100,
                  borderColor: '#027A48',
                  borderWidth: 3,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <TugrikIcon />
                <View
                  style={{
                    width: 120,
                    height: 40,
                    borderBottomColor: error ? 'red' : '#027A48',
                    borderBottomWidth: 2,
                  }}
                >
                  <Input
                    placeholder=""
                    role="transparent"
                    value={total}
                    onChangeText={(e) => setTotal(e)}
                  />
                </View>
              </View>
              <Pressable
                onPress={() => {
                  if (Number(total) > 0) {
                    setError(false)
                    navigation.navigate(NavigationRoutes.SplitOptionScreen, {
                      total: total,
                      roomId: roomId,
                    })
                  } else {
                    setError(true)
                  }
                }}
                style={{
                  width: 330,
                  height: 40,
                  backgroundColor: '#027A48',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                }}
              >
                <Text style={{ color: 'white' }}>Үүсгэх</Text>
              </Pressable>
            </View>
          }
          tabOneText="Дүн оруулах"
          tabTwoComponent={
            <View style={styles.container}>
              <View style={styles.cameraView}>
                {photo && (
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.cameraImage}
                  />
                )}
              </View>
              <Spacer size={7} horizontal={true} />
              <View style={[styles.row, styles.evenly]}>
                <Pressable
                  onPress={() => {
                    setPhoto(undefined)
                  }}
                >
                  <RetryCaptureButtonIcon />
                </Pressable>
                <Pressable
                  onPress={() => {
                    onPhoto()
                  }}
                >
                  <GetFromGalleryIcon />
                </Pressable>
              </View>
              <Pressable
                style={{
                  opacity: loading ? 0.5 : 1,
                }}
                onPress={() => {
                  if (!loading) {
                    capturePhoto()
                  }
                }}
              >
                <CaptureButtonIcon />
              </Pressable>
            </View>
          }
          tabTwoText="Bill уншуулах"
        />
      </>
    </SafeAreaScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraImage: {
    width: width - 40,
    height: width,
    resizeMode: 'contain',
  },
  cameraView: {
    backgroundColor: theme.palette.background.secondary,
    width: width - 40,
    height: width,
    borderRadius: 25,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  evenly: {
    justifyContent: 'space-evenly',
    width: '100%',
  },
})
// import { Camera, useCameraDevices } from "react-native-vision-camera";

{
  /* <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          /> */
}
