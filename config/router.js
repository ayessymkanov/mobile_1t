import React from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator, StackRouter } from 'react-navigation'
import Users from '../screens/Users'
import UserDetails from '../screens/UserDetails'
import Settings from '../screens/Settings'
import Login from '../screens/Login'
import ScrollTabBar from '../screens/ScrollTabBar'
import { Icon } from 'react-native-elements'
import App from '../screens/App'

export const MainStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    App: {
        screen: App,
        navigationOptions: {
            header: null
        }
    }
})

const UsersStack = StackNavigator({
    Users: {
        screen: Users,
        navigationOptions: {
            title: 'Users'
        }
    },
    UserDetails: {
        screen: UserDetails
    }
})

const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        }
    }
})

export const Drawer = DrawerNavigator({
    Users: {
        screen: UsersStack
    },
    Settings: {
        screen: SettingsStack
    }
})

export const Router = TabNavigator({
    Users: {
        screen: UsersStack,
        navigationOptions: {
            tabBarLabel: 'Users',
            tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={30} color={tintColor} />
        }
    },
    ScrollTabBar: {
        screen: ScrollTabBar,
        navigationOptions: {
            tabBarLabel: 'Scroll',
            tabBarIcon: ({ tintColor }) => <Icon name='details' size={30} color={tintColor} />
        }
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Components',
            tabBarIcon: ({ tintColor }) => <Icon name='notifications' size={30} color={tintColor} />
        }
    }
})
