import React, { ReactElement, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View, Clipboard } from "react-native";
import _ from "lodash";
import Contact from "../components/Contact";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../navigation/NavigationParameter";
import InvoiceIcon from "../assets/InvoiceIcon";
import { Modal, Queue, Spacer, Stack } from "../components/core";
import { BasicScreen } from "./SafeAreaScreen";
import { useUserUID } from "../authentication";
import { useDocument, useDocumentUtils } from "../hooks";
import { SafeAreaScreen } from ".";
import { Toggle } from "../components/Toggle";
import { EquallyIcon, RightArrowIcon } from "../assets";
import { theme } from "../theme";
import Button from "../components/Button";

export const RoomDetails = ({ route, navigation }): ReactElement => {
  const { roomId, roomName, users, isActive } = route.params;
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [isVisibleModal, setVisibleModal] = useState(false);
  const uid = useUserUID();
  const { data } = useDocument({ path: `rooms/${roomId}` });
  const { updateDocument } = useDocumentUtils({ path: `rooms/${roomId}` });
  const { navigate } = useNavigation();
  const [isClosed, setClosed] = useState(false);
  const { data: adminData, loading } = useDocument({ path: `users/${data?.adminUser}` })
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    setCopiedText(text)
  }
  const myFee = data?.users?.map((user) => {
    if (user.id === uid) {
      return user.fee
    }
  })
  const calculateResult = () => {
    const paidUsers = data?.users?.filter((user) => {
      return user.isPaid
    })
    return parseInt(paidUsers.length * 100 / data?.users.length)
  }
  console.log()
  const closeTheRoom = async () => {
    await updateDocument({ isActive: !data?.isActive })
    setClosed(true)
  }
  return (
    <SafeAreaScreen>
      <BasicScreen>
        <View>
          <Spacer size={5} horizontal={true} />
          <Toggle tabOneComponent={<View style={{ width: '100%' }}>
            {data?.adminUser === uid && !data?.isCalculated && (
              <TouchableOpacity
                onPress={() =>
                  navigate(NavigationRoutes.ScanBillScreen, {
                    roomId,
                  })
                }
              >
                <View style={styles.card}>
                  <View style={styles.container}>
                    <View style={{ width: "100%" }}>
                      <View style={styles.infoContainer}>
                        <Spacer size={8} horizontal={true} />
                        <InvoiceIcon />
                        <Spacer size={5} horizontal={true} />
                        <Text style={styles.number}>Баримт оруулах</Text>
                        <Spacer size={8} horizontal={true} />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {data?.splitOption === 'equally' ? (
              <Stack size={5} justifyContent="space-around" height="100%">
                <Stack size={3}>
                  <Queue size={5} justifyContent="flex-start" alignItems="center">
                    <EquallyIcon />
                    <Text style={{ fontSize: 17 }}>    Тэцүү хуваалт</Text>
                  </Queue>
                  <View style={styles.divider} />
                </Stack>
                <View style={{ width: '100%' }}>
                  {users.map((element, index) => {
                    console.log(element)
                    return <Contact roomDetail={element} roomId={roomId} key={index} />;
                  })}
                </View>

                {data?.adminUser === uid ? (<View
                  style={{
                    width: "100%",
                    borderColor: "#D5DDE5",
                    borderWidth: 1,
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",

                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                      Нийт: {data?.total}₮
            </Text>
                    <Text style={{ color: "#98B5FF", fontSize: 16 }}>
                      Биелэлт: {calculateResult()}/100%
            </Text>
                  </View>
                  <Pressable
                    onPress={() => closeTheRoom()}
                    style={{
                      width: 90,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#98B5FF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: 'white' }}>{data?.isActive ? 'Өрөөг хаах' : 'Өрөөг нээх'}</Text>
                  </Pressable>
                </View>) : (
                  <View
                    style={{
                      width: "100%",
                      borderColor: "#D5DDE5",
                      borderWidth: 1,
                      padding: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",

                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                        Миний төлөх: {myFee} ₮
            </Text>
                    </View>
                    <Pressable
                      onPress={() => setVisibleModal(true)}
                      style={{
                        width: 90,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: "#98B5FF",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: 'white' }}>Данс харах</Text>
                    </Pressable>
                  </View>
                )}



              </Stack>
            ) : (
              <View>
                <Text>Авсанаа</Text>
              </View>
            )}
          </View>}
            tabOneText="Тооцоо" tabTwoComponent={<View style={{ width: '100%' }} >{users && (
              <>
                <Text>Гишүүд</Text>
                {users.map((element, index) => {
                  return <Contact roomDetail={element} key={index} readOnly />;
                })}
              </>
            )}</View>} tabTwoText="Гишүүд" />

          <Modal
            color={theme.palette.primary.main}
            singleButton={true}
            singleButtonText="За"
            title="Амжилттай"
            setIsVisible={setClosed}
            isVisible={isClosed}
            onSingleButton={() => {
              navigate(NavigationRoutes.HomeScreen)
            }}
          />
          {isVisibleModal && (
            <View
              style={[
                styles.popup,
                { height: windowHeight * 0.8, width: windowWidth },
              ]}
            >
              <Stack size={5} alignItems="center">
                <Text style={{ fontSize: 20, color: "#000", marginBottom: 20 }}>
                  Дансны мэдээлэл явуулах
              </Text>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                  <Text>Банкны нэр: {adminData?.bankName}</Text>
                </TouchableOpacity>
                <Text>Дансны дугаар: {adminData?.accountNumber}</Text>
                <Text>Эзэмшигч: {adminData?.owner}</Text>
                <Queue size={15}>
                  <View style={{ width: 120 }}>
                    <Button
                      type="secondary"
                      onPress={() => void setVisibleModal(false)}
                    >
                      Буцах
                  </Button>
                  </View>

                </Queue>
              </Stack>
            </View>
          )}
        </View>
      </BasicScreen>
    </SafeAreaScreen >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  number: {
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
    color: "#98B5FF",
    marginHorizontal: 4,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#98B5FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    flex: 1 / 4,
    transform: [{ rotateY: "180deg" }],
    justifyContent: "center",
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.primary.main,

  },
  popup: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    width: "100%",
    marginTop: 20,
  },
  closeIconContainer: {
    padding: 10,
    position: "absolute",
    right: 5,
    top: 5,
  },
});
