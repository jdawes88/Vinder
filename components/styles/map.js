import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d9',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#9994',
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
    backgroundColor: '#fffa',
  },
  StatusBar: {
    backgroundColor: 'blue'
  },
  map: {
    position: 'absolute',
    top: 75,
    width: '90%',
    height: 330,
    borderRadius: 10
  }
});