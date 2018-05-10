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
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";
import NavigationService from "../NavigationService";
import * as firebase from "firebase";

export default class Restaurant extends React.Component {
  static navigationOptions = { gesturesEnabled: true };
  state = {
    newDish: {
      resId:  this.props.navigation.state.params.restaurant.id,
      dishName: '',
      description: '',
      price: '',
      imageURL: ''
    },
    restaurantInfo: "",
    dishes: "",
    loading: true
  };

  componentDidMount() {
    console.log(this.props.navigation.state.params.restaurant.id)
    this.getDishByRestaurantId(
      this.props.navigation.state.params.restaurant.id
    );
  }

  render() {
    const { image } = this.state;
    const { restaurant } = this.props.navigation.state.params;
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

  getDishByRestaurantId = id => {
    return axios
      .get(
        `https://jfv21zsdwd.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dishes/${id}`
      )
      .then(res => res.data)
      .then(res => this.setState({ dishes: res, loading: false }))
      .catch(err => console.log("error on get dish by restaurant: ", err));
  };

  handleSave = () => {
    // handle request here using state to create new dish
    axios
      .post("https://jfv21zsdwd.execute-api.eu-west-2.amazonaws.com/dev/dish", this.state.newDish)
      .then(() => {
        this.popupDialog.dismiss();
      })
      .catch(err => {
        console.log('error on handle save: ', err)
      })
  };

  saveNewMeal = addDishState => {
    const { imageURL, description, dishName, price } = addDishState;
    this.setState({
      newDish: {
        resId: this.props.navigation.state.params.restaurant.id,
        dishName: dishName,
        description: description,
        price: price,
        imageURL: imageURL
      }
    });
  };

  alertFail = () => {};

  loadingIcon = () => {
    if (this.state.loading) {
      return (
        <View style={{ paddingBottom: 80 }}>
          <Bubbles size={10} color="#FFF" />
        </View>
      );
    } else {
      return (
        <View style={styles.list}>
          <FlatList
            style={styles.list}
            data={this.state.dishes}
            renderItem={({ item }, i) => (
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate("CommentsScreen", { dish: item })
                }
              >
                <Card
                  image={item.dish_image_url ? {uri: item.dish_image_url} : null}
                  title={item.name}
                  key={`${i}${item.name}`}
                  containerStyle={styles.contentContainer}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, i) => `${item.name}${i}`}
          />
          <View style={styles.overlay}/>
        </View>
      );
    }
  };

  renderComments = item => {
    NavigationService.navigate("CommentsScreen", { dish: item });
  };
}
