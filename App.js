import React from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Login from './components/Login'
import Restaurant from './components/Restaurant'
import Comments from './components/Comments'
import MapPage from './components/Map'
import * as firebase from 'firebase'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import NavigationService from './NavigationService';

// initialise firebase`
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
      <AppNavigator 
        header='none' 
        cardStyle={styles.container} 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export const AppNavigator = StackNavigator(
  {
    LoginScreen: {
      screen: Login
    },
    RestaurantScreen: {
      screen: Restaurant
    },
    CommentsScreen: {
      screen: Comments
    },
    MapScreen: {
      screen: MapPage
    }
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
)
