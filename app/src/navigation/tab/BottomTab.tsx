import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationRoutes,
  NavigatorParameterList,
} from '../NavigationParameter'
import { useTheme } from '../../providers'
import { HomeScreen } from '../../screens/HomeScreen'
import { CreateRoomScreen } from '../../screens/CreateRoomScreen'
import { Pressable, Text } from 'react-native'
import { NotificationIcon } from '../../assets'
import HomeScreenIcon from '../../assets/HomeScreenIcon'
import CreateRoomIcon from '../../assets/CreateRoomIcon'
import ProfileScreenIcon from '../../assets/ProfileScreenIcon'
import { ProfileScreen } from '../../screens'
import { useNavigation } from '@react-navigation/native'
import { PayScreen } from '../../screens/payScreen/PayScreen'

const Tab = createBottomTabNavigator<NavigatorParameterList>()

export const BottomTabNavigator: FC = () => {
  const { palette } = useTheme()
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: palette.primary.main,
        },
        tabBarActiveTintColor: palette.primary.main,
        tabBarInactiveTintColor: palette.default,
        tabBarStyle: {
          backgroundColor: palette.primary.main,
          borderRadius: 20,
          height: 110,
        },
      }}
    >
      <Tab.Screen
        name={NavigationRoutes.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarInactiveTintColor: palette.primary.main,
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate(NavigationRoutes.NotificationScreen)
              }
              style={{ marginRight: 10 }}
            >
              <NotificationIcon />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <HomeScreenIcon color={color} />,
        }}
      />
      <Tab.Screen
        name={NavigationRoutes.CreateRoom}
        component={CreateRoomScreen}
        options={{
          tabBarInactiveTintColor: palette.primary.main,
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate(NavigationRoutes.NotificationScreen)
              }
              style={{ marginRight: 10 }}
            >
              <NotificationIcon />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <CreateRoomIcon color={color} />,
        }}
      />
      <Tab.Screen
        name={NavigationRoutes.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarInactiveTintColor: palette.primary.main,
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate(NavigationRoutes.NotificationScreen)
              }
              style={{ marginRight: 10 }}
            >
              <NotificationIcon />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <ProfileScreenIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
