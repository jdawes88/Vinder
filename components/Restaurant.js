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
import PopupDialog from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { ImagePicker, Permissions } from "expo";
import KeyboardSpacer from "react-native-keyboard-spacer";
import dishes from "../data-jo/dishes.json";
import AddDish from "./AddDish";
import styles from "./styles/restaurant";
import axios from "react-native-axios";
// import axios from "axios";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";

export default class Restaurant extends React.Component {
  static navigationOptions = {
    gesturesEnabled: true
  };
  state = {
    meal: "",
    comment: "",
    restaurantInfo: "",
    dishes: "",
    description: "",
    loading: true
  };

  componentDidMount() {
    //console.log(this.props.navigation.state.params);
    // this.getRestauarantId(this.props.navigation.state.params.restaurant.id);
    this.getDishByRestaurantId(
      this.props.navigation.state.params.restaurant.id
    );
  }

  render() {
    const { image } = this.state;
    const { restaurant } = this.props.navigation.state.params;
    //console.log(restaurant);
    return (
      <ImageBackground
        source={[{ uri: restaurant.image_url }]}
        style={{ flex: 1, width: null, height: null }}
      >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.boxContainer}>
          <View style={styles.venueInfoContainer}>
            <View style={styles.venue}>
              <Text style={styles.text}>{restaurant.name}</Text>

              <View style={styles.logos}>
                <FontAwesome
                  style={styles.laptop}
                  name="laptop"
                  size={40}
                  color="white"
                />

                <FontAwesome
                  style={styles.laptop}
                  name="mobile-phone"
                  size={40}
                  color="white"
                />
                <TouchableOpacity onPress={() => this.popupDialog.show()}>
                  <FontAwesome
                    name="plus-square-o"
                    style={styles.laptop}
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <PopupDialog
            width={350}
            height={600}
            borderRadius={25}
            dialogStyle={{ backgroundColor: "#B1C595" }}
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
          >
            <KeyboardAwareScrollView behavior="padding" enabled>
              <View style={styles.popup}>
                <AddDish
                  saveNewMeal={this.saveNewMeal}
                  alertFail={this.alertFail}
                />

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.handleSave}
                >
                  <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </PopupDialog>

          {this.loadingIcon()}
        </View>
      </ImageBackground>
    );
  }

  // getRestauarantId = id => {
  //   return axios
  //     .get(
  //       `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurant/${id}`
  //     )
  //     .then(res => res.data)

  //     .then(res => this.setState({ restaurantInfo: res }))
  //     .catch(err => console.log("error:" + err));
  // };

  getDishByRestaurantId = id => {
    return axios
      .get(
        `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dish/${id}`
      )
      .then(res => res.data)
      .then(res => this.setState({ dishes: res, loading: false }))

      .catch(err => console.log("error:" + err));
  };

  handleSave = () => {
    // handle request here using state to create new dish
    axios
      .post("https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/dish", {
        description: this.state.description,
        name: this.state.meal,
        imageURL: this.state.imageUrl,
        price: this.state.price,
        resId: this.state.resId
      })
      .then(res => {
        console.log(Res);
      });

    this.popupDialog.dismiss();
  };

  saveNewMeal = addDishState => {
    const { imageUrl, comment, meal } = addDishState;
    this.setState({
      meal,
      imageUrl,
      description: comment
    });
  };

  alertFail = () => {};

  loadingIcon = () => {
    if (this.state.loading === true) {
      return (
        <View>
          <Bubbles size={10} color="#FFF" />
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.list}
          data={this.state.dishes}
          renderItem={({ item }, i) => (
            <Card
              title={item.name}
              key={`${i}${item.name}`}
              containerStyle={styles.contentContainer}
            />
          )}
          keyExtractor={item => item.name}
        />
      );
    }
  };
}

// postDish = (name, description, price, image) => {
//   axios
//     .post(
//       `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/dish`,
//       {
//         name: input.name,
//         price: input.prices,
//         resId = restaurantId,
//         description: input.description,
//         image_url: this.state.img

//       }
//     )

//     .catch(error => console.log(error));
// };
