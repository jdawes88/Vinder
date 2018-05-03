import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login'
import * as firebase from 'firebase'
import {StackNavigator} from 'react-navigation'

// initialise firebase

const firebaseConfig = {
    apiKey: "AIzaSyC1KleXVQ8TZGfs5BGrs1jeBV-4qS6BHQQ",
    authDomain: "vinder-ed114.firebaseapp.com",
    databaseURL: "https://vinder-ed114.firebaseio.com",
    projectId: "vinder-ed114",
    storageBucket: "vinder-ed114.appspot.com",
    messagingSenderId: "562988374527"
}

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FCC00',
  },
});
