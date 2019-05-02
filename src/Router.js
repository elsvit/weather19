import * as React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Map, Search } from './components/screens';

export const initialRouteName = 'Map';

const AppNavigator = createStackNavigator(
  {
    Map: { screen: Map },
    Search: { screen: Search },
  },
  {
    initialRouteName,
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  }
);

export default createAppContainer(AppNavigator);
