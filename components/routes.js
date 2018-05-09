import MapPage from './Map'
import Login from './Login'
import SideMenu from './SideMenu'
import {DrawerNavigator} from 'react-navigation'


export const Drawer = DrawerNavigator({
    Map: {
        screen: MapPage
    },
    SignOut: {
        screen: Login
    }
},
    {
        contentComponent: SideMenu,
        drawerWidth: 300
    }
)