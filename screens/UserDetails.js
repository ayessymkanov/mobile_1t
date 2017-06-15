import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import _ from 'lodash'

export default class UserDetails extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name.first.toUpperCase()
    })
    render() {
        console.log(this.props.navigation)
        const { picture: { large }, name: { first, last }, dob, cell, email, location: { city, street } } = this.props.navigation.state.params
        console.log(large)
        return (
            <ScrollView style={styles.container}>
                <Image
                    style={styles.img}
                    source={{uri: large}}
                 />
                 <View style={styles.field}>
                    <Text style={styles.muted}>Name</Text>
                    <Text>{`${_.capitalize(first)} ${_.capitalize(last)}`}</Text>
                 </View>
                 <View style={styles.field}>
                    <Text style={styles.muted}>Date of Birth</Text>
                    <Text>{`${dob}`}</Text>
                 </View>
                 <View style={styles.contactInfo}>
                     <Text style={styles.contactInfoTitle}>Contact information</Text>
                     <View style={styles.contactInfoField}>
                        <Text style={styles.muted}>Phone number</Text>
                        <Text>{cell}</Text>
                     </View>
                     <View style={styles.contactInfoField}>
                        <Text style={styles.muted}>Email</Text>
                        <Text>{email}</Text>
                     </View>
                     <View style={styles.contactInfoField}>
                        <Text style={styles.muted}>Address</Text>
                        <Text>{`${_.capitalize(city)}, ${_.capitalize(street)}`}</Text>
                     </View>
                 </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: '100%',
        height: 200
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 5,
        backgroundColor: 'white',
    },
    muted: {
        color: '#aaa'
    },
    contactInfo: {
        marginTop: 15,
        paddingTop: 10,
        backgroundColor: 'white'
    },
    contactInfoTitle: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    contactInfoField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 2
    }
})
