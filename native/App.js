import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import EditScreen from './EditScreen';

const Navigator = StackNavigator({
  Home: { screen: HomeScreen },
  Edit: { screen: EditScreen },
});

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
