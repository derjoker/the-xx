import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'the xx',
    }),
  },
});

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
