import React from 'react'
import {Text, Animated, Easing} from 'react-native'
import MapPage from './Map'
import Login from './Login'
import SideMenu from './SideMenu'
import Restaurant from './Restaurant'
import Comments from './Comments'
import {DrawerNavigator, StackNavigator} from 'react-navigation'

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

//drawer stack

const DrawerStack = DrawerNavigator({
    mapScreen: {
        screen: MapPage
    }, 
    restaurantScreen:{
        screen: Restaurant
    },
    commentsScreen: {
        screen: Comments
    },
    loginScreen: {
        screen: Login
    }
},
    {
        contentComponent: SideMenu,
        gesturesEnabled: true
    }
)

const drawerButton = (navigation) => 
    <Text
        style={{padding: 5, color: 'black'}}
        onPress={() => {
            navigation.navigate('DrawerToggle')
        }}
    >Menu</Text>

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack }
}, {
    headerMode:'float',
    navigationOptions: ({navigation}) => ({
        gesturesEnabled: true,
        headerLeft: drawerButton(navigation)
    })
})

//login stack

const LoginStack = StackNavigator(
    {
        LoginScreen: { screen: Login }
    })
        //   LoginScreen: {
        //     screen: Login
        //   },
        
        // {
        //   initialRouteName: 'LoginScreen',
        //   headerMode: 'none',
        // }

//Combination of possible screents

const PrimaryNav = StackNavigator({
    loginStack: {screen: LoginStack},
    drawerStack: {screen: DrawerNavigation},
}, {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
})

export default PrimaryNav