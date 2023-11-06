import React, { useEffect, useMemo } from "react";
import * as reactNative from "react-native";
import { BasicScreen } from "../screens";
import LottieView from 'lottie-react-native';
import { Center, Overlay } from "./core";
export const Loading = (): JSX.Element => {
    return (
        <Overlay>
            <Center>
                <LottieView source={require('../assets/lottie/loading.json')} autoPlay loop />
            </Center>
        </Overlay>
    )
}