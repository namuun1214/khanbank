import React from 'react';
import { View } from 'react-native';
import { Spacer } from './Spacer';
type StackType = {
    size?: number;
    children: any;
    role?: string;
    height?: number | string;
    width?: number | string;
    maxWidth?: number | string;
    zIndex?: number;
    justifyContent?:
    | "flex-start"
    | "space-between"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-evenly";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
};
export const Stack = ({
    size = 0,
    children,
    role,
    height,
    width,
    maxWidth,
    zIndex,
    justifyContent,
    alignItems,

}: StackType) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                backgroundColor: role,
                height,
                width,
                maxWidth,
                zIndex,
                justifyContent,
                alignItems,
            }}>
            {React.Children.toArray(children).map((child, index) => {
                if (index == 0) {
                    return <View>{child}</View>;
                }
                return (
                    <View>
                        <Spacer horizontal={true} size={size} />
                        {child}
                    </View>
                );
            })}
        </View>
    );
};