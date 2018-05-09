import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, ScrollView} from 'react-native';
import styles from './styles/sideMenu'
import firebase from 'firebase'
import PropTypes from 'prop-types'


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
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Map')}>
                                Find dishes and restautants!
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={() => {
                                firebase.auth().signOut()
                                    .then(() => {
                                        console.log('signed out')
                                        this.navigateToScreen('Login')
                                    })
                                }}>
                                Sign out
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu