import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    alignItems: 'center',
    minWidth: '100%',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#fffc',
    zIndex: 1,
    width: '95%',
    height: 40,
    borderRadius: 30,
    marginTop: 40,
    padding: 5,
  },
  searchBar: {
    backgroundColor: '#fff0',
    zIndex: 1,
    width: '90%',
    height: '100%',
    fontSize: 22,
    marginLeft: 5,
    color: '#444'
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
  }
});