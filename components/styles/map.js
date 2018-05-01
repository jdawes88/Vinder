import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    alignItems: 'center',
    minWidth: '100%'
  },
  search: {
    backgroundColor: '#9990',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    minWidth: '100%',
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  map: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'
  },
  meals: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    height: 340,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    shadowColor: '#6d9a',
    backgroundColor: '#6d9b',
    overflow: 'scroll',
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
  }
});