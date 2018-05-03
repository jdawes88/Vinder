import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Menu</Text>
              <Button 
              onPress={() => this.props.navigation.goBack()}
              title='go back'/>
          </View>
      )
  }
}
