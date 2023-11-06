import React from 'react';
import { View } from 'react-native';
import { useTheme } from "../../providers";

export const Spacer = (props: any) => {
    const { horizontal, size } = props;
    const theme = useTheme()
    return (
        <View
            style={{
                height: (horizontal && size * theme.baseSpace) || 0,
                width: (!horizontal && size * theme.baseSpace) || 0,
            }}
        />
    );
};