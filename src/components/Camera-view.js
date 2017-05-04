import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Camera extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Text>Camera Route</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})