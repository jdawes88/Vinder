import React from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Login from './components/Login';
import MapPage from './components/Map';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <MapPage />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0000',
    top: 0
  }
});
