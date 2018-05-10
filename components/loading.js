import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";

export default class Loading extends Component {

  render () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Bubbles size={10} color="#FFF" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 250
  }
})