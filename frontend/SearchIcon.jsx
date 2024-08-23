import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function SearchIcon() {
  return (
    <Svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <G stroke="#292d32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path d="m21.49 12.0001c.32-1.02.51-2.11998.51-3.30998 0-3.09-2.49-5.59002-5.56-5.59002-1.82 0-3.43.88005-4.44 2.24005-1.01-1.36-2.63-2.24005-4.44-2.24005-3.07 0-5.56 2.50002-5.56 5.59002 0 6.99998 6.48 11.12998 9.38 12.12998.17.06.39.09.62.09" opacity=".4"/>
        <Path d="m17.7391 21.0001c1.7673 0 3.2-1.4327 3.2-3.2s-1.4327-3.2-3.2-3.2c-1.7674 0-3.2 1.4327-3.2 3.2s1.4326 3.2 3.2 3.2z"/>
        <Path d="m21.5391 21.6001-1-1"/>
      </G>
    </Svg>
  );
}