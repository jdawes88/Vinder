import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Modal, KeyboardAvoidingView, Image} from 'react-native'
import PopupDialog from 'react-native-popup-dialog'
import * as firebase from 'firebase'
import Expo from 'expo'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

export default class LoginForm extends React.Component {
    constructor(props){
        super(props)

        this.state =({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            registerModalVisible: false
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                console.log(user)
            }
        })
    }

    setModalVisible = (visible) => {
        this.setState({
            registerModalVisible: visible
        })
    }

    signUpUser = (email, password) => {
        if (this.state.password.length < 6){
            alert('Please enter at least 6 characters')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.clearState()
                alert('You are now registered. Please login.')
            })
    }

    clearState = () => {
        this.setState({
            email: '',
            password: ''
        })
    }

    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(function(user) {
                console.log(user)
            })
    }

    async loginWithFacebook () {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2059563750952029', {permissions :['public_profile', 'email']})

        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInWithCredential(credential)
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render () {
        console.log(this.state)
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
                <TouchableOpacity style={styles.joinButtonContainer} onPress={() => this.setModalVisible(!this.state.registerModalVisible)}>
                    <Text style={styles.buttonText}>Not yet Registered? Join here!</Text>
                </TouchableOpacity> 
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.registerModalVisible}
                    onRequestClose={() => {
                    }}   
                >
                    <KeyboardAvoidingView behavior='padding' style= {styles.registerContainer}>
                        <Text style={{fontSize: 25, marginBottom: 20, marginTop:20, color: '#FFFFFF', textAlign: 'center', width: '75%'}}>Sign up to Vinder for vegan dishes!</Text>
                        <TextInput style={styles.input}
                            onChangeText={firstName => this.setState({firstName})}
                            returnKeyType='next'
                            onSubmitEditing={() => this.lastNameInput.focus()}
                            placeholder='First name'    
                        />
                        <TextInput style={styles.input}
                            onChangeText={lastName => this.setState({lastName})}
                            placeholder='Second name'
                            returnKeyType='next'
                            onSubmitEditing={() => this.emailInput.focus()}
                            ref={(input) => this.lastNameInput =input}
                        />
                        <TextInput style={styles.input}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            returnKeyType= 'next'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            ref={(input) => this.emailInput = input}
                            autoCorrect= {false}
                            placeholder='Email address'
                            onChangeText= {(email) => this.setState({email})}
                        />
                        <TextInput style={styles.input}
                            returnKeyType='go'
                            secureTextEntry
                            ref={(input) => this.passwordInput =input}
                            placeholder='Password'
                            onChangeText={(password) => this.setState({password})}
                        />
                        <View style={{flexDirection: 'column', width: '100%'}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress= {() => {
                            this.signUpUser(this.state.email, this.state.password)
                            this.setModalVisible(!this.state.registerModalVisible)}}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}onPress={() => this.setModalVisible(!this.state.registerModalVisible)}>Back</Text>
                        </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
                            
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
        flexDirection: 'column',
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
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
        backgroundColor: '#7FCC00',
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
  });
  