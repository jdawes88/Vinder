import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

export default class Menu extends Component {
  static navigationOptions = {
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../data/coin.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
  };

  render () {
      return (
          <View>
              <Text>Menu</Text>
          </View>
      )
  }
}