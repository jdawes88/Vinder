import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(95, 153, 0, 0.7)",
    minWidth: "100%"
  },
  map: {
    position: "absolute",
    top: "-30%",
    width: "100%",
    height: "130%",
    zIndex: 0
  },
  meals: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 340,
    shadowOffset: { width: 0, height: 20 },
    borderColor: 'rgba(105, 153, 0, 0.7)',
    shadowColor: 'rgba(105, 153, 0, 0.7)',
    borderTopWidth: 10,
    backgroundColor: "rgba(105, 153, 0, 0.7)"
  },
  meal: {
    backgroundColor: "#fff",
    height: 100,
    width: "90%"
  },
  mealCard: {
    marginBottom: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 15,
    shadowColor: "#fff3"
  },
  mealText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mealRating: {
    height: 20,
    width: 20,
    padding: 5
  },
  menuButton: {
    width: 40
  },
  functionIcons: {
    position: "absolute",
    top: 100,
    left: 0,
    zIndex: 1,
    backgroundColor: "rgba(105, 163, 30, 0.8)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    paddingRight: 3,
    paddingTop: 2
  },
  zoomBox: {
    position: "absolute",
    top: 300,
    right: 0,
    zIndex: 3,
    backgroundColor: "rgba(105, 163, 30, 0.8)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 3,
    paddingTop: 3
  },
  locateIcon: {
    position: "absolute",
    top: 246,
    right: 14,
    zIndex: 4
  },
  modal: {
    backgroundColor: "#f0f0"
  },
  dialogStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    maxWidth: 40,
    alignItems: "center",
    height: 115,
    backgroundColor: "rgba(105, 153, 0, 1)",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  overlay: {
    position: "absolute",
    bottom: 330,
    left: 0,
    right: 0,
    height: 10,
    shadowOffset: { width: 0, height: 20 },
    borderColor: 'rgba(105, 163, 30, 1)',
    borderTopWidth: 10,
    backgroundColor: "rgba(95, 153, 0, 0)"
  }
});

export const googleStyle = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    backgroundColor: "#ff0",
    zIndex: 2,
    width: "100%",
    maxHeight: "100%",
    justifyContent: "center"
  },
  textInputContainer: {
    position: "absolute",
    backgroundColor: "#fff0",
    top: -35,
    left: 0,
    width: "90%",
    zIndex: 1,
    height: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listView: {
    zIndex: 1,
    backgroundColor: "#fff"
  },
  textInput: {
    backgroundColor: "#fffe",
    fontSize: 20,
    marginLeft: 10,
    borderRadius: 30
  },
  description: {
    fontWeight: "bold"
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  poweredContainer: {
    backgroundColor: "#f0f0"
  }
});
