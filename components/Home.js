import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles/home';

export default class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home Page</Text>
      </View>
    )
  }
}