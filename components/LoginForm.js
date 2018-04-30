import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native'

export default class LoginForm extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'/>
                <TextInput 
                style={styles.input}
                placeholder='username or email' 
                returnKeyType= 'next'
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect= {false}
                />
                <TextInput 
                style={styles.input} 
                placeholder= 'password'
                returnKeyType='go'
                secureTextEntry
                ref={(input) => this.passwordInput =input}/>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    input: { 
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 15,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#5F9900',
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
  });
  