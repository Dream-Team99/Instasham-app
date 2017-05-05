import React, {Component} from 'react'
import {Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {ImagePicker} from 'expo'
import Nav from '../Nav'

class Camera extends Component{
	takePic(){
		ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [1, 1]
		}).then(image => {
			console.log(image)
		})
	}

	render(){
		return(
			<Nav>
				<Text>Camera Route</Text>
				<Button 
					onPress={this.takePic}
					title='Take a Picture' />
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	// Imported Actions
})(Camera)