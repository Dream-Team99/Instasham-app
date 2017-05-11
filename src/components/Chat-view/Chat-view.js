import React, {Component} from 'react'
import {Text, Button} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import io from 'socket.io-client'
import Search from './subcomponents/Search'
import {getMessages} from '../../reducers/chatReducer'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class Chat extends Component{
	constructor(){
		super()
		this.state = {
			showSearch: false
		}
	}

	componentDidMount(){
		// Connect to socket.io
		this.socket = io('http://52.10.128.151:3005', {
		  transports: ['websocket']
		})
		// Join room and listen for new messages
		this.socket.emit('join', this.props.profile.id)
		this.socket.on('newMessage', () => {
			this.props.getMessages(this.props.profile.id)
		})

		this.props.getMessages(this.props.profile.id)
	}

	render(){
		return(
			<Nav>
				<Search 
					hide={()=>this.setState({showSearch: false})} 
					visible={this.state.showSearch} />
				<Button 
					title="new message" 
					onPress={()=>this.setState({showSearch: true})} />
				<Text>{JSON.stringify(this.props.messages)}</Text>
			</Nav>
		)
	}
}

const styles = {
	
}

export default connect( state=>({ 
	profile: state.profileReducer.profile.profile,
	messages: state.chatReducer.messages
}), {
	getMessages
})(Chat)