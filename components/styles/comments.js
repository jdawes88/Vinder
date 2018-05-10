import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  bar: {
    height: 22,
    backgroundColor: "#82B935"
  },
  image: {
    width: 420,
    height: 250
  },
  infoBox: {
    backgroundColor: "#82B935",
    width: "100%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  price: {
    alignItems: "center"
  },
  add: {
    paddingRight: 20
  },
  commentList: {},
    buttonContainer: {
    backgroundColor: "rgba(95, 153, 0, 0.7)",
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
    paddingTop: 10
  },
  inputComment: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    height: 100,
    backgroundColor: "#D7DDC4"
  },
  inputTitle: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    height: 40,
    backgroundColor: "#D7DDC4"
  },
  title: {
    paddingTop: 20,
    alignItems: "center"
  },
  popupText: {
    fontFamily: 'KohinoorDevanagari-Semibold',
    fontSize: 18,
    color: '#304413'
  }
}));
