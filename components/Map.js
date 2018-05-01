import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableHighlight } from 'react-native';
import { SearchBar, Card, ListItem, List } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import dishes from '../data/dishes.json';
import { url } from 'inspector';

export default class MapPage extends Component {
    
    render () {
        return (
            <View>
                <View style={styles.container}>
                    <SearchBar lightTheme={true} 
                    round={true} inputStyle={styles.searchInput} 
                    containerStyle={styles.search} placeholder="Search" />
                    <Map style={styles.map} />
                    <Meals />
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
                latitude: 53.479959,
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

class Meals extends Component {
    render () {
        return (
            <FlatList 
                style={styles.meals}
                // containerstyle={styles.mealsContainer}
                data={dishes}  
                renderItem={({ item }, i) => (
                    <Card 
                        title={item.title}
                        // image={{uri:'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/noodles.jpg?itok=Oalsb6ro'}}
                    />
            )}/>
        )
    }
}
