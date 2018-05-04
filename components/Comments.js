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

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { ListItem, List, Card, Button } from "react-native-elements";
import PopupDialog from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { ImagePicker, Permissions } from "expo";
import KeyboardSpacer from "react-native-keyboard-spacer";
import StarRating from "react-native-star-rating";

import users from "../data/users.json";

export default class Comments extends React.Component {
  state = { comment: "", starCount: 3 };

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
            source={require("../images/veganDish.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.infoBox}>
          <View>
            <StarRating
              fullStarColor={"white"}
              emptyStarColor={"white"}
              size={15}
              //starStyle={{ height: 0.5, width: 0.5 }}
              disabled={false}
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
          dialogStyle={{ backgroundColor: "#7FCC00" }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  bar: {
    height: 22
  },
  image: {
    width: 420,
    height: 250
  },
  infoBox: {
    backgroundColor: "grey",
    width: "100%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rating: {
    paddingLeft: 40
  },
  price: {},
  add: {
    paddingRight: 40
  },
  commentList: {},
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
  },
  popup: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  inputComment: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    height: 100,
    backgroundColor: "#D7DDC4"
  },
  ratingview: {
    width: 200,
    height: 80,
    color: "white"
  }
});
