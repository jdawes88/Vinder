import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { styles } from './styles/map';
import { SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';

export default class Login extends Component {
    
    render () {
        return (
            <View>
                <View style={styles.container}>
                    <SearchBar lightTheme={true} 
                    round={true} inputStyle={styles.searchInput} 
                    containerStyle={styles.search} placeholder="Search" />
                    <Map style={styles.map} />
                </View>
            </View>
        )
    }
}

class Map extends Component {
    render () {
        return (
            <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 53.483959,
                longitude: -2.244644,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }}>
                <Marker />
            </MapView>
        )
    }
}

class Marker extends Component {
    render () {
        return (
            
                <MapView.Marker 
                    coordinate={{
                        latitude: 53.483955,
                        longitude: -2.244646
                    }}
                    title='Strange Place'
                />
            
        )
    }
}
