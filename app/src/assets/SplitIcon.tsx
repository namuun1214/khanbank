import * as React from "react";
import Svg, { Circle, Defs, G, Path, Rect } from "react-native-svg";
type Props = {
  color?: string;
  width?: number;
  height?: number;
};
export const RadioIcon = (props: Props): JSX.Element => {
  const { color = "#98B5FF", width = 24, height = 24 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="9"
        fill="#F3F3F3"
        stroke={color}
        stroke-width="2"
      />
    </Svg>
  );
};
export const SelectedRadioIcon = (props: Props): JSX.Element => {
  const { color = "#98B5FF", width = 24, height = 24 } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G>
        <Circle cx="12" cy="12" r="10" fill={color} />
      </G>
      <Circle cx="12" cy="12" r="9" stroke={color} stroke-width="2" />
    </Svg>
  );
};
export const SplitIcon = (props: Props): JSX.Element => {
  const { color = "#98B5FF", width = 16, height = 16 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 11.4286C6.7375 11.4286 5.71429 12.4518 5.71429 13.7143C5.71429 14.9768 6.7375 16 8 16C9.2625 16 10.2857 14.9768 10.2857 13.7143C10.2857 12.4518 9.2625 11.4286 8 11.4286ZM8 4.57143C9.2625 4.57143 10.2857 3.54821 10.2857 2.28571C10.2857 1.02321 9.2625 0 8 0C6.7375 0 5.71429 1.02321 5.71429 2.28571C5.71429 3.54821 6.7375 4.57143 8 4.57143ZM14.8571 6.28571H1.14286C0.511786 6.28571 0 6.7975 0 7.42857V8.57143C0 9.2025 0.511786 9.71429 1.14286 9.71429H14.8571C15.4882 9.71429 16 9.2025 16 8.57143V7.42857C16 6.7975 15.4882 6.28571 14.8571 6.28571Z"
        fill="#98B5FF"
      />
    </Svg>
  );
};
