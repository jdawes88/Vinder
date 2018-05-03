import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {

  render () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <ActivityIndicator style={styles.loader} size={100} color='white'/>
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