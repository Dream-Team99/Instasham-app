
import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Header from '../Header-nav'
import Bottom from '../Bottom-nav'
import MainFeed from './subcomponents/MainFeed'


export default class Home extends React.Component {
	render() {
		return (
			<View style={styles.mainfeed}>
				<ScrollView>
				   <MainFeed />
				</ScrollView>
			</View>
		)
	}
}

const styles = {
	mainfeed:{
		flex: 1,
	}
}

