import React from 'react'
import { Text, FlatList, TouchableHighlight, StyleSheet, ActivityIndicator, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest()
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`
        this.setState({ loading: true })
        fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res.result)
            this.setState({
                data: page === 1 ? res.results : [...this.state.data, ...res.results],
                error: res.error || null,
                loading: false,
                refreshing: false
            })
        })
        .catch(error => {
            this.setState({ error, loading: false, refreshing: false });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                onPress={() => this.viewUserDetails(item)}
                                roundAvatar
                                title={`${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`}
                                subtitle={item.email}
                                avatar={{uri: item.picture.thumbnail}}
                             />
                        )}
                        keyExtractor={item => item.email}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                     />
                </List>
            </View>
        )
    }

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1
        }, () => {
            this.makeRemoteRequest()
        })
    }

    viewUserDetails(item) {
        this.props.navigation.navigate('UserDetails', item)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    list: {
        marginTop: -5,
        backgroundColor: 'white'
    },
    loader: {
        alignSelf: 'center'
    }
})
