import React, {Component} from 'react';
import { Text, View, FlatList, TouchableHighlight, Image, TextInput } from 'react-native';
import { Card, List, Button } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import Loading from './loading.js';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Foundation } from "@expo/vector-icons";
import { DrawerNavigator } from 'react-navigation';
import goelib from 'geolib';

export default class MapPage extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        currentPos: {
            latitude: 53.4808,
            longitude: -2.2426,
        },
        loading: true,
        dishes: []
    }

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../data/coin.png')}
            style={[styles.icon]}
          />
        ),
      };
    

    componentDidMount() {
        this.getUserLocation()
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render () {
        const currentPos = {}
        return (
            <View style={styles.container}>
                <Search 
                    updateLocation={this.updateLocation}
                    getUserLocation={this.getUserLocation}
                />
                {!this.state.loading && <FunctionIcons />}
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
                }, () => this.getDishes(this.state.currentPos))
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
        }, () => this.getDishes(this.state.currentPos))
    }

    getDishes = (place) => {
        return fetch('https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants')
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(res => this.getLocalDishes(res, place))
            .catch(err => console.log('error:' + err))
    }

    getLocalDishes = (dishes, locationA) => {
        const dishesInRadius = dishes.filter(dish => {
            const locationB = {
                latitude: dish.restaurant_latitude,
                longitude: dish.restaurant_longitude
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

    checkDistance = (a, b) => {
        if (b.latitude === 'null') {
            return false
        } else {
            newA = {
                latitude: a.latitude + 0.012,
                longitude: a.longitude
            };
            return geolib.isPointInCircle(
                newA, b, 500
            )
        }
    }
}

class FunctionIcons extends Component {
    render () {
        return (
            <View style={styles.functionIcons}>
                <TouchableHighlight style={styles.menuButton}>
                    <MaterialCommunityIcons name="food" size={40} color="#fff" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.menuButton}>
                    <MaterialIcons name="location-city" size={40} color="#fff" />
                </TouchableHighlight>
            </View>
        )
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
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                />
                <TouchableHighlight underlayColor='#0000' onPress={this.handlePress}>
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
                        key={dish.restaurant_id}
                        coordinate={{
                            latitude: +dish.restaurant_latitude,
                            longitude: +dish.restaurant_longitude
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
                keyExtractor={(item, i) => item.restaurant_id.toString()}
             />
        )
    }

    renderCard = (item) => {
        return (
            <Card 
            containerStyle={styles.mealCard}
            title={item.restaurant_name}
            image={{uri:'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/noodles.jpg?itok=Oalsb6ro'}}>
                <View style={styles.mealText}>
                    <Text style={styles.mealText}>{item.restaurant_name}</Text>
                    <View style={styles.mealText}>{this.showRating(item)}</View>
                </View>
            </Card>              
        )
    }

    showRating = ({ restaurant_price }) => {
        let images = [];
        if (restaurant_price === 'undefined') restaurant_price = '££';
        let price = restaurant_price.split('').length;
        for(let i = 0; i < price; i++ ) {
            images.push(
                <Foundation size={30} color='#6d9' key={i} name='pound'/>
            )
        }
        return images;
    }
}


