import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableHighlight, Image } from 'react-native';
import { SearchBar, Card, ListItem, List, Rating } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import dishes from '../data/dishes.json';

export default class MapPage extends Component {
    state = {
        latitude: 53.4808,
        longitude: -2.2426
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude - 0.012,
                    longitude: position.coords.longitude,
                    error: null
                })
            },
            (error) => this.setState({error: error.message}),
            { enableHighAccuracy: true, timeout: 3000, maximumAge: 2000}
        )
    }

    render () {
        return (
            <View>
                <View style={styles.container}>
                    <SearchBar lightTheme={true}
                        round={true} inputStyle={styles.searchStatus} 
                        containerStyle={styles.search} placeholder="Search"
                        />
                    <Map style={styles.map}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                     />
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
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.056
            }}
            region={{
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.056
            }}
            showsUserLocation
            >
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
                data={dishes}
                renderItem={({ item }, i) => (
                    this.renderCard(item)
                )}
                keyExtractor={(item) => item.title}
             />
        )
    }

    renderCard = (item) => {
        return (
            <Card 
            containerStyle={styles.mealCard}
            title={item.title}
            image={{uri:'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/noodles.jpg?itok=Oalsb6ro'}}>
                <View style={styles.mealText}>
                    <Text style={styles.mealText}>{item.restaurant}</Text>
                    <View style={styles.mealText}>{this.showRating(item)}</View>
                </View>
            </Card>              
        )
    }

    showRating = ({ price }) => {
        let images = [];
        for(let i = 0; i <= (+price); i++ ) {
            images.push(
                <Image 
                    key={i}
                    source={require('../data/money-stack.png')}
                    style={styles.mealRating}
                    />
            )
                
        }
        return images;
    }
}
