import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../tab";
import {
  NavigationRoutes,
  NavigatorParameterList,
} from "../NavigationParameter";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { ChevronLeft, HeaderBack, NotificationIcon } from "../../assets";
import { RoomDetails } from "../../screens/RoomDetail";
import { theme } from "../../theme";
import { BillScreen, SplitOptionScreen } from "../../screens";
import { ScanBillScreen } from "../../screens/ScanBillScreen";
import { NotificationScreen } from "../../screens/NotificationScreen";

const Stack = createNativeStackNavigator<NavigatorParameterList>();

export const RootStack: FC = () => {
  const { palette } = theme;
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={NavigationRoutes.BottomTabNavigator}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name={NavigationRoutes.RoomDetails}
        component={RoomDetails}
        options={{
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <HeaderBack />
            </Pressable>
          ),
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
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.ScanBillScreen}
        component={ScanBillScreen}
        options={{
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <HeaderBack />
            </Pressable>
          ),
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
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.SplitOptionScreen}
        component={SplitOptionScreen}
        options={{
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <HeaderBack />
            </Pressable>
          ),
          // headerRight: () => (
          //   <Pressable onPress={() => {

          //   }} style={{ marginRight: 10 }}>
          //     <HeaderCorrectIcon />
          //   </Pressable>
          // ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.BillScreen}
        component={BillScreen}
        options={{
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <HeaderBack />
            </Pressable>
          ),
          // headerRight: () => (
          //   <Pressable onPress={() => {

          //   }} style={{ marginRight: 10 }}>
          //     <HeaderCorrectIcon />
          //   </Pressable>
          // ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.NotificationScreen}
        component={NotificationScreen}
        options={{
          headerStyle: {
            backgroundColor: palette.primary.main,
          },
          headerTintColor: palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <HeaderBack />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
