import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCollection, useCollectionUtils, useDocument, useDocumentUtils } from '../hooks';
import { NavigationRoutes } from '../navigation/NavigationParameter';
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CloseIcon, RightArrowIcon } from "../assets";
import { RadioIcon, SelectedRadioIcon, SplitIcon } from "../assets/SplitIcon";
import { Center, Modal, Modal as NativeModal, Overlay } from "../components/core";
import { Toggle } from "../components/Toggle";
import { theme } from "../theme";
import { SafeAreaScreen } from "./SafeAreaScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../authentication";
type notEqualItemType = {
  name: string;
  price: number;
  quantity: number;
  index: number;
  showSplit: (index: number) => void;
};
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const SplitOptionScreen = ({ route }: any): JSX.Element => {
  // const { data, loading } = useCollection({ path: "users" });
  const total = route.params.total;
  const roomId = route.params.roomId;
  const { data, loading } = useDocument({ path: `rooms/${roomId}` })
  const [isVisibleModal, setVisibleModal] = useState(false)
  const { createDocument } = useCollectionUtils({ path: 'notifications' });
  const { updateDocument } = useDocumentUtils({ path: `rooms/${roomId}` })
  const selfTotal = parseInt(total / data?.users?.length);
  const { navigate } = useNavigation();
  const [splitOption, setSplitOption] = useState('equally');
  const sendNotif = async (data: any) => {
    const usersData = data?.users;
    const newData = usersData.map((user) => {
      return { ...user, fee: selfTotal, isPaid: false }
    })
    try {
      await updateDocument({ users: newData, isCalculated: true, splitOption: splitOption, total: total });
      data.users.map(async (user: any) => {

        await createDocument({
          title: "Нэхэмжлэл",
          description: `Танд ${data?.adminUser?.phoneNumber} дугаартай хэрэглэгчээс ${selfTotal}₮ нэхэмжлэв.`,
          target: "phone",
          targetValue: user.phoneNumber,
        });
      });
      console.log("done.");
    } catch (err) {
      console.log(err);
    }
  };
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitModalItemIndex, setSplitModalItemIndex] = useState(0);
  const [splitModalInput, setSplitModalInput] = useState("");
  const showSplit = (index: number) => {
    console.log("showSplit");
    setSplitModalItemIndex(index);
    setShowSplitModal(true);
  };
  const mockData = [
    {
      name: "Банан",
      price: 8000,
      quantity: 10,
    },
    {
      name: "Алим",
      price: 8000,
      quantity: 10,
    },
  ];
  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <NativeModal
        transparent
        visible={showSplitModal}
        onRequestClose={() => {
          setShowSplitModal(false);
        }}
      >
        <View
          style={[
            styles.center,
            {
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: 16,
              top: 0,
              position: "absolute",
              width: width,
              height: height,
            },
          ]}
        >
          <View style={styles.splitModalContainer}>
            <Text
              style={[
                styles.textCenter,
                {
                  fontWeight: "600",
                  fontSize: 18,
                },
              ]}
            >
              {mockData[splitModalItemIndex].name}
            </Text>
            <Text style={[styles.textCenter, styles.splitModalDesription]}>
              Тухайн барааг хувааж төлөх{"\n"} найзуудынхаа тоог оруулна уу.
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={[styles.textCenter, styles.splitModalInput]}
              value={splitModalInput}
              onChangeText={(text) => setSplitModalInput(text)}
            />
            <Pressable
              onPress={() => {
                setShowSplitModal(false);
                setSplitModalInput("");
              }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
              }}
            >
              <CloseIcon color="#98B5FF" />
            </Pressable>
          </View>
        </View>
      </NativeModal>
      <View style={{ width: "100%", height: "100%" }}>
        <Toggle
          tabOneComponent={
            <View
              style={{ width: "100%", height: "100%", flexDirection: "column" }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {data &&
                  data?.users?.map((user) => (
                    <View
                      style={{
                        width: "100%",
                        borderBottomColor: "#D5DDE5",
                        borderBottomWidth: 1,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            borderColor: "#98B5FF",
                            borderWidth: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#98B5FF",
                              fontSize: 30,
                              textAlign: "center",
                            }}
                          >
                            {user?.name
                              ? user?.name.split("")[0].toUpperCase()
                              : "A"}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 45,
                            justifyContent: "space-between",
                            marginLeft: 10,
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            {user?.name}
                          </Text>
                          <Text>{user.phoneNumber}</Text>
                        </View>
                      </View>
                      <Text style={{ color: "#98B5FF", fontWeight: "bold" }}>
                        {selfTotal}₮
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          }
          tabOneText="Тэнцүү"
          tabTwoComponent={
            <NotEqualContainer showSplit={showSplit} data={mockData} />
          }
          tabTwoText="Авсанаа"
        />
        <View
          style={{
            width: "100%",
            height: "20%",
            borderColor: "#D5DDE5",
            borderWidth: 1,
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
              Нийт: {total}₮
            </Text>
            <Text style={{ color: "#98B5FF", fontSize: 16 }}>
              Биелэлт: 0/100%
            </Text>
          </View>
          <Pressable
            onPress={() => setVisibleModal(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#98B5FF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RightArrowIcon />
          </Pressable>
        </View>
      </View>
      <Modal
        color={"#98B5FF"}
        rightButtonText="Үгүй"
        leftButtonText="Тийм"
        title="Та баримтыг багийн гишүүд рүү илгээхдээ итгэлтэй байна уу?"
        setIsVisible={setVisibleModal}
        isVisible={isVisibleModal}
        onLeftButton={() => setVisibleModal(false)}
        onRightButton={async () => { await setSplitOption('equally'); sendNotif(data); setVisibleModal(false); navigate(NavigationRoutes.HomeScreen) }}
      />
    </View>
  );
};
const NotEqualContainer = ({ showSplit, data }: any): JSX.Element => {
  return (
    <>
      {data.map((item, index) => (
        <NotEqualItem
          showSplit={showSplit}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          index={index}
        />
      ))}
    </>
  );
};
const NotEqualItem = ({
  name,
  price,
  quantity,
  index,
  showSplit,
}: notEqualItemType): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [piece, setPiece] = useState(0);
  return (
    <View
      style={[
        styles.row,
        styles.justifyBetween,
        {
          width: "100%",
          marginVertical: 10,
        },
      ]}
    >
      <Pressable onPress={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? <SelectedRadioIcon /> : <RadioIcon />}
      </Pressable>
      <View style={styles.col}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={styles.piece}>{quantity} ширхэг</Text>
      </View>
      <View>
        <Text>{price}₮</Text>
      </View>
      <View style={[styles.row, styles.center]}>
        <Pressable
          style={[styles.plusQuantity, styles.center]}
          onPress={() => setPiece(piece - 1 >= 0 ? piece - 1 : 0)}
        >
          <Text style={styles.plusText}>-</Text>
        </Pressable>
        <View style={[styles.quantityTextContainer, styles.center]}>
          <Text style={styles.quantityText}>{piece}</Text>
        </View>
        <Pressable
          style={[styles.plusQuantity, styles.center]}
          onPress={() => setPiece(piece + 1 <= quantity ? piece + 1 : quantity)}
        >
          <Text style={styles.plusText}>+</Text>
        </Pressable>
        <Pressable
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            //Show Split Icon
            showSplit(index);
          }}
        >
          <SplitIcon />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  plusQuantity: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
  },
  plusText: {
    color: theme.palette.tertiary,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    // lineHeight: 24,
  },
  quantityTextContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: theme.palette.background.default,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  piece: {
    color: theme.palette.primary.main,
  },
  splitModalContainer: {
    padding: 25,
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
  splitModalInput: {
    padding: 20,
    fontSize: 18,
    color: "#141414",
    borderWidth: 1,
    borderColor: "#98B5FF",
    borderRadius: 40,
  },
  splitModalDesription: {
    marginVertical: 20,
  },
});
