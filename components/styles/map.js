import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#9990',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
    minWidth: '100%',
    minHeight: 50,
    alignSelf: 'stretch',
    top: 0,
    zIndex: 1,
  },
  searchInput: {
    alignSelf: 'stretch',
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
    bottom: -33,
    left: 0,
    right: 0,
    backgroundColor: '#6d9a',
    height: 330,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    shadowColor: '#fff',
    
  },
  meal: {
    backgroundColor: '#fff',
    height: 100,
    width: '90%',
  }
});