import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { Stack, Queue } from "./core";
import UserAvatar from 'react-native-user-avatar';
import { ROOM_DATA_TYPE } from "../types";
import { useDocument, useDocumentUtils } from "../hooks";
import { useUserUID } from "../authentication";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../navigation/NavigationParameter";

export const Room = ({ id, roomName, users, isActive, isPending }: ROOM_DATA_TYPE): JSX.Element => {

    const colors = ['#8797B0', '#3E5959', '#4CADF3', '#CCCED3', '#5390F5', '#6ED270'];
    const userUid = useUserUID();
    let roomData = useDocument({ path: `users/${userUid}` }).data?.rooms;
    const { navigate } = useNavigation();
    const joinTheRoom = () => {

        let justData = roomData.map((item) => {
            if (item.id == id)
                item.status = 'accepted'

            return item
        })

        useDocumentUtils({ path: `users/${userUid}` }).updateDocument({ rooms: justData })
    }
    const notJoinTheRoom = () => {
        let justData = roomData.map((item) => {
            if (item.id == id)
                item.status = 'declined'

            return item
        })

        useDocumentUtils({ path: `users/${userUid}` }).updateDocument({ rooms: justData })
    }
    return (
        <TouchableOpacity style={styles.roomContainer} onPress={() => {
            navigate(NavigationRoutes.RoomDetails, {
                roomId: id,
                roomName: roomName,
                users: users,
                isActive: isActive,
            })
        }}>
            <Stack size={3}>
                <Queue justifyContent="space-between">
                    <Text style={styles.roomName}>{roomName === '' ? 'Нэргүй өрөө' : roomName}</Text>
                    <View style={[styles.status, { backgroundColor: isPending ? theme.palette.primary.light : '#38C976' }]}></View>
                </Queue>
                <Text style={styles.roomMembersCount}>{users?.length} гишүүн</Text>
                <Queue>
                    {users?.map((item, index) => {
                        return <UserAvatar size={30} name="Avishay Bar" key={index} bgColor={colors[Math.floor(Math.random() * 6)]} />
                    })}

                </Queue>
                {isPending && (
                    <Stack size={5} alignItems="center">
                        <Text style={{ textAlign: 'center', maxWidth: '80%' }}>Та {roomName} нэртэй өрөөнд орохдоо итгэлтэй байна уу</Text>
                        <Queue justifyContent="space-between" >
                            <Pressable style={styles.backButton} onPress={notJoinTheRoom}>
                                <Text>Үгүй</Text>
                            </Pressable>
                            <Pressable style={styles.nextButton} onPress={joinTheRoom}>
                                <Text style={{ color: 'white' }}>Тийм</Text>
                            </Pressable>
                        </Queue>
                    </Stack>
                )}
            </Stack>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    roomName: {
        fontSize: 16,
        fontWeight: '600'
    },
    roomContainer: {
        padding: 20,
        width: '100%',
        backgroundColor: theme.palette.background.secondary,
        shadowColor: 'rgba(152, 181, 255, 0.35)',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    roomMembersCount: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.palette.primary.main
    },
    status: {
        width: 20,
        height: 20,
        borderRadius: 10,


    },
    backButton: {
        minHeight: 40,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        maxHeight: 48,
        flex: 1,
        marginHorizontal: 8,
        width: 150,
        borderColor: theme.palette.primary.main,
    },
    nextButton: {
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        maxHeight: 48,
        flex: 1,
        marginHorizontal: 8,
        backgroundColor: theme.palette.primary.main,
        width: 150
    },
    contactText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
