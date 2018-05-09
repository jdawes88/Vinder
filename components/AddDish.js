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
import styles from './styles/addDish';
import AWS from 'aws-sdk';
const { accessKeyId, secretAccessKey } = require('./secrets.js');
const s3 = new AWS.S3({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region:'eu-west-2'});

export default class AddDish extends React.Component {
  state = { meal: "", comment: "", image: "" };
  render() {
    const { image } = this.state;
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
          const path = newPostImage.uri.match(/[A-z|0-9|-]*.(jpg|jpeg|png)/g).toString();
          const imageUrl = `uploads/${path}`;

          if (!newPostImage.cancelled) {
            this.setState({
              image: newPostImage.uri,
              imageUrl: `https://s3.eu-west-2.amazonaws.com/vinder-photos/${imageUrl}`
            });
          }

          const s3Params = {
            Bucket: 'vinder-photos',
            Key: imageUrl,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
          };

          const signedurl = s3.getSignedUrl('putObject', s3Params);

          const xhr = new XMLHttpRequest()
          xhr.open('PUT', signedurl)
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                  console.log('Image successfully uploaded to S3');
                  return 'successful';
              } else {
                  console.log('Error while sending the image to S3');
                  return 'fail';
              }
            }
          }
          xhr.setRequestHeader('Content-Type', 'image/jpeg')
          xhr.setRequestHeader('X-Amz-ACL', 'public-read')
          xhr.send({ uri: newPostImage.uri, type: 'image/jpeg', name: 'image.jpg'})
        })
        .then(message => {
          if (message === 'successful') {
            this.props.saveNewMeal(this.state)
          } else {
            this.props.alertFail()
          }
        })
        .catch(err => console.log(err));
    }
  };
}
