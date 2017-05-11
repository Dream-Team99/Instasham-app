import React, {Component} from 'react'
import {Text, Button, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import io from 'socket.io-client'
import Search from './subcomponents/Search'
import {getMessages} from '../../reducers/chatReducer'
import ChatPreview from './subcomponents/ChatPreview'
import ChatWith from './subcomponents/Chat'

console.ignoredYellowBox = ['Setting a timer for a long period of time']

class Chat extends Component{
	constructor(){
		super()
		this.state = {
			showSearch: false,
			showChat: false,
			chatid: null
		}

		this.openChat = this.openChat.bind(this)
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

	componentWillUnmount(){
		this.socket.disconnect()
	}

	renderChatPreviews(messages, openChatFn){
		let ChatPreviews = []
		for(var prop in messages){
			return <ChatPreview key={prop} openChat={openChatFn} messages={messages[prop]} id={prop} />
		}
		if(ChatPreviews.length === 0){
			return <Text style={styles.noMessages}>No messages to show. Tap 'New Message' to start chatting with a friend.</Text>
		}
		return ChatPreviews
	}

	openChat(id){
		this.setState({
			chatid: id,
			showChat: true,
			showSearch: false
		})
	}

	render(){
		return(
			<Nav>
				<ChatWith 
					id={this.state.chatid}
					hide={()=>this.setState({showChat: false})} 
					visible={this.state.showChat} />
				<Search 
					openChat={this.openChat}
					hide={()=>this.setState({showSearch: false})} 
					visible={this.state.showSearch} />

				<Button 
					title="new message" 
					onPress={()=>this.setState({showSearch: true})} />
				<ScrollView style={styles.messages}>
					{this.renderChatPreviews(this.props.messages, this.openChat)}
				</ScrollView>
			</Nav>
		)
	}
}

const styles = {
	messages: {
		marginTop: 5
	},
	noMessages: {
		color: '#999',
		textAlign: 'center',
		padding: 20,
		fontSize: 16
	}
}

export default connect( state=>({ 
	profile: state.profileReducer.profile.profile,
	messages: state.chatReducer.messages
}), {
	getMessages
})(Chat)