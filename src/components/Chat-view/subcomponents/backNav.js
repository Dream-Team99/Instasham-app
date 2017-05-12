import React, {Component} from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class BackNav extends Component{
	render(){
		return(
			<View style={styles.backNav}>
				<TouchableHighlight onPress={this.props.hide}>
					<Ionicons name='ios-arrow-back' style={styles.icon} />
				</TouchableHighlight>
				<Text style={styles.text}>{this.props.text}</Text>
			</View>
		)
	}
}

const styles = {
	backNav: {
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#f2f2f2',
		flexDirection: 'row'
	},
	icon: {
		color: '#262626',
		fontSize: 32,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 25,
		paddingLeft: 15
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#262626'
	}
}