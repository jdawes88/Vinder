import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableHighlight, Image } from 'react-native';
import { SearchBar, Card, ListItem, List, Rating } from 'react-native-elements';
import { styles } from './styles/map';
import MapView from 'react-native-maps';
import dishes from '../data/dishes.json';

export default class MapPage extends Component {
    state = {
        
    }

    render () {
        console.log(styles.container)
        return (
            <View>
                <View style={styles.container}>
                    <SearchBar lightTheme={true}
                        round={true} inputStyle={styles.searchStatus} 
                        containerStyle={styles.search} placeholder="Search"
                        />
                    <Map style={styles.map} />
                    <Meals />
                </View>
            </View>
        )
    }

    handlePress = () => {
        if (this.state.searchStatus.width === '0%') {
            this.setState({
                searchStatus: {
                    backgroundColor: '#fff',
                    width: '94%',
                }
            })
        } else {
            this.setState({
                searchStatus: {
                    backgroundColor: '#fff',
                    width: '0%',
                }
            })
        }
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
                longitudeDelta: 0.056
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
