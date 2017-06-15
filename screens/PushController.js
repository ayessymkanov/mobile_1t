import React from 'react'
import PushNotification from 'react-native-push-notification'

export default class PushController extends React.Component {

    componentDidMount() {
        PushNotification.configure({
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },
            onNotification: function(notification) {
                console.log('NOTIFICATION:', notification )
            },
            requestPermissions: true
        })
    }

    render() {
        return (
            null
        )
    }
}
