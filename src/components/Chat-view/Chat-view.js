import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Chat extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Text>Chat Route</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})