import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import { MainStack } from './config/router'

export default class mobile_1t extends Component {
    render() {
        return (
            <MainStack />
        )
    }
}

AppRegistry.registerComponent('mobile_1t', () => mobile_1t)
