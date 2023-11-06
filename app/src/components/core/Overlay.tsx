import React, { FC, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { } from '../../theme';
import _ from 'lodash';
import { theme } from '../../theme'

type OverlayType = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    children?: any;
    zIndex?: number;
    position?: 'relative' | 'absolute';
    height?: number | string;
    width?: number | string;
    flex?: number;
    role?: string;
};

export const Overlay: FC<OverlayType> = ({
    top,
    left,
    right,
    bottom,
    children,
    zIndex,
    position,
    height,
    width,
    role,
    flex,
}) => {

    const style = StyleSheet.create({
        container: {
            backgroundColor: role,
            position: position || 'absolute',
            top: _.isNumber(top) ? top * theme.baseSpace : top,
            left,
            right,
            bottom,
            zIndex,
            height,
            width,
            flex,
        },
    });

    return <View style={style.container}>{children}</View>;
};