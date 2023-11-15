import React, { useState } from 'react'
import { StyleSheet, Text, Switch, View, TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PushNotification from 'react-native-push-notification'
import { checkNotifications, RESULTS } from 'react-native-permissions'
import { BasicScreen } from './SafeAreaScreen'
import { useApnBadge } from '../providers/NotificationProvider'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../navigation/NavigationParameter'
import { theme } from '../theme'
import { Animated, ScrollView, Image, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
export const Toggle = ({
  tabOneText,
  tabTwoText,
  tabOneComponent,
  tabTwoComponent,
}): JSX.Element => {
  const [state, setState] = useState<{
    active?: number
    xTabOne?: number
    xTabTwo?: number
    translateX?: any
    translateXTabOne?: any
    translateXTabTwo?: any
    translateY?: any
  }>({
    translateY: -1000,
    active: 1,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
  })

  const handleSlide = (type: number) => {
    const {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
    } = state
    Animated.spring(translateX, {
      toValue: type,
      useNativeDriver: false,
    }).start()

    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          useNativeDriver: false,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: 'relative',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: '#027A48',
              borderRadius: 10,
              transform: [
                {
                  translateX: state.translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#027A48',
              borderRadius: 10,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onLayout={(event) => {
              setState({ ...state, xTabOne: event.nativeEvent.layout.x })
            }}
            onPress={async () => {
              await setState({
                ...state,
                active: 1,
              })
              handleSlide(state.xTabOne)
            }}
          >
            <Text
              style={{
                color: state.active === 0 ? '#027A48' : '#fff',
              }}
            >
              {tabOneText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#027A48',
              borderRadius: 10,
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onLayout={(event) =>
              setState({ ...state, xTabTwo: event.nativeEvent.layout.x })
            }
            onPress={async () => {
              await setState({ ...state, active: 0 })
              handleSlide(state.xTabTwo)
            }}
          >
            <Text
              style={{
                color: state.active === 1 ? '#027A48' : '#fff',
              }}
            >
              {tabTwoText}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  translateX: state.translateXTabOne,
                },
              ],
            }}
            onLayout={(event) =>
              setState({
                ...state,
                translateY: event.nativeEvent.layout.height,
              })
            }
          >
            {tabOneComponent}
          </Animated.View>

          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  translateX: state.translateXTabTwo,
                },
                {
                  translateY: -state.translateY,
                },
              ],
            }}
          >
            {tabTwoComponent}
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  )
}
