import React, {Component} from 'react'
import { View, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class BackNav extends Component{
	render(){
		return(
			<View style={styles.backNav}>
				<TouchableHighlight onPress={this.props.hide}>
					<Ionicons name='ios-arrow-back' style={styles.icon} />
				</TouchableHighlight>
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
		paddingRight: 15,
		paddingLeft: 15
	}
}