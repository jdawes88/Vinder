import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends React.Component {
    render () {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <ImageBackground source={require('./images/loginImg/vegan-background.jpg')} style ={{height: '100%', width: '100%'}}>
                <View style={styles.overlay}>
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        resizeMode= 'contain'
                        source={require('./images/loginImg/vinder.png')}/>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
                </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {    
        flex: 1,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  });