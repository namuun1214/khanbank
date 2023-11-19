import React, { useState } from 'react'
import { SafeAreaScreen } from './SafeAreaScreen'
import _ from 'lodash'
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
import { useEffect } from 'react'
// import RNShake from 'react-native-shake'
// import RNShakeEvent from 'react-native-shake-event'

export default ({ route }: any): JSX.Element => {
  const [data, setData] = useState('HEHEH')
  // useEffect(() => {
  //   setData('blbl')
  // }, [])
  // useEffect(() => {
  //   RNShakeEvent.addEventListener('shake', () => {
  //     setData('shake')
  //   })

  //   return () => {
  //     RNShakeEvent.removeEventListener('shake')
  //   }
  // }, [])
  return (
    <SafeAreaScreen>
      <Text>{data}</Text>
    </SafeAreaScreen>
  )
}
