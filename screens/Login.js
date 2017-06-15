import React from 'react'
import { TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableHighlight, Text, Image, ActivityIndicator, AsyncStorage } from 'react-native'
import axios from 'axios'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        this.redirect()
    }

    async redirect() {
        try {
            const token = await AsyncStorage.getItem('token')
            if(token) {
                this.props.navigation.navigate('App')
            }
        } catch(error) {
            console.log(error)
        }
    }

    login = () => {
        this.setState({
            loading: true
        })
        axios.post('localhost:3090/signin', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                loading: false
            })
            console.log(this.state)
            console.log(response)
            this.props.navigation.navigate('App')
        })
        .catch(err => {
            this.setState({
                error: true,
                loading: false
            })
        })
    }

    render() {
        return (
            <Image source={require('../assets/bg.jpg')} style={styles.bg}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                >
                <View style={styles.logo}>
                    <Text style={styles.logoText}>Hello world</Text>
                </View>
                {this.state.error && <Text style={styles.errorMsg}>Wrong email or password. Please try again</Text>}
                {this.state.loading && <ActivityIndicator size={0} />}
                {!this.state.loading && <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='Password'
                        ref={(input) => this.passwordInput = input}
                        returnKeyType='go'
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                     />
                    <TouchableHighlight
                        style={styles.submitBtn}
                        underlayColor='#4c7593'
                        onPress={this.handleSubmit}
                        >
                        <Text style={styles.submitText}>Login</Text>
                    </TouchableHighlight>
                </View>}
            </KeyboardAvoidingView>
            </Image>
        )
    }
    handleSubmit = () => {
        this.setState({
            loading: true
        })
        axios.post('http://localhost:3090/signin', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            this.setState({
                loading: false
            })
            this.setToken(response.data.token)
            console.log(this.state)
            console.log(response)
            this.props.navigation.navigate('App')
        })
        .catch(err => {
            this.setState({
                error: true,
                loading: false
            })
            console.log('error axios', err)
        })
    }

    async setToken(token) {
        await AsyncStorage.setItem('token', token)
    }

    handleEmail = (value) => {
        console.log('handling email', value)
        this.setState({
            email: value
        })
    }
    handlePassword = (value) => {
        console.log('handling password', value)
        this.setState({
            password: value
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    submitBtn: {
        width: '100%',
        padding: 10,
        backgroundColor: '#003B65',
        marginBottom: 20
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    bg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    errorMsg: {
        color: '#E2211D',
        fontSize: 14,
        marginBottom: 20,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
