import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Voice from "@react-native-community/voice";
import OpenAI from "openai";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { NavigationRoutes } from "../navigation/NavigationParameter";

export const PayScreen = ({ route }: { route: any }) => {
  const { roomId, roomName, users, isActive } = route.params;
  const [voiceText, setVoiceText] = useState<any>("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigation = useNavigation();
  const [total, setTotal] = useState();
  //  useEffect(() => {
  //   navigation.navigate(NavigationRoutes.SplitOptionScreen, {
  //     total: total,
  //     roomId: roomId,
  //   })
  // }, [data])
  const speechStartHandler = (e: any) => {
    console.log("speechStart successful", e);
  };
  const speechEndHandler = (e: any) => {
    setLoading(false);
    console.log("stop handler", e);
  };
  const speechResultsHandler = (e: any) => {
    const text = e.value[0];
    setVoiceText(text);
  };
  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("en-Us");
    } catch (error) {
      console.log("error", error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      voiceCalculate();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const voiceCalculate = () => {
    axios
      .post("https://openai-vkha.vercel.app/", {
        text: voiceText,
      })
      .then(function (response) {
        setData(response);
        // setTotal()
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <Text>{voiceText}</Text>
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Speak</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.stop}
            onPress={async () => {
              await stopRecording();
              navigation.navigate(NavigationRoutes.RoomDetails, {
                roomId: roomId,
                listData: data,
              });
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "bold",
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: "#000",
  },
  speak: {
    backgroundColor: "#027A48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: "#027A48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    with: "50%",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
});
