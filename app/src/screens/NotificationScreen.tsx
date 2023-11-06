import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import _ from "lodash";
import { BasicScreen } from ".";
import { Spacer } from "../components/core/Spacer";
import { theme } from "../theme";
import { useCollection } from "../hooks";
import { useAuth } from "../authentication";

type Props = {
  number: string;
  onPress: () => void;
};

export const NotificationScreen = ({ onPress }: Props): ReactElement => {
  const { user } = useAuth();
  const { data: item } = useCollection({
    path: "notifications",
    where: `targetValue == ${user.phoneNumber.split("+976")[1]}`,
  });

  return (
    <BasicScreen>
      {item.length !== 0 ? (
        <>
          {item.map((element) => {
            return (
              <>
                <Spacer size={3} horizontal={true} />
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={onPress}
                >
                  <View style={styles.card}>
                    <View style={styles.container}>
                      <View style={{ width: "90%" }}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.number}>
                            {element?.title ? element.title : "Title"}
                          </Text>
                        </View>
                        <Spacer size={3} horizontal={true} />
                        <View style={styles.addressContainer}>
                          <Text numberOfLines={2} style={styles.address}>
                            {element?.description ? element.description : ""}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </>
      ) : (
        <View
          style={{
            display: "flex",
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text>Мэдэгдэл байхгүй байна</Text>
        </View>
      )}
    </BasicScreen>
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
    fontWeight: "500",
    flex: 1,
    marginHorizontal: 4,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  address: {
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
    flexWrap: "wrap",
    marginHorizontal: 4,
  },
  addressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
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
  image: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 12,
  },
  iconContainer: {
    flex: 1,
  },
});
