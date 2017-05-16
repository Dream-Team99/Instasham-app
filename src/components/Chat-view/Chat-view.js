import React, {Component} from 'react';
import {Text, Button, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Nav from '../Nav';
import io from 'socket.io-client';
import Search from './subcomponents/Search';
import {getMessages} from '../../reducers/chatReducer';
import ChatPreview from './subcomponents/ChatPreview';
import ChatWith from './subcomponents/Chat';
import {showSearch} from '../../reducers/modalDuck';

console.ignoredYellowBox = ['Setting a timer for a long period of time'];

class Chat extends Component{
	componentDidMount(){
		// Connect to socket.io
		this.socket = io('http://52.10.128.151:3005', {
		  transports: ['websocket']
		});
		// Join room and listen for new messages
		this.socket.emit('join', this.props.profile.id);
		this.socket.on('newMessage', () => {
			this.props.getMessages(this.props.profile.id)
		});

		this.props.getMessages(this.props.profile.id)
	};

	componentWillUnmount(){
		this.socket.disconnect()
	};

	renderChatPreviews(messages){
		let ChatPreviews = [];
		// Put objects into an array
		for(var prop in messages){
			ChatPreviews.push({
				key: prop,
				mostRecent: messages[prop][0]
			})
		}
		// No messages, message
		if(ChatPreviews.length === 0){
			return <Text style={styles.noMessages}>No messages to show. Tap 'New Message' to start chatting with a friend.</Text>
		}
		// Sort array by most timestamp of most recent message and map out elements
		return ChatPreviews.sort((a, b) => {
			return new Date(a.mostRecent.timestamp) > new Date(b.mostRecent.timestamp) ? -1 : 1
		}).map((chat) => {
			return <ChatPreview key={chat.key} mostRecent={chat.mostRecent} id={chat.key} />
		})
	};

	render(){
		return(
			<Nav>
				<ChatWith />
				<Search />
				<Button 
					title="new message" 
					onPress={this.props.showSearch} />
				<ScrollView style={styles.messages}>
					{this.renderChatPreviews(this.props.messages)}
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
};
export default connect( state=>({ 
	profile: state.profileReducer.profile.profile,
	messages: state.chatReducer.messages,
	chatid: state.modalDuck.chatid
}), {
	getMessages, showSearch
})(Chat);