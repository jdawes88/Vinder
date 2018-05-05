import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {    
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width:'100%'
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
  },
  logo: {
      flex: 1,
      height: '50%',
      width: '50%',
  },
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoImg: {
    height: '100%',
    width: '100%',
  }
});
