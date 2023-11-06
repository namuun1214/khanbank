import React, { useEffect, useRef, FC } from 'react';
import { Animated } from 'react-native';

export const AnimatedFadeInView: FC<any> = ({
    position,
    visible,
    children,
    debugColor,
    height,
    width,
    duration = 200,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const zIndex = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(zIndex, {
                duration,
                useNativeDriver: true,
                toValue: visible ? 100 : 0,
            }),
            Animated.timing(opacity, {
                duration,
                useNativeDriver: true,
                toValue: visible ? 1 : 0,
            }),
        ]).start();
    }, [visible]);

    return (
        <Animated.View
            style={{
                zIndex,
                height,
                width,
                position,
                backgroundColor: debugColor,
                opacity,
            }}>
            {children}
        </Animated.View>
    );
};

export const AnimatedFadeInViewWithOverlay: FC<any> = ({
    position,
    visible,
    children,
    debugColor,
    height,
    width,
    duration = 200,
    top,
    left,
    right,
    flex,
    bottom,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const zIndex = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(zIndex, {
                duration,
                useNativeDriver: true,
                toValue: visible ? 100 : 0,
            }),
            Animated.timing(opacity, {
                duration,
                useNativeDriver: true,
                toValue: visible ? 1 : 0,
            }),
        ]).start();
    }, [visible]);

    return (
        <Animated.View
            style={{
                zIndex,
                height,
                width,
                position,
                backgroundColor: debugColor,
                opacity,
                top,
                left,
                right,
                bottom,
                flex,
            }}>
            {children}
        </Animated.View>
    );
};