import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Login from "./components/Login";
import Restaurant from "./components/Restaurant";
import Comments from "./components/Comments";

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
