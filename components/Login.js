import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';
import styles from './styles/login';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
    render () {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <ImageBackground source={require('./images/loginImg/vegan-background.jpg')} style={styles.logoImg}>
                    <View style={styles.overlay}>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                resizeMode= 'contain'
                                source={require('./images/loginImg/vinder.png')}/>
                        </View>
                        <LoginForm />
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}
