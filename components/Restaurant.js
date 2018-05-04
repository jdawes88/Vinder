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

export default class Restaurant extends React.Component {
  state = { meal: "", comment: "" };

  render() {
    console.log(this.state);
    const { image } = this.state;
    return (
      <ImageBackground
        source={require("../images/tattu.png")}
        style={styles.image}
      >
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <View style={styles.boxContainer}>
          <View style={styles.venueInfoContainer}>
            <View style={styles.venue}>
              <Text style={styles.text}>{"Tattu"}</Text>

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
                <AddDish />

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.popupDialog.dismiss()}
                >
                  <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </PopupDialog>

          <FlatList
            style={styles.list}
            data={dishes}
            renderItem={({ item }, i) => (
              <Card
                title={item.title}
                key={`${i}${item}`}
                containerStyle={styles.contentContainer}
              />
            )}
            keyExtractor={item => item.title}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D1D0D0"
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  venueInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: "30%",
    zIndex: 1,
    minWidth: "90%",
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  venue: {
    flex: 1,
    backgroundColor: "#FF5733"
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  },

  list: {
    flex: 1,
    backgroundColor: "#D1D0D0",
    width: "100%",
    opacity: 0.8
  },
  dishContainer: {
    fontSize: 20,
    fontFamily: "Cochin"
  },
  contentContainer: {
    top: 30,
    opacity: 1,
    alignItems: "center"
  },
  inner: {
    position: "absolute",
    top: 150,
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    backgroundColor: "#ED1D27",
    zIndex: 1
  },
  venueInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  venue: {
    borderColor: "#fff",
    borderWidth: 2,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "rgba(255,255,255, .1)",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Cochin"
  },
  logos: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  laptop: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    padding: 20
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
  },
  popup: {
    alignItems: "center",
    justifyContent: "center"
  }
});
