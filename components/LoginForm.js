import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Modal, KeyboardAvoidingView, Image, ImageBackground} from 'react-native'
import PopupDialog from 'react-native-popup-dialog'
import * as firebase from 'firebase'
import Expo from 'expo'
import {FontAwesome, Ionicons} from '@expo/vector-icons'


export default class LoginForm extends React.Component {
    
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        registerModalVisible: false
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                console.log(user)
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

    // create new user and add to firebase auth

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
                this.clearState()
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
                        <ImageBackground source={require('./images/loginImg/vegan-background.jpg')} style ={{height: '100%', width: '100%'}}>
                        <View style={styles.overlay}>
                        <Text style={styles.registerHeader}>Sign up to Vinder for vegan dishes!</Text>
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
                        <TouchableOpacity style={styles.buttonContainer} onPress= {() => {
                            this.signUpUser(this.state.email, this.state.password)
                            this.setModalVisible(!this.state.registerModalVisible)
                            }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}onPress={() => this.setModalVisible(!this.state.registerModalVisible)}>Back</Text>
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
        backgroundColor: 'rgba(95, 153, 0, 0.7)',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
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
    }
        
  });
  