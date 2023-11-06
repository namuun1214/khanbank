import React, { FC } from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../authentication";

export const ProfileScreen: FC = () => {
  const { signout, user } = useAuth();
  return (
    <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
      <Text style={{alignSelf: 'center'}}>{user ? user.phoneNumber : ''}</Text>
      <Button onPress={() => signout()} title={'SignOut'}></Button>
    </View>
  );
};
