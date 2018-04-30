import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { styles } from './styles/map';
import { SearchBar } from 'react-native-elements'

export default class Login extends React.Component {
    
    render () {
        return (
            <View>
                <View style={styles.container}>
                    <SearchBar lightTheme={true} round={true} inputStyle={styles.searchInput} containerStyle={styles.search} placeholder="Search"></SearchBar>
                    <Text>This is our map page</Text>
                </View>
            </View>
        )
    }
}
