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
                        source={require('./images/loginImg/peace.png')}/>
                    <Text style={styles.title}>
                        Find your favourite vegan dishes near you!
                    </Text>
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
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        backgroundColor: '#7FCC00'
    },
    title: {
        fontSize: 20,
        color: '#FFF',
        marginTop: 10,
        width: 200,
        textAlign: 'center',
        opacity: 0.8
    }
  });