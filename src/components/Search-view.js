import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Search extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Text>Search Route</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})