import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native'
import { KeyIcon } from '../../assets'
import { Button } from '../../components'
import { Spacer } from '../../components/core'
import { Input } from '../../components/Input'
import { useDocumentUtils } from '../../hooks'
import { theme } from '../../theme'
import { SafeAreaScreen } from '../SafeAreaScreen'
import messaging from '@react-native-firebase/messaging'
import { RESULTS, checkNotifications } from 'react-native-permissions'
import { useUserData } from '../../providers'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nickName, setNickName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSentMessage, setIsSentMessage] = useState(false)
  const otpTextRef = useRef<TextInput>(null)
  const { setUserData, userData } = useUserData()
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null)
  const [code, setCode] = useState('')

  // auth login with phone number section

  const signInWithPhoneNumber = async () => {
    setErrorMessage('')
    setLoading(true)
    await auth()
      .signInWithPhoneNumber('+976' + phoneNumber)
      .then(async (confirmation: FirebaseAuthTypes.ConfirmationResult) => {
        setIsSentMessage(true)
        setConfirm(confirmation)
        setLoading(false)
      })
      .catch((error: any) => {
        console.log(error)
        setErrorMessage('Дугаар буруу байна.')
        setLoading(false)
      })
  }

  // confirmation code checking function
  const confirmCode = async (code: string) => {
    try {
      await confirm?.confirm(code).then((resp) => {
        if (resp?.additionalUserInfo?.isNewUser) {
          checkNotifications().then((result) => {
            if (result.status !== RESULTS.GRANTED) {
              return
            }
            messaging()
              .getToken()
              .then((notificationToken) => {
                useDocumentUtils({
                  path: `users/${resp.user.uid}`,
                }).updateDocument({
                  phoneNumber: resp.user.phoneNumber.split('+976')[1],
                  nickName: nickName,
                  notificationToken,
                })
              })
              .catch((error) => {
                console.log(error)
              })
          })
        }
        setUserData({ ...userData, phoneNumber: resp.user.phoneNumber })
      })
    } catch (error) {
      setErrorMessage('Код буруу байна.')
    }
  }
  return (
    <SafeAreaScreen>
      <KeyboardAvoidingView
        style={[styles.grow, styles.keyboardAvoider]}
        keyboardVerticalOffset={140}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <KeyIcon />
          <Spacer size={10} horizontal />
          <Text>
            {!isSentMessage
              ? 'Та өөрийн нэвтрэх мэдээллээ оруулна уу.'
              : phoneNumber.slice(0, 4) +
                '**** дугаарт 6 оронтой код илгээлээ.'}
          </Text>
        </View>
        <View style={styles.grow}>
          {isSentMessage ? (
            <View>
              <Pressable
                style={[styles.row, styles.between, styles.center]}
                onPress={() => {
                  otpTextRef?.current?.focus()
                }}
              >
                {new Array(6).fill(0).map((_, index) => {
                  return (
                    <View
                      style={[styles.otpNode, styles.center]}
                      key={'key-' + index}
                    >
                      <Text style={styles.otpNodeText}>
                        {code.length > index ? code[index] : ' '}
                      </Text>
                    </View>
                  )
                })}
              </Pressable>
              <TextInput
                style={styles.otpInput}
                ref={otpTextRef}
                value={code}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setErrorMessage('')
                  setCode(text)
                }}
                maxLength={6}
              />
            </View>
          ) : (
            <View>
              <Text>Нэр/ Nickname</Text>
              <Input
                type="default"
                placeholder=""
                maxLength={8}
                keyboardType="email-address"
                value={nickName}
                role={theme.palette.background.secondary}
                onChangeText={(value) => {
                  setNickName(value)
                }}
              />
              <Spacer size={5} horizontal />
              <Text>Утасны дугаар</Text>
              <Input
                type="default"
                placeholder=""
                maxLength={8}
                keyboardType="number-pad"
                value={phoneNumber}
                role={theme.palette.background.secondary}
                onChangeText={(value) => {
                  setErrorMessage('')
                  setPhoneNumber(
                    value
                      .split('')
                      .filter((char) => char != ' ')
                      .join(''),
                  )
                }}
              />
            </View>
          )}
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          {/* <Spacer size={2.5} horizontal /> */}
          <Button
            type="primary"
            onPress={async () => {
              if (isSentMessage) {
                await confirmCode(code)
              } else {
                await signInWithPhoneNumber()
              }
            }}
          >
            Үргэлжлүүлэх
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaScreen>
  )
}
const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    // flexDirection: "column",
    // flex: 1,
    // marginHorizontal: 20,
    // backgroundColor: theme.palette.background.default,
  },
  TitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  grow: {
    flex: 1,
  },
  evenly: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  between: {
    justifyContent: 'space-between',
  },
  otpNode: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: theme.palette.background.secondary,
    borderRadius: 10,
    marginHorizontal: 2.5,
  },
  otpNodeText: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
  otpInput: {
    opacity: 0,
    height: 1,
    width: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 12,
    marginLeft: 8,
  },
  keyboardAvoider: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 20,
  },
})
