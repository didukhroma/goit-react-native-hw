import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../../styles/colors';
const CircleCloseSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none">
    <Rect width={25} height={25} fill={colors.white} rx={12.5} />
    <Circle
      cx={12.5}
      cy={12.5}
      r={12}
      fill={colors.white}
      stroke={colors.gray}
    />
    <Path
      fill={colors.dark_gray}
      fillRule="evenodd"
      d="m8.257 7.55-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243L8.257 7.55Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CircleCloseSvg;
