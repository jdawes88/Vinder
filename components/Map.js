import React, {Component} from 'react';
import { 
    Text, 
    View,
    FlatList,
    TouchableHighlight,
    Image,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native';
import {
    Card,
    List,
    Button
} from 'react-native-elements';
import {
    styles,
    googleStyle
} from './styles/map';
import {
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome,
    Foundation,
    Feather
} from "@expo/vector-icons";
import MapView from 'react-native-maps';
import Loading from './loading.js';
import { DrawerNavigator } from 'react-navigation';
import geolib from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PopupDialog from "react-native-popup-dialog";
import dishes from '../dataMark/dishes.json';
import NavigationService from '../NavigationService';
import * as firebase from 'firebase';


export default class MapPage extends Component {
    static navigationOptions = {
        gesturesEnabled: true
    }
    state = {
        currentPos: {
            latitude: 53.4808,
            longitude: -2.2426,
            latD: 0.02,
            lngD: 0.056,
        },
        userPos: {
            latitude: 53.4808,
            longitude: -2.2426,
            latD: 0.02,
            lngD: 0.056,
        },
        loading: true,
        dishes: [],
        pinType: 'restaurants',
    }

    componentDidMount() {
        this.getUserLocation()
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    // componentWillUpdate(nextProps, nextState) {
    //     // console.log(nextProps)
    //     if(this.state.pinType !== nextState.pinType){
    //         this.getPins(this.state.currentPos, nextState.pinType)
    //     }
        
    //     console.log(this.state.pinType)
    //     console.log(nextState.pinType)
    // }

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
                <FunctionIcons 
                    updatePinType={this.updatePinType}
                    modalVisibility={this.state.modalVisibility}
                    setModalVisible={this.setModalVisible}
                />
                <Map 
                    pinType={this.state.pinType}
                    userPos={this.state.userPos}
                    style={styles.map}
                    updateLocation={this.updateLocation}
                    currentPos={this.state.currentPos}
                    dishes={this.state.dishes}
                />
                <Meals 
                    pinType={this.state.pinType}
                    dishes={this.state.dishes}
                />
            </View>
           ) 
        }
    }

    updatePinType = (pinType) => {
        this.setState({
            pinType
        })
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentPos: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latD: this.state.currentPos.latD,
                        lngD: this.state.currentPos.lngD
                    },
                    userPos: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latD: this.state.currentPos.latD,
                        lngD: this.state.currentPos.lngD
                    },
                    
                }, () => this.getPins(this.state.currentPos))
            },
            (error) => this.setState({error: error.message}),
            { enableHighAccuracy: true, timeout: 3000, maximumAge: 2000 }
        )
    }

    updateLocation = (lat, lng, latD=this.state.currentPos.latD, lngD=this.state.currentPos.lngD) => {
        this.setState({
            currentPos: {
                latitude: lat,
                longitude: lng,
                latD: latD,
                lngD: lngD
            }
        }, () => this.getPins(this.state.currentPos))
    }

    getPins = (place) => {
        // this.getLocalDishes(dishes, place)
        const pinType = this.state.pinType;
        return fetch(`https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/${pinType}`)
            .then(res => res.json())
            .then(res => this.getLocalPins(res, place))
            .catch(err => console.log('error:' + err))
    }

    getLocalPins = (dishes, locationA) => {
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

    checkDistance = (a, b) => {
        if (b.latitude === 'null') {
            return false
        } else {
            newA = {
                latitude: a.latitude,
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
        const {updatePinType} = this.props 
        return (
            <View style={styles.functionIcons}>
                <MaterialCommunityIcons 
                    onPress={() => this.popupDialog.show()}
                    name="plus-circle-outline" size={33} color="#fff" />
                <PopupDialog
                    containerStyle={styles.modal}
                    ref={popupDialog => {
                      this.popupDialog = popupDialog;
                    }}
                    haveOverlay={false} dialogStyle={styles.dialogStyle}
                >
                    <View>
                        <MaterialCommunityIcons onPress={() => updatePinType('dishes')} name="food" size={35} color="#fff" />
                        <MaterialIcons onPress={() => updatePinType('restaurants')} name="location-city" size={35} color="#fff" />
                        <Feather onPress={this.handleLogout} name="log-out" size={35} color="#fff" />
                    </View>
                </PopupDialog>
            </View>
        )
    }

    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('signed out')
                NavigationService.navigate('LoginScreen', null)
            })
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
            returnKeyType={'search'}
            fetchDetails={true}
            listViewDisplayed='true'
            onPress={(data, details = null) => {
                this.handleSubmit(details.geometry.location)
            }}
            getDefaultValue={() =>  {return ''}}
            query={{
                key: 'AIzaSyA3to9-gUo2wfr4yBypCwbOsIr2866UFYE',
                language: 'en',
                types: '(cities)'
            }}
            styles={googleStyle}
            nearbyPlacesAPI='GooglePlacesSearch'
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            predefinedPlacesAlwaysVisible={true}
            />
        );
    }

    handleSubmit = (location) => {
        const lat = location.lat;
        const lng = location.lng;
        this.props.updateLocation(lat, lng, )
    }
}


/* ***Map Component *** */
class Map extends Component {
    render () {
        console.log(this.props.pinType)
        const { latitude, longitude, latD, lngD }  = this.props.currentPos;
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
                showsUserLocation >
                <View style={styles.locateIcon}>
                    <FontAwesome onPress={this.centerToUser} name="map-marker"  
                        size={30} color="#6d9" />
                </View>
                <Zoom zoom={this.zoom} />
                <Marker
                    pinType={this.props.pinType}
                    dishes={this.props.dishes}
                />
            </MapView>
        )
    }

    zoom = (param) => {
        const { latitude, longitude, latD, lngD } = this.props.currentPos;

        if (param === 'out') {
            this.props.updateLocation(latitude, longitude, latD * 2, lngD * 2)
            this.map.animateToRegion({
                latitude,
                longitude,
                latD: latD * 2,
                lngD: lngD * 2,
            })
        } else {
            this.props.updateLocation(latitude, longitude, latD / 2, lngD / 2)
            this.map.animateToRegion({
                latitude,
                longitude,
                latD: latD / 2,
                lngD: lngD / 2,
            })
        }
    }

    centerToUser = () => {
        const { latitude, longitude, latD, lngD }  = this.props.userPos;
        this.props.updateLocation(latitude, longitude, latD, lngD)
        this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: latD,
            longitudeDelta: lngD
        })
    }
}

class Zoom extends Component {
    render () {
        return (
            <View style={styles.zoomBox}>
                <MaterialIcons onPress={() => this.props.zoom('in')} name="zoom-in" size={35} color="#fff" />
                <MaterialIcons onPress={() => this.props.zoom('out')} name="zoom-out" size={35} color="#fff" />
            </View>
        )
    }
}

class Marker extends Component {

    // componentWillReceiveProps (newProps) {
    //     if(newProps.pinType !== this.props.pinType){
    //         console.log(newProps.dishes)
    //     }
    // }

    render () {
        
        return (
            this.props.dishes.map((dish, i) => {
                return (
                    <MapView.Marker
                        key={dish.id}
                        coordinate={{
                            latitude: +dish.latitude,
                            longitude: +dish.longitude
                        }}
                        title={dish.name}
                        // onPress={()=> this.linkToRestaurant()}
                    >
                    <MapView.Callout>
                        <View > 
                            <Button backgroundColor={'rgba(0,0,0,0.5)'} color={'white'} title={dish.name} onPress={() => this.linkToRestaurant()}/>
                        </View>
                    </MapView.Callout>
                    </MapView.Marker>
                )
            })
        )
    }
    linkToRestaurant = () => {
        NavigationService.navigate('RestaurantScreen', null)
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
                keyExtractor={(item, i) =>  item.id.toString()}
            />
        )
    }

    renderCard = (item) => {
        return (
            <TouchableOpacity onPress={()=> this.linkToRestaurant()}>
            <Card 
            containerStyle={styles.mealCard}
            title={item.name}
            image={{uri:'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/noodles.jpg?itok=Oalsb6ro'}}>
                <View style={styles.mealText}>
                    <Text style={styles.mealText}>{item.name}</Text>
                    <View style={styles.mealText}>{this.showRating(item)}</View>
                </View>
            </Card> 
            </TouchableOpacity>             
        )
    }

    showRating = ({ price }) => {
        let images = [];
        if (price === 'undefined') price = '££';
        price = price.split('').length;
        for(let i = 0; i < price; i++ ) {
            images.push(
                <Foundation size={30} color='#6d9' key={i} name='pound'/>
            )
        }
        return images;
    }

    linkToRestaurant = () => {
        NavigationService.navigate('RestaurantScreen', null)
    }
}

