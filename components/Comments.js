import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  // List,
  // ListItem,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Ionicons,
  FontAwesome
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import {
  ListItem,
  List,
  Card,
  Button
} from "react-native-elements";
import {
  ImagePicker,
  Permissions
} from "expo";
import PopupDialog from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import KeyboardSpacer from "react-native-keyboard-spacer";
import StarRating from "react-native-star-rating";
import styles from './styles/comments';
import users from "../data-jo/users.json";

export default class Comments extends React.Component {
  state = {
    comment: "",
    starCount: 4.5
  };

  onStarRatingPress(rating) {
    this.setState({ starCount: rating });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.bar} />
        <View>
          <Image
            source={require("./images/veganDish.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.infoBox}>
          <View style={styles.rating}>
            <StarRating
              fullStarColor={"white"}
              emptyStarColor={"white"}
              starSize={20}
              disabled={
                false //starStyle={{ height: 0.5, width: 0.5 }}
              }
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "KohinoorDevanagari-Semibold",
                fontSize: 18,
                color: "#ffffff"
              }}
            >
              £9.99
            </Text>
          </View>

          <TouchableOpacity
            style={styles.add}
            onPress={() => this.popupDialog.show()}
          >
            <FontAwesome
              name="plus-square-o"
              style={styles.laptop}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <PopupDialog
          width={350}
          height={350}
          borderRadius={25}
          dialogStyle={{ backgroundColor: "#B1C595" }}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <KeyboardAwareScrollView behavior="padding" enabled>
            <View style={styles.popup}>
              <View style={styles.popup}>
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
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  console.log(this.state);
                  this.popupDialog.dismiss();
                  this.setState({ comment: "" });
                }}
              >
                <Text style={styles.button}>Save</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </PopupDialog>

        <FlatList
          style={styles.commentList}
          data={users}
          renderItem={({ item }, i) => (
            <ListItem
              title={item.name}
              subtitle={item.comment}
              subtitleNumberOfLines={50}
              key={`${i}${item.name}`}
              avatar={item.avatar}
            />
          )}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
