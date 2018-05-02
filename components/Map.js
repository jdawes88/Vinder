import React, {Component} from 'react';
import { Text, View, FlatList, TouchableHighlight, Image, TextInput } from 'react-native';
import { Card, List } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import dishes from '../data/dishes.json';
import Loading from './loading.js';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default class MapPage extends Component {
    state = {
        currentPos: {
            latitude: 53.4808,
            longitude: -2.2426,
        },
        loading: true,
        dishes: []
    }

    componentDidMount() {

        this.getUserLocation()
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render () {
        const currentPos = {}
        return (
            <View>
                <View style={styles.container}>
                    <Search 
                        updateLocation={this.updateLocation}
                        getUserLocation={this.getUserLocation}
                    />
                    {!this.state.loading && <Map 
                        style={styles.map}
                        position={this.state.currentPos}
                        dishes={this.state.dishes}
                     />}
                    {!this.state.loading && <Meals 
                        dishes={this.state.dishes}
                    />}
                    {this.state.loading && <Loading />}
                </View>
            </View>
        )
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentPos: {
                        latitude: position.coords.latitude - 0.012,
                        longitude: position.coords.longitude,
                    }
                }, () => this.getLocalDishes(this.state.currentPos))
            },
            (error) => this.setState({error: error.message}),
            { enableHighAccuracy: true, timeout: 3000, maximumAge: 2000 }
        )
    }

    updateLocation = (lat, lng) => {
        this.setState({
            currentPos: {
                latitude: lat - 0.012,
                longitude: lng
            }
        }, () => this.getLocalDishes(this.state.currentPos))
    }

    checkDistance = (a, b) => {
        const dist = this.haversineDistance(a, b)
        return (dist < 2) ? true : false;
    }

    haversineDistance = (latlngA, latlngB) => {
        const toRad = x => (x * Math.PI) / 180;
        const R = 6371; // km
        
        const dLat = toRad(latlngB.latitude - latlngA.latitude);
        const dLatSin = Math.sin(dLat / 2);
        const dLon = toRad(latlngB.longitude - latlngA.longitude);
        const dLonSin = Math.sin(dLon / 2);
      
        const a = (dLatSin * dLatSin) + (Math.cos(toRad(latlngA.latitude)) * Math.cos(toRad(latlngB.latitude)) * dLonSin * dLonSin);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = R * c;
        return distance;
      }

      getLocalDishes = (locationA) => {
        const dishesInRadius = dishes.filter(dish => {
            const locationB = {
                latitude: dish.latitude,
                longitude: dish.longitude
            }
            if (this.checkDistance(locationA, locationB)) {
                return dish
            }
        })
        this.updateDishes(dishesInRadius)
    }

    updateDishes = (dishesInRadius) => {
        this.setState({
            dishes: dishesInRadius,
            loading: false
        })
    }
}


/* ***SearchBar Component*** */
class Search extends Component {
    render () {
        return (
            <View style={styles.search}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder="Search"
                    returnKeyType='search'
                    onSubmitEditing={this.handleSubmit}
                />
                <TouchableHighlight onPress={this.handlePress}>
                    <FontAwesome name="map-marker" style={{zIndex: 2}} size={30} color="#6d9" />
                </TouchableHighlight>
            </View>
        )
    }

    handlePress = () => {
        this.props.getUserLocation()
    }

    handleSubmit = (e) => {
        this.getLocationData(e.nativeEvent.text)
    }

    getLocationData = (location) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?&address=${location},uk&key=AIzaSyA3to9-gUo2wfr4yBypCwbOsIr2866UFYE`)
            .then(res => res.json())
            .then(res => {
                const lat = res.results[0].geometry.location.lat;
                const lng = res.results[0].geometry.location.lng;
                this.props.updateLocation(lat, lng)
            })
            .catch(console.log)
    }
}


/* ***Map Component *** */
class Map extends Component {
    render () {
        return (
            <MapView 
            style={styles.map}
            initialRegion={{
                latitude: this.props.position.latitude,
                longitude: this.props.position.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.056
            }}
            region={{
                latitude: this.props.position.latitude,
                longitude: this.props.position.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.056
            }}
            showsUserLocation
            >
                <Marker 
                    dishes={this.props.dishes}
                />
            </MapView>
        )
    }

    
}

class Marker extends Component {
    render () {
        return (
            this.props.dishes.map((dish, i) => {
                return (
                    <MapView.Marker
                        key={i}
                        coordinate={{
                            latitude: dish.latitude,
                            longitude: dish.longitude
                        }}
                        title={dish.title}
                    />
                )
            })
        )
    }
}


/* ***Meals Component *** */
class Meals extends Component {
    render () {
        return (
            <FlatList 
                style={styles.meals}
                data={this.props.dishes}
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
