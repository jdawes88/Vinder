import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    minWidth: '100%',
  },
  map: {
    position: 'absolute',
    top: '-30%',
    width: '100%',
    height: '130%'
  },
  meals: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: '#6d9',
  },
  meal: {
    backgroundColor: '#fff',
    height: 100,
    width: '90%',
    
  },
  mealCard: {
    marginBottom: 10,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 15,
    shadowColor: '#0007',
  },
  mealText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mealRating: {
    height: 20,
    width: 20,
    padding: 5
  },
  menuButton: {
    width: 40,
  },
  functionIcons: {
    position: 'absolute',
    top: 100,
    left: 0,
    zIndex: 2,
    backgroundColor: '#6d9',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 3,
    paddingBottom: 2
  },
  zoomBox: {
    position: 'absolute',
    top: 350,
    right: 0,
    zIndex: 2,
    backgroundColor: '#6d9',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 3,
    paddingTop: 3,
  },
  upperIconBox: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2
  },
  locateIcon: {
    position: 'absolute',
    top: 286,
    right: 14,
    zIndex: 3,
  }
});

export const googleStyle = StyleSheet.create({
  container: {
    position: 'relative',
    top: 70,
    backgroundColor: '#fffa',
    zIndex: 4,
    width: '100%',
    justifyContent: 'center'
  },
  textInputContainer: {
    position: 'absolute',
    backgroundColor: '#ff00',
    top: -35,
    left: 0,
    zIndex: 2,
    width: '90%',
    height: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    backgroundColor: '#fffd',
    fontSize: 20,
    marginLeft: 10,
    borderRadius: 30
  },
  description: {
    fontWeight: 'bold',
  },
  predefinedPlacesDescription: {
      color: '#1faadb',
  },
  poweredContainer: {
      backgroundColor: '#fff0'
  }
})