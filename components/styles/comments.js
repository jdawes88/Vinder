import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  rating: {
    paddingLeft: 20
  },
  price: {
    alignItems: "center"
  },
  add: {
    paddingRight: 20
  },
  commentList: {},
  buttonContainer: {
    // backgroundColor: "#5F9900",
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
    paddingTop: 20
  },
  inputComment: {
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 300,
    height: 100,
    backgroundColor: "#D7DDC4"
  }
});
