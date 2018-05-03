import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native'
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import * as firebase from 'firebase'
import Expo from 'expo'
import {FontAwesome} from '@expo/vector-icons';

export default class LoginForm extends React.Component {
    constructor(props){
        super(props)

        this.state =({
            email: '',
            password: ''
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                console.log(user)
            }
        })
    }

    signUpUser = (email, password) => {
        if (this.state.password.length < 6){
            alert('Please enter at least 6 characters')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(function(user) {
                console.log(user)
            })
    }

    async loginWithFacebook () {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2059563750952029', {permissions :['public_profile']})

        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInWithCredential(credential)
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render () {
        return (
            <View style={styles.container}>
                 <TouchableOpacity style={styles.buttonContainer} onPress={() => this.loginWithFacebook()}>
                    <Text style={styles.buttonText}>
                        Connect with Facebook  <FontAwesome style={styles.facebookLogo} name='facebook-square' size={20}></FontAwesome>
                    </Text>
                </TouchableOpacity>
                <TextInput 
                style={styles.input}
                placeholder='Email address' 
                returnKeyType= 'next'
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect= {false}
                onChangeText= {(email) => this.setState({email})} 
                />
                <TextInput 
                style={styles.input} 
                placeholder= 'Password'
                returnKeyType='go'
                secureTextEntry
                ref={(input) => this.passwordInput =input}
                onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={styles.joinButtonContainer}>
                    <Text style={styles.buttonText}>Not yet Registered? Join here!</Text>
                </TouchableOpacity>              
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        backgroundColor: '#5F9900',
        padding: 10,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    register : {
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
    }
  });
  