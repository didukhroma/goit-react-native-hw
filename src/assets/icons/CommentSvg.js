import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CommentSvg = ({ color, filled }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    {!filled && (
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 9.5a8.38 8.38 0 0 0 .9 3.8A8.5 8.5 0 0 0 9.5 18a8.38 8.38 0 0 0 3.8-.9L19 19l-1.9-5.7a8.38 8.38 0 0 0 .9-3.8 8.5 8.5 0 0 0-4.7-7.6A8.38 8.38 0 0 0 9.5 1H9a8.48 8.48 0 0 0-8 8v.5Z"
        clipRule="evenodd"
      />
    )}
    {filled && (
      <Path
        fill={color}
        fillRule="evenodd"
        d="M3 11.5a8.38 8.38 0 0 0 .9 3.8 8.5 8.5 0 0 0 7.6 4.7 8.38 8.38 0 0 0 3.8-.9L21 21l-1.9-5.7a8.38 8.38 0 0 0 .9-3.8 8.5 8.5 0 0 0-4.7-7.6 8.38 8.38 0 0 0-3.8-.9H11a8.48 8.48 0 0 0-8 8v.5Z"
        clipRule="evenodd"
      />
    )}
  </Svg>
);
export default CommentSvg;
