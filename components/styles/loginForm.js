import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
      padding: 20,
  },
  input: { 
      width: '100%',
      height: 40,
      marginBottom: 15,
      color: '#FFFFFF',
      paddingHorizontal: 10,
      marginTop: 20,
      borderBottomColor: '#FFFFFF',
      borderBottomWidth: 0.5,
  },
  buttonContainer: {
      position: 'relative',
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 50,
      borderRadius: 25,
      marginTop: 10,
      backgroundColor: 'rgba(95, 153, 0, 0.7)',
  },
  buttonText: {
      fontSize: 15,
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
  },
  register : {
      flex: 1,
      marginTop: 50,
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700',
      justifyContent: 'center'
  },
  joinButtonContainer: {
      marginTop: 100,
      height: 70,
      borderRadius: 25,
      marginTop: 10,
      padding: 10,
      flexDirection: 'column'
  },
  registerContainer : {
      flex: 1,
  },
  overlay: {
      flex: 1, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      padding:20, 
      alignItems: 'center'
  },
  registerHeader: {
      fontSize: 25, 
      marginBottom: 20, 
      marginTop:20, 
      color: '#FFFFFF', 
      textAlign: 'center', 
      width: '75%'
  },
  registerButtonsContainer: {
      flexDirection: 'column', 
      width: '100%'
  },
  backImg: {
    height: '100%',
    width: '100%'
  }     
});
