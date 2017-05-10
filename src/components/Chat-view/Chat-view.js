import React, {Component} from 'react'
import {Text, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import io from 'socket.io-client'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class Chat extends Component{
	componentDidMount(){
		// Connect to socket.io
		this.socket = io('http://192.168.1.128:3000', {
		  transports: ['websocket']
		})
		// Join room and listen for new messages
		this.socket.emit('join', this.props.profile.id)
		this.socket.on('newMessage', () => {
			// this.props.getChats(this.props.profile.id)
		})

		// this.props.getChats(this.props.profile.id)
	}

	render(){
		return(
			<Nav>
				<Button title="Search People" />
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	profile: state.profileReducer.profile
}), {
	// Imported Actions
})(Chat)