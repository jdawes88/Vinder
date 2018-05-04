import React, {Component} from 'react';
import { Text, View, FlatList, TouchableHighlight, Image, TextInput } from 'react-native';
import { Card, List, Button } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import Loading from './loading.js';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Foundation } from "@expo/vector-icons";
import { DrawerNavigator } from 'react-navigation';
import geolib from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class MapPage extends Component {
    state = {
        currentPos: {
            latitude: 53.4808,
            longitude: -2.2426,
            latD: 0.02,
            lngD: 0.056,
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
        if (this.state.loading) {

            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        } else {
           return (
            <View style={styles.container}>
                <Search 
                    updateLocation={this.updateLocation}
                    getUserLocation={this.getUserLocation}
                />
                <Zoom zoom={this.zoom} />
                <FunctionIcons />
                <Map 
                    style={styles.map}
                    position={this.state.currentPos}
                    dishes={this.state.dishes}
                />
                <Meals 
                    dishes={this.state.dishes}
                />
            </View>
           ) 
        }
    
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentPos: {
                        latitude: position.coords.latitude - 0.012,
                        longitude: position.coords.longitude,
                        latD: this.state.currentPos.latD,
                        lngD: this.state.currentPos.lngD
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
                longitude: lng,
                latD: this.state.currentPos.latD,
                lngD: this.state.currentPos.lngD
            }
        }, () => this.getDishes(this.state.currentPos))
    }

    getDishes = (place) => {
        return fetch('https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants')
            .then(res => res.json())
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

    zoom = (param) => {
        let newRegion;
        if (param === 'out') {
            newRegion = {
                latitude: this.state.currentPos.latitude - 0.004,
                longitude: this.state.currentPos.longitude,
                latD: this.state.currentPos.latD * 2,
                lngD: this.state.currentPos.lngD * 2,
            }
            
        } else {
            newRegion = {
                latitude: this.state.currentPos.latitude + 0.004,
                longitude: this.state.currentPos.longitude,
                latD: this.state.currentPos.latD / 2,
                lngD: this.state.currentPos.lngD / 2,
            }
        }
        this.setState({
            currentPos: newRegion
        })
    }
}

class Zoom extends Component {
    render () {
        return (
            <View style={styles.zoomBox}>
                <View style={styles.upperIconBox}>
                    <MaterialIcons onPress={() => this.props.zoom('in')} name="zoom-in" size={35} color="#fff" />
                </View>
                    <MaterialIcons onPress={() => this.props.zoom('out')} name="zoom-out" size={35} color="#fff" />
            </View>
        )
    }
}

class FunctionIcons extends Component {
    render () {
        return (
            <View style={styles.functionIcons}>
                <TouchableHighlight style={styles.upperIconBox}>
                    <MaterialCommunityIcons name="food" size={35} color="#fff" />
                </TouchableHighlight>
                    <MaterialIcons name="location-city" size={35} color="#fff" />
            </View>
        )
    }
}

/* ***SearchBar Component*** */
class Search extends Component {
    render() {
        return (
            <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
                this.handleSubmit(details.geometry.location)
            }}
            getDefaultValue={() =>  ''}
            query={{
                key: 'AIzaSyA3to9-gUo2wfr4yBypCwbOsIr2866UFYE',
                language: 'en', // language of the results
                types: '(cities)', // default: 'geocode'
            }}
            styles={{
                container: styles.search,
                textInputContainer: styles.searchBar,
                textInput: {
                    backgroundColor: '#fffc',
                    fontSize: 20,
                    marginLeft: 10,
                    borderRadius: 30
                },
                description: {
                    fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                poweredContainer: {
                    backgroundColor: '#fff0'
                }
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            predefinedPlacesAlwaysVisible={true}
            // renderRightButton={() => }
            />
        );
    }

    handleSubmit = (location) => {
        const lat = location.lat;
        const lng = location.lng;
        this.props.updateLocation(lat, lng)
    }
}


/* ***Map Component *** */
class Map extends Component {
    render () {
        const { latitude, longitude, latD, lngD }  = this.props.position;
        return (
            <MapView 
            style={styles.map}
            ref={map => {this.map = map}}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.056
            }}
            region={{
                latitude,
                longitude,
                latitudeDelta: latD,
                longitudeDelta: lngD
            }}
            showsUserLocation
            >
            <View style={styles.locateIcon}>
                <FontAwesome onPress={this.centerToUser} name="map-marker"  
                    size={30} color="#6d9" />
            </View>
                <Marker 
                    dishes={this.props.dishes}
                />
            </MapView>
        )
    }

    centerToUser = () => {
        const { latitude, longitude, latD, lngD }  = this.props.position;
        this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: latD,
            longitudeDelta: lngD
          })
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


