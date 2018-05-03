import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

export default class Register extends React.Component {
    render () {
        console.log(this.props)
        const {setModalVisible, registerModalVisible} = this.props
        return (
            <KeyboardAvoidingView style= {styles.container}>
                <View>
                    <Text>Register</Text>
                </View>
                <TextInput style={styles.input}/>
                <TouchableOpacity style={styles.buttonContainer} onPress= {() => this.setModalVisible}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7FCC00',
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    input: { 
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 15,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        marginTop: 20,
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 0.5
    },
    buttonContainer: {
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        backgroundColor: '#5F9900',
        padding: 10,
        flexDirection: 'column'
    }
})