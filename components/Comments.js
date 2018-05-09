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
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { ListItem, List, Card, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import PopupDialog from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import KeyboardSpacer from "react-native-keyboard-spacer";
import StarRating from "react-native-star-rating";
import axios from "react-native-axios";

import styles from "./styles/comments";
import users from "../data-jo/users.json";

export default class Comments extends React.Component {
  state = {
    comment: "",
    commentTitle: "",
    starCount: 0,
    avatar:
      "http://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
    dishInfo: "",
    avgRating: 0,
    comments: ""
  };

  componentDidMount() {
    this.getCommentsByDishId(5);
    this.getDishByDishId(5);
  }

  componentWillUpdate(nextProps, nextState) {
    this.getCommentsByDishId(5);
  }

  render() {
    //console.log(this.state);
    const { dishInfo, comment, comments } = this.state;
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
              disabled={false}
              maxStars={5}
              rating={this.getAvgRating(comments)}
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
              £{dishInfo.prices}
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
        <View style={styles.title}>
          <Text style={{ fontFamily: "Cochin" }}>{dishInfo.name}</Text>
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
                  Comment Title
                </Text>
                <TextInput
                  value={this.state.commentTitle}
                  multiline={true}
                  placeholder="add a comment..."
                  style={styles.inputTitle}
                  onChangeText={input => this.setState({ commentTitle: input })}
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
              </View>

              <View style={styles.rating}>
                <StarRating
                  fullStarColor={"white"}
                  emptyStarColor={"white"}
                  starSize={20}
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => {
                    this.onStarRatingPress(rating);
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  console.log(this.state);

                  this.postComment(
                    comment,
                    3,
                    this.state.starCount,
                    this.state.commentTitle
                  );

                  this.setState({ comment: "" });

                  this.popupDialog.dismiss();
                }}
              >
                <Text style={styles.button}>Save</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </PopupDialog>

        {/* <FlatList
          style={styles.commentList}
          data={this.state.comments}
          renderItem={({ item }, i) => (
            <ListItem
              title={`${item.users_first_name} ${item.users_last_name}`}
              subtitle={item.body}
              subtitleNumberOfLines={50}
              key={`${i}${item.user_id}`}
              avatar={this.state.avatar}
            />
          )}
          keyExtractor={item => {
            let idString = item.id;
            return idString.toString();
          }}
        /> */}
      </View>
    );
  }

  getCommentsByDishId = id => {
    return axios
      .get(
        `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dish/comments/${id}`
      )
      .then(res => res.data)
      .then(res => this.setState({ comments: res }))

      .catch(err => console.log("error:" + err));
  };

  getDishByDishId = dishid => {
    return axios
      .get("https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/dishes")
      .then(res => res.data)
      .then(res =>
        res.filter(dish => {
          return dish.id === dishid;
        })
      )
      .then(res => this.setState({ dishInfo: res[0] }))

      .catch(err => console.log("error:" + err));
  };

  postComment = (body, userid, starRating, title) => {
    axios
      .post(
        `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/comment`,
        {
          commentBody: body,
          commentRating: starRating,
          userId: userid,
          title: title,
          dishId: 5
        }
      )

      .catch(error => console.log(error));
  };

  onStarRatingPress(rating) {
    this.setState({ starCount: rating });
  }

  getAvgRating = comments => {
    if (comments === undefined) {
      return 0;
    } else {
      let sum = 0;
      comments.forEach(comment => {
        sum += comment.rating;
      });
      sum = sum / comments.length;

      return sum;
    }
  };

  getComments = () => {
    if (this.state.comments === "") {
      return (
        <View>
          <Text>Be the first to add a Comment!</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.commentList}
          data={this.state.comments}
          renderItem={({ item }, i) => (
            <ListItem
              title={`${item.users_first_name} ${item.users_last_name}`}
              subtitle={item.body}
              subtitleNumberOfLines={50}
              key={`${i}${item.user_id}`}
              avatar={this.state.avatar}
            />
          )}
          keyExtractor={item => {
            let idString = item.id;
            return idString.toString();
          }}
        />
      );
    }
  };
}
