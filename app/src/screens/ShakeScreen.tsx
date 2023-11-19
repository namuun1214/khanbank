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
import RNShake from 'react-native-shake'
import RNShakeEvent from 'react-native-shake-event'
import OpenAI from 'openai'

const openai = new OpenAI()
async function main() {
  console.log('OPenAI running')
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  })

  console.log('here', completion.choices[0])
  return completion.choices[0].message.content
}
export default ({ route }: any): JSX.Element => {
  const [data, setData] = useState('HEHEH')
  // useEffect(() => {
  //   setData(main())
  // }, [])

  // useEffect(() => {
  //   RNShakeEvent.addEventListener('shake', () => {
  //     console.log('Device shake!')
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
