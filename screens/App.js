import React from 'react'
import { Router } from '../config/router'

export default class App extends React.Component {
    render() {
        return (
            <Router screenProps={{ rootNavigation: this.props.navigation }} />
        )
    }
}
