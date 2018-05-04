import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { ListItem, List, Card, Button } from "react-native-elements";
import PopupDialog from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { ImagePicker, Permissions } from "expo";
import KeyboardSpacer from "react-native-keyboard-spacer";
import dishes from "../data-jo/dishes.json";

export default class AddDish extends React.Component {
  state = { meal: "", comment: "", image: "" };
  render() {
    const { image } = this.state;
    console.log(this.state);
    return (
      <View style={styles.popup}>
        <Text
          style={{
            fontFamily: "KohinoorDevanagari-Semibold",
            fontSize: 18,
            color: "#304413"
          }}
        >
          Add a Vegan Meal
        </Text>
        <TextInput
          value={this.state.meal}
          placeholder="vegan meal"
          style={styles.veganMeal}
          onChangeText={input => this.setState({ meal: input })}
        />

        <Text
          style={{
            fontFamily: "KohinoorDevanagari-Semibold",
            fontSize: 18,
            color: "#304413"
          }}
        >
          Add a Comment
        </Text>
        <TextInput
          value={this.state.comment}
          multiline={true}
          placeholder="add a comment..."
          style={styles.inputComment}
          onChangeText={input => this.setState({ comment: input })}
        />

        <TouchableOpacity
          onPress={this.savePhoto}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Post an Image</Text>
        </TouchableOpacity>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : null}
      </View>
    );
  }

  savePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      })
        .then(newPostImage => {
          if (!newPostImage.cancelled) {
            this.setState({
              image: newPostImage.uri
            });
          }
        })

        .catch(err => console.log(err));
    }
  };
}

const styles = StyleSheet.create({
  popup: {
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10
  },
  veganMeal: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: "#D7DDC4",
    marginTop: 10
  },
  inputComment: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    height: 100,
    backgroundColor: "#D7DDC4"
  },
  buttonContainer: {
    backgroundColor: "#5F9900",
    paddingVertical: 15,
    width: 300,
    borderRadius: 25,
    margin: 10
  },
  button: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
    borderRadius: 25
  }
});
