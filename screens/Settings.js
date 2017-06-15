import React from 'react'
import { Text, View, StyleSheet, Platform, Picker, AppState,
        PushNotificationIOS, Alert, TouchableHighlight, Slider,
        StatusBar, Switch, Button, DatePickerIOS, ScrollView, Modal, AsyncStorage } from 'react-native'
import PushController from './PushController'
import PushNotification from 'react-native-push-notification'
import { NavigationActions } from 'react-navigation'

export default class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            seconds: 5,
            sliderValue: 50,
            switchValue: false,
            date: new Date(),
            showModal: false
        }
    }

    componentDidMount() {
        // AppState.addEventListener('change', this.handleAppStateChange)
        console.log('Settings props', this.props)
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change', this.handleAppStateChange)
    }

    handleRegister = (token) => {
        console.log('token', token)
    }

    handleAppStateChange = (appState) => {
        if(appState === 'background') {
            PushNotification.localNotificationSchedule({
                message: 'Объявлены итоги по тендеру №1000123',
                date: new Date(this.state.date),
                number: 0
            })
        }
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Choose your notification time in seconds, Arman</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.value}
                    onValueChange={(value) => this.setState({value})}>
                    <Picker.Item
                        label='5'
                        value={5}
                     />
                     <Picker.Item
                         label='10'
                         value={10}
                      />
                      <Picker.Item
                          label='15'
                          value={15}
                       />
                </Picker>
                <TouchableHighlight onPress={this.showAlert}>
                    <Text>Show alert</Text>
                </TouchableHighlight>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={this.state.sliderValue}
                    minimumTrackTintColor={'#123123'}
                    onValueChange={this.handleSlider}
                 />
                 <Text>{this.state.sliderValue}</Text>
                 <View style={styles.option}>
                    <Text>Turn on</Text>
                    <Switch
                        value={this.state.switchValue}
                        onValueChange={() => this.setState({switchValue: !this.state.switchValue})}
                     />
                 </View>
                 <Text>Switch is {this.state.switchValue ? `on` : `off`}</Text>
                 <Button
                  onPress={this.showModal}
                  title="Show modal"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
                <DatePickerIOS
                    style={styles.datePicker}
                    date={this.state.date}
                    mode='datetime'
                    onDateChange={(date) => {
                        this.setState({ date })
                        console.log(this.state.date.getTime() - Date.now())
                    }}
                />
                <Modal
                      animationType={'slide'}
                      transparent={false}
                      visible={this.state.showModal}
                      onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>This is a modal</Text>
                            <Button
                                onPress={this.closeModal}
                                title='Close modal'
                             />
                         </View>
                    </View>
                </Modal>
                <Text>{this.state.date.toString()}</Text>
                <Button
                    onPress={this.handleSignout}
                    title='Sign out'
                    color='#8aa584'
                />
                <PushController />
            </ScrollView>
        )
    }


    handleSignout = () => {
        this.props.navigation.goBack()
        this.signout()
    }

    async signout() {
        try {
            await AsyncStorage.removeItem('token')
        } catch(error) {
            console.log(error)
        }
    }

    closeModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleSlider = (sliderValue) => {
        this.setState({
            sliderValue
        })
    }
    handlePickerChange = (item) => {
        this.setState({
            value: item
        })
    }
    showAlert = () => {
        Alert.alert(
            'Alert title',
            `${this.state.sliderValue}`,
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    picker: {
        width: '100%'
    },
    slider: {
        width: '100%'
    },
    option: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: 'white'
    },
    datePicker: {
        width: '100%'
    }
})
