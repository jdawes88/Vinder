import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  YellowBox
} from "react-native";
import Login from "./components/Login";
import Restaurant from "./components/Restaurant";
import Comments from "./components/Comments";
import MapPage from "./components/Map";
import * as firebase from "firebase";
import { StackNavigator } from "react-navigation";
import NavigationService from "./NavigationService";
import firebaseConfig from './config'

// initialise firebase`

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <AppNavigator
        header="none"
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
    flex: 1
  }
});

export const AppNavigator = StackNavigator(
  {
    LoginScreen: { screen: Login },
    RestaurantScreen: { screen: Restaurant },
    CommentsScreen: { screen: Comments },
    MapScreen: { screen: MapPage }
  },
  { initialRouteName: "LoginScreen", headerMode: "none" }
);
