import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { theme } from "../theme";
interface ButtonType extends PressableProps {
  children: string;
  type: "primary" | "secondary";
}
type StylesType = {
  primary?: {
    container: ViewStyle;
    text: TextStyle;
  };
  secondary?: {
    container: ViewStyle;
    text: TextStyle;
  };
  icon?: {
    container: ViewStyle;
    text: TextStyle;
  };
};
export const Button = ({ type, children, onPress }: ButtonType) => {
  return (
    <Pressable
      onPress={onPress}
      style={[buttonStyles[type]?.container, styles.center, styles.container]}
    >
      <Text style={[buttonStyles[type]?.text, styles.text]}>{children}</Text>
    </Pressable>
  );
};

const buttonStyles: StylesType = {
  primary: {
    container: {
      backgroundColor: theme.palette.primary.main,
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
  },
  secondary: {
    container: {
      backgroundColor: theme.palette.background.secondary,
    },
    text: {
      color: theme.palette.primary.dark,
    },
  },
};
const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 20,
    width: "100%",
  },
  text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
