import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
  },
  test: {
    height: 30,
    backgroundColor: "#5F9900"
  }
});
