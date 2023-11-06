import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Queue } from '../core';
import { BackArrowIcon, MainLogo, MenuIcon } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { SideMenu } from './SideMenu';
import { useUserData } from '../../providers';

export const Header = ({ withBack = false, headerText = '', menu = true }) => {
    const navigation = useNavigation();
    const goBack = () => {
        setMenuClicked(false);
        navigation.goBack();
    };
    const { isMenuClicked, setMenuClicked } = useUserData();
    const handleMenuClick = () => {
        // navigation.navigate(NavigationRoutes.SideMenu);
        setMenuClicked(!isMenuClicked);
    };

    return (
        <>
            {withBack && (
                <Queue
                    size={5}
                    alignItems="center"
                    justifyContent={menu ? 'space-between' : 'flex-start'}>
                    <Pressable onPress={goBack}>
                        <BackArrowIcon width={'10'} height={'40'} />
                    </Pressable>
                    {headerText && (
                        <Text>
                            {headerText}
                        </Text>
                    )}
                    {menu && (
                        <Pressable
                            onPress={() => {
                                handleMenuClick();
                            }}>
                            <MenuIcon />
                        </Pressable>
                    )}
                </Queue>
            )}
            {!withBack && (
                <Queue justifyContent="space-between">
                    <MainLogo />

                    {menu && (
                        <Pressable
                            onPress={() => {
                                handleMenuClick();
                            }}>
                            <MenuIcon />
                        </Pressable>
                    )}
                </Queue>
            )}

            { isMenuClicked && <SideMenu />}
        </>
    );
};