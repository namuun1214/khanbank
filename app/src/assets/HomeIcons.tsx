import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export type Props = {
    width?: number | string;
    height?: number | string;
    color?: string;
};

export const BackArrowIcon = (props: Props): JSX.Element => {
    const { color = '#000', width = 8, height = 14 } = props;
    return (
        <Svg width={width} height={height} viewBox="0 0 8 14" fill="none" {...props}>
            <Path
                d="M.322 7.42l5.66 5.65a.998.998 0 001.42 0 1 1 0 000-1.41l-4.95-5 4.95-4.95a1 1 0 000-1.41 1 1 0 00-.71-.3 1 1 0 00-.71.3L.322 5.95a1 1 0 000 1.47z"
                fill={color}
            />
        </Svg>
    );
};
export const MenuIcon = (props: Props): JSX.Element => {
    return (
        <Svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            {...props}>
            <Path
                d="M5.66667 25.5H28.3333C29.1125 25.5 29.75 24.8625 29.75 24.0833C29.75 23.3042 29.1125 22.6667 28.3333 22.6667H5.66667C4.8875 22.6667 4.25 23.3042 4.25 24.0833C4.25 24.8625 4.8875 25.5 5.66667 25.5ZM5.66667 18.4167H28.3333C29.1125 18.4167 29.75 17.7792 29.75 17C29.75 16.2208 29.1125 15.5833 28.3333 15.5833H5.66667C4.8875 15.5833 4.25 16.2208 4.25 17C4.25 17.7792 4.8875 18.4167 5.66667 18.4167ZM4.25 9.91667C4.25 10.6958 4.8875 11.3333 5.66667 11.3333H28.3333C29.1125 11.3333 29.75 10.6958 29.75 9.91667C29.75 9.1375 29.1125 8.5 28.3333 8.5H5.66667C4.8875 8.5 4.25 9.1375 4.25 9.91667Z"
                fill="white"
            />
        </Svg>
    );
};
export const AddIcon = (props: Props): JSX.Element => {
    const { color = '#416BFF', width = 23, height = 23 } = props;
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            {...props}
        >
            <Circle cx={11.5} cy={11.5} r={11.5} fill={color} />
            <Path
                d="M16.848 10.874h-4.48v-4.48a.747.747 0 0 0-1.494 0v4.48h-4.48a.747.747 0 1 0 0 1.493h4.48v4.48a.747.747 0 1 0 1.493 0v-4.48h4.48a.747.747 0 0 0 0-1.493Z"
                fill="#416BFF"
            />
        </Svg>
    );
};
export const CloseIcon = (props: Props): JSX.Element => {
    const { color = '#4A4A4A', width = 10, height = 10 } = props;
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            {...props}
        >
            <Path
                d="M1.288 1.704 8.712 9.13 1.288 1.704Zm6.894-.53a.75.75 0 0 1 1.06 1.06L6.06 5.416l3.183 3.182A.75.75 0 0 1 8.182 9.66L5 6.477 1.818 9.659a.75.75 0 0 1-.995.058L.757 9.66a.75.75 0 0 1 0-1.06L3.94 5.415.757 2.234a.75.75 0 1 1 1.061-1.06L5 4.355l3.182-3.181Z"
                fill={color}
            />
        </Svg>
    );
};
export const CorrectIcon = (props: Props): JSX.Element => {
    const { color = '#38C976', width = 16, height = 15 } = props;
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            {...props}
        >
            <Path
                d="M1.056 8.516H12.82l-3.6 4.325a.993.993 0 0 0 1.527 1.27l4.96-5.952a1.17 1.17 0 0 0 .09-.149c0-.05 0-.08.07-.129a.993.993 0 0 0 .069-.357.993.993 0 0 0-.07-.357c0-.05 0-.08-.07-.13a1.168 1.168 0 0 0-.089-.148L10.748.937a.992.992 0 0 0-1.399-.13.992.992 0 0 0-.129 1.4l3.601 4.325H1.056a.992.992 0 0 0 0 1.984Z"
                fill={color}
            />
        </Svg>
    );
};
export const NotificationIcon = (props: Props): JSX.Element => {
    const { color = '#fff', width = 16, height = 19 } = props;
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            {...props}
        >
            <Path
                d="m8 0 .12.007c.474.053.85.417.904.876L9.031 1v.812a7.434 7.434 0 0 1 2.063.6c1.889.861 3.094 2.703 3.094 4.727v4.978a4.7 4.7 0 0 0 1.547 3.471.8.8 0 0 1 .036 1.155.855.855 0 0 1-.614.257h-4.24c-.424 1.165-1.57 2-2.917 2-1.347 0-2.493-.835-2.918-2H.842A.83.83 0 0 1 0 16.183c0-.225.096-.44.265-.595a4.7 4.7 0 0 0 1.547-3.471V7.139c0-2.024 1.205-3.866 3.094-4.727a7.433 7.433 0 0 1 2.063-.6V1c0-.513.398-.936.91-.993L8 0Zm1.153 17H6.848a1.56 1.56 0 0 0 1.003.493L8 17.5c.458 0 .87-.193 1.153-.5ZM5.784 4.221c-1.1.503-1.825 1.545-1.902 2.711l-.007.207v4.978c0 .982-.22 1.94-.633 2.816L3.207 15h9.584l-.033-.067a6.598 6.598 0 0 1-.626-2.522l-.007-.294V7.139c0-1.18-.663-2.26-1.719-2.823l-.19-.095a5.351 5.351 0 0 0-4.432 0Z"
                fill="#fff"
            />
        </Svg>
    );
};