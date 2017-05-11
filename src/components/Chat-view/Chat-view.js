import React, {Component} from 'react'
import {Text, Button} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import io from 'socket.io-client'
import Search from './subcomponents/Search'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class Chat extends Component{
	componentDidMount(){
		// Connect to socket.io
		this.socket = io('http://52.10.128.151:3005', {
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
				<Search />
			</Nav>
		)
	}
}

const styles = {
	
}

export default connect( state=>({ 
	profile: state.profileReducer.profile
}), {
	// Imported Actions
})(Chat)