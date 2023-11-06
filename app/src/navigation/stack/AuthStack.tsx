import React, { FC } from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationRoutes,
  NavigatorParameterList,
} from "../NavigationParameter";
import { AuthScreen, LoginScreen } from "../../screens";
import { useTheme } from "../../providers";
import { useNavigation } from "@react-navigation/native";
import { HeaderBack } from "../../assets";

const Stack = createNativeStackNavigator<NavigatorParameterList>();

export const AuthStack: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={NavigationRoutes.AuthScreen}
        component={AuthScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
          },
          headerTintColor: theme.palette.primary.contrastText,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <HeaderBack />
            </Pressable>
          ),
        }}
        name={NavigationRoutes.LoginScreen}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
