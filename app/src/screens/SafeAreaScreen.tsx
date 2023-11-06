import React, { FC, useMemo } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../theme";

type BasicScreenType = {
  children: React.ReactChild;
};
export const BasicScreen: FC<BasicScreenType> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const safeAreaStyle: ViewStyle = useMemo(() => {
    const style: ViewStyle = {};
    style.paddingTop = 0;
    style.paddingBottom = insets.bottom;
    style.paddingLeft = insets.left;
    style.paddingRight = insets.right;

    return style;
  }, [insets]);
  return (
    <View
      style={[
        safeAreaStyle,
        {
          flex: 1,
        },
      ]}
    >
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export const SafeAreaScreen: FC = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
