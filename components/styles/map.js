import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    minWidth: '100%',
  },
  search: {
    position: 'relative',
    top: 80,
    backgroundColor: '#fffa',
    zIndex: 4,
    width: '100%',
    justifyContent: 'center'
  },
  searchBar: {
    position: 'absolute',
    backgroundColor: '#ff00',
    top: -40,
    left: 0,
    zIndex: 2,
    width: '90%',
    height: 40,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'
  },
  meals: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 330,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    shadowColor: '#6d9a',
    backgroundColor: '#6d9a',
  },
  meal: {
    backgroundColor: '#fff',
    height: 100,
    width: '90%',
  },
  mealCard: {
    marginBottom: 10,
    borderRadius: 5,
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
    paddingRight: 3
  },
  zoomBox: {
    position: 'absolute',
    top: 100,
    right: 0,
    zIndex: 2,
    backgroundColor: '#6d9',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 3,
    paddingTop: 3,
  },
  upperIconBox: {
    borderBottomColor: '#dddd',
    borderBottomWidth: 2
  },
  locateIcon: {
    position: 'absolute',
    top: 47,
    right: 10,
    zIndex: 3,
  }
});