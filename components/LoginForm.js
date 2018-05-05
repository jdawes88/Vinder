import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StatusBar,
    Modal,
    KeyboardAvoidingView,
    Image,
    ImageBackground
} from 'react-native';
import {
    FontAwesome,
    Ionicons
} from '@expo/vector-icons';
import PopupDialog from 'react-native-popup-dialog';
import * as firebase from 'firebase';
import Expo from 'expo';
import styles from './styles/loginForm';

export default class LoginForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        registerModalVisible: false
    }

    componentDidMount() {
        //check login status
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                console.log(user)
                //if signed in on opening app- sign out
                firebase.auth().signOut()
                    .then(() => {
                        console.log('sign out successful')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                console.log('no user signed in')
            }
        })
    }

    // make register page visible or not visible
    setModalVisible = (visible) => {
        this.setState({
            registerModalVisible: visible
        })
    }

    // create new user and add to firebase auth- will sign the user in automatically after creating an account
    signUpUser = (email, password) => {
        if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
            alert('Please enter a valid email address.'); 
            return
        }
        else if (password.length < 6){
            alert('Please enter at least 6 characters');
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                // this.clearState()
            })
            .catch(error => {
                this.clearState()
                alert('This email address is already in use.')
            })
    }

    // clear state after registration
    clearState = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

    // log user in with email and password
    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user) =>{
                
            })
            .catch(error => {
                alert(`There is no user registered with the email: ${this.state.email}. Please register below.`)
                this.clearState()
            })
    }

    // create user and login with facebook
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
                placeholderTextColor= '#FFFFFF'
                autoCorrect= {false}
                ref={(input) => this.emailInput =input}
                onChangeText= {(email) => this.setState({email})} 
                />
                <TextInput 
                style={styles.input} 
                placeholder= 'Password'
                returnKeyType='go'
                secureTextEntry
                placeholderTextColor= '#FFFFFF'
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
                        <ImageBackground 
                            source={require('./images/vegan-background.jpg')} 
                            style ={styles.backImg}>
                        <View style={styles.overlay}>
                            <Text style={styles.registerHeader}>
                                Sign up to Vinder for vegan dishes!
                            </Text>
                            <TextInput style={styles.input}
                                onChangeText={firstName => this.setState({firstName})}
                                returnKeyType='next'
                                placeholderTextColor= '#FFFFFF'
                                onSubmitEditing={() => this.lastNameInput.focus()}
                                placeholder='First name'    
                            />
                            <TextInput style={styles.input}
                                onChangeText={lastName => this.setState({lastName})}
                                placeholder='Second name'
                                placeholderTextColor= '#FFFFFF'
                                returnKeyType='next'
                                onSubmitEditing={() => this.emailInput.focus()}
                                ref={(input) => this.lastNameInput =input}
                            />
                            <TextInput style={styles.input}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                returnKeyType= 'next'
                                keyboardType='email-address'
                                placeholderTextColor= '#FFFFFF'
                                autoCapitalize='none'
                                ref={(input) => this.emailInput = input}
                                autoCorrect= {false}
                                placeholder='Email address'
                                onChangeText= {(email) => this.setState({email})}
                            />
                            <TextInput style={styles.input}
                                returnKeyType='go'
                                secureTextEntry
                                placeholderTextColor= '#FFFFFF'
                                ref={(input) => this.passwordInput =input}
                                placeholder='Password'
                                onChangeText={(password) => this.setState({password})}
                            />
                            <View style={styles.registerButtonsContainer}>
                            <TouchableOpacity 
                                style={styles.buttonContainer}
                                onPress= {() => {
                                    this.signUpUser(this.state.email, this.state.password)
                                    this.setModalVisible(!this.state.registerModalVisible)
                                    }}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.buttonContainer}>
                                <Text 
                                    style={styles.buttonText} 
                                    onPress={() => this.setModalVisible(!this.state.registerModalVisible)}
                                >Back</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </ImageBackground>
                    </KeyboardAvoidingView>
                </Modal>
                            
            </View>
        )
    }
}
