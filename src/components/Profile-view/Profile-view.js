import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'

class Profile extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Text>Profile Route</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

function mapStateToProps(state) {
	return{
		state: state
	}
}

export default connect(mapStateToProps)(Profile)


