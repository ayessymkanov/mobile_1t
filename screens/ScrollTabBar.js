import React from 'react'
import { StyleSheet, StatusBar, View, Text, ScrollView } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Following from './scroll-tabs/Following'
import You from './scroll-tabs/You'

export default class ScrollTabBar extends React.Component {
    render() {
        return (
                <ScrollableTabView
                    style={styles.tabBar}
                    renderTabBar={() => <DefaultTabBar backgroundColor='coral'/>}
                    >
                    <Following tabLabel='Following' />
                    <You tabLabel='You' />
                </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    tabBar: {
        marginTop: 20
    },
    statusBar: {
        height: 20,
        backgroundColor: 'rgba(10, 150, 255, 0.7)'
    }
})
