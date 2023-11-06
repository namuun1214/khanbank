import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const CreateRoomIcon = (props) => (
  <Svg
    width={51}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1.5}
      y={1}
      width={48}
      height={48}
      rx={24}
      stroke="#fff"
      strokeWidth={2}
    />
    <Path
      d="M25.5 15a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8h-8a1 1 0 1 1 0-2h8v-8a1 1 0 0 1 1-1Z"
      fill="#fff"
    />
  </Svg>
);

export default CreateRoomIcon;
