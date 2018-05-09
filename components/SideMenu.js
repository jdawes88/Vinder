import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles/sideMenu'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import NavigationService from '../NavigationService'


class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction)
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Vinder
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('mapScreen')}>
                                Find dishes and restautants!
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <TouchableOpacity style={styles.navItemStyle} onPress={() =>{
                                return firebase.auth().signOut()
                                    .then(() => this.navigateToScreen('mapScreen'))
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }}>
                                <Text>
                                Sign out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                console.log('signed out')
                this.navigateToScreen('loginStack')
            })
                
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu