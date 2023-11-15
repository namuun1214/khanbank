import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

const ShakeIcon = (props) => (
  <Svg
    width={93}
    height={76}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      stroke="#000"
      strokeDasharray="6 6"
      d="M51.041 6.201 87.737 20.25a5 5 0 0 1 2.883 6.457L70.788 78.51M41.27 6.143 4.66 20.41a5 5 0 0 0-2.844 6.474L21.957 78.57"
    />
    <Rect
      width={46.929}
      height={90}
      x={22.872}
      y={1}
      fill="#fff"
      stroke="#000"
      rx={5}
    />
    <Rect width={17} height={3} x={35} y={5} fill="#000" rx={1.5} />
    <Rect width={3} height={3} x={54} y={5} fill="#000" rx={1.5} />
  </Svg>
)

export default ShakeIcon
