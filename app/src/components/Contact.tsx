import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDocument, useDocumentUtils } from "../hooks";
import { useUserData } from "../providers/UserProvider";
import { theme } from "../theme";
import { Spacer } from "./core";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useUserUID } from "../authentication";
const Contact = ({ contact, roomDetail, roomId, readOnly }) => {
  const isRoom = roomDetail?.length == 0 || roomDetail;
  const uid = useUserUID();
  const { setActiveRoomMembers, activeRoomMembers, userData } = useUserData();
  const { data: roomData } = useDocument({ path: `rooms/${roomId}` });

  const [isChecked, setChecked] = useState(roomDetail?.isPaid);

  const allUsers = roomData?.users;
  useEffect(() => {

    const newUsers = allUsers?.map((user) => {
      if (user.id === roomDetail.id) {
        return { ...user, isPaid: isChecked }
      }
      return user
    })
    if (newUsers)
      firestore()
        .doc(`rooms/${roomId}`)
        .set(
          { updatedAt: firestore.FieldValue.serverTimestamp(), users: newUsers },
          { merge: true }
        );
  }, [isChecked])

  useEffect(() => {
    activeRoomMembers.length === 0 && setActiveRoomMembers([userData.phoneNumber])
  }, [activeRoomMembers])

  const handlePressNumber = () => {

    setActiveRoomMembers((prev) => {
      return _.includes(prev, contact?.phoneNumbers[0]?.number)
        ? [...prev]
        : [...prev, contact?.phoneNumbers[0]?.number];
    });
  };
  return (
    <TouchableOpacity
      onPress={() => (!isRoom ? handlePressNumber() : setChecked(!isChecked))}
    >
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>
              {isRoom ? "U" : contact?.givenName[0]}
            </Text>
          </View>
        </View>

        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName}{roomDetail?.nickNames}
            {contact?.middleName && contact.middleName + " "}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {isRoom
              ? roomDetail?.phoneNumber
              : contact?.phoneNumbers[0]?.number}
          </Text>
        </View>
        {!readOnly && <View style={styles.feeSection}>
          {roomDetail?.fee && roomData?.adminUser === uid &&
            <Text style={{ fontSize: 14, color: theme.palette.primary.main, fontWeight: '600' }}>{roomDetail.fee}₮   </Text>
          }

          <View style={isChecked ? styles.checked : styles.checkbox} />
        </View>}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  checked: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
    borderWidth: 1
  },
  feeSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
});
export default Contact;
