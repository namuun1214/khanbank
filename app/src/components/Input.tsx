/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  placeholder: string;
  type?: "default" | "password";
  status?: "default" | "disabled";
  value?: string | undefined;
  counter?: boolean;
  helperText?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  messageText?: string;
  messageType?: "default" | "disabled";
  onKeyPress?: (text: string) => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  width?: string | number;
  onFocus?: () => void;
  maxLength?: number | 500;
  setError?: () => void;
  error?: string;
  readonly?: boolean;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  role?: string;
}

export const Input: React.FC<Props> = (props) => {
  const {
    type,
    placeholder,
    status = "default",
    value,
    keyboardType,
    onKeyPress,
    onChangeText,
    onSubmitEditing,
    width,
    onFocus,
    maxLength,
    onBlur,
    autoCapitalize,
    role = "#000",
  } = props;
  const animationIndex = useRef(new Animated.Value(0)).current;
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const translateYLabel = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });
  const translateXLabel = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, -0.9 * placeholder.length * 2],
  });
  const translateYInput = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7],
  });
  const scale = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  useEffect(() => {
    if (value && !isInputFocus) {
      Animated.timing(animationIndex, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } else if (!value) {
      Animated.timing(animationIndex, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    if (isInputFocus) {
      Animated.timing(animationIndex, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isInputFocus, value]);

  const styles = StyleSheet.create({
    label: {
      position: "absolute",
      zIndex: 0,
    },
    input: {
      height: 37,
      zIndex: 1,
      fontSize: 17,
      fontWeight: "400",
      letterSpacing: 1,
    },
    container: {
      display: "flex",
      height: 50,
      opacity: status === "disabled" ? 0.5 : 1,
      width: width ? width : "100%",
      borderRadius: 10,
      borderColor: role,
      borderWidth: isInputFocus ? 2 : 1,
      paddingHorizontal: 12,
      backgroundColor: role,
    },
    box: {
      display: "flex",
      justifyContent: "center",
      height: 32,
      width: "100%",
      position: "relative",
    },
    innerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.innerBox}>
          <Animated.View
            style={[
              styles.label,
              {
                transform: [
                  { translateY: translateYLabel },
                  { scale },
                  { translateX: translateXLabel },
                ],
              },
            ]}
          >
            <Text
              style={{
                color: "#b2b2b2",
              }}
            >
              {placeholder}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              width: type === "password" ? "84%" : "100%",
              transform: [{ translateY: translateYInput }],
            }}
          >
            <TextInput
              autoCorrect={false}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
              style={[styles.input, { color: "black" }]}
              onFocus={useCallback(() => {
                setIsInputFocus(true);
                onFocus && onFocus();
              }, [])}
              onBlur={useCallback((event) => {
                onBlur &&
                  onBlur(
                    event as NativeSyntheticEvent<TextInputFocusEventData>
                  );
                setIsInputFocus(false);
              }, [])}
              value={value}
              keyboardType={keyboardType}
              editable={status === "disabled" ? false : true}
              scrollEnabled={false}
              secureTextEntry={type === "password" ? visible : false}
              onChangeText={useCallback((text) => {
                onChangeText && onChangeText(String(text));
              }, [])}
              onSubmitEditing={useCallback(
                () => onSubmitEditing && onSubmitEditing(),
                []
              )}
              onKeyPress={useCallback(
                (event: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
                  onKeyPress && onKeyPress(String(event.nativeEvent.key)),
                []
              )}
            />
          </Animated.View>
          <TouchableOpacity
            onPress={useCallback(() => setVisible(!visible), [])}
            style={{ display: type === "password" ? "flex" : "none" }}
          >
            <Text style={{ fontWeight: "600", color: role }}>
              {visible ? "харах" : "нуух"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
