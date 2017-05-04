import React from 'react'
import { View } from 'react-native'
import MainFeed from './subcomponents/MainFeed'


export default class Home extends React.Component {
	render() {
		return (
			<View style={styles.mainfeed}>
				<MainFeed />
			</View>
		)
	}
}

const styles = {
	mainfeed:{
		flex: 1,
	}
}

