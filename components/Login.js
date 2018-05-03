import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends React.Component {
    render () {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        resizeMode= 'contain'
                        source={require('./images/loginImg/vinder.png')}/>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {    
        flex: 1,
        backgroundColor: '#7FCC00',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        // justifyContent: 'center'
    },
    logo: {
        flex: 1,
        height: '50%',
        width: '50%'
    }
  });