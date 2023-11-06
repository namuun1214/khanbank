import { useNavigation } from '@react-navigation/core';
import React, { FC, useContext } from 'react';
import { Pressable, useWindowDimensions, Text } from 'react-native';
import { Queue, Stack, Overlay } from '../core';
import {
    BackArrowIcon
} from '../../assets';
import { AnimatedFadeInView } from '../animated/AnimatedFadeInView';
import { NavigationRoutes } from '../../navigation/NavigationParameter';
import { useUserData } from '../../providers';
const SideMenuItems = ({ text, icon, navigate }) => {
    const { setMenuClicked } = useUserData();
    const navigation = useNavigation();
    const isSaved = true;
    return (
        <Pressable
            onPress={() => {

                navigation.navigate(NavigationRoutes[navigate]);
                setMenuClicked(false);
            }}>

            <Queue size={6} justifyContent="flex-start" alignItems="center">
                {icon}
                <Text>
                    {text}
                </Text>
            </Queue>

        </Pressable>
    );
};
export const SideMenu: FC = () => {
    return (
        <AnimatedFadeInView visible={true}>
            <Overlay
                width={useWindowDimensions().width / 2}
                height={useWindowDimensions().height}
                zIndex={99}
                right={0}
                role="info">
                <Stack size={3}>
                    <SideMenuItems
                        text="Профайл"
                        icon={<BackArrowIcon />}
                        navigate={'ProfileScreen'}
                    />
                    <SideMenuItems
                        text="Мэдээлэл"
                        icon={<BackArrowIcon />}
                        navigate={'NewsScreen'}
                    />
                    <SideMenuItems
                        text="Яаралтай тусламж"
                        icon={<BackArrowIcon />}
                        navigate={'EmergencyListScreen'}
                    />
                    <SideMenuItems
                        text="Дурсамж"
                        icon={<BackArrowIcon />}
                        navigate={'MemoryListScreen'}
                    />
                    <SideMenuItems
                        text="Хадгалсан"
                        icon={<BackArrowIcon />}
                        navigate={'SavedScreen'}
                    />
                    <SideMenuItems
                        text="Өсөлтийн график"
                        icon={<BackArrowIcon />}
                        navigate={'GrowthScreen'}
                    />
                    <SideMenuItems
                        text="Үр дүн"
                        icon={<BackArrowIcon />}
                        navigate={'LogResultScreen'}
                    />
                </Stack>
            </Overlay>
        </AnimatedFadeInView>
    );
};