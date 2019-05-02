import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg
    viewBox="0 0 24 24"
    style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center' },
    ]}
  >
    <Path
      fill="#70A0EE"
      fillRule="evenodd"
      d="M15.437 14.062h-.726l-.253-.25a5.918 5.918 0 0 0 1.435-3.866 5.946 5.946 0 1 0-5.947 5.946 5.92 5.92 0 0 0 3.865-1.433l.253.251v.724L18.636 20 20 18.636l-4.563-4.574zm-5.49 0a4.116 4.116 0 1 1 0-8.232 4.117 4.117 0 0 1 0 8.232z"
    />
  </Svg>
);

export default SvgComponent;
