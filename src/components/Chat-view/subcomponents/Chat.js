import React, {Component} from 'react'
import {
	View, 
	TextInput, 
	TouchableHighlight, 
	ScrollView,
	Modal
} from 'react-native'
import {connect} from 'react-redux'
import BackNav from './BackNav'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import {sendMessage} from '../../../reducers/chatReducer'
import Messages from './Messages'
import {hideChat} from '../../../reducers/modalDuck'

class Chat extends Component{
	constructor(){
		super()
		this.state = {
			message: '',
			user: {}
		}
	}

	loadUser(){
		axios.get('http://52.10.128.151:3005/api/chat/findUser/' + this.props.chatid).then(response => {
			this.setState({user: response.data})
		})
	}

	render(){
		let thisChat = this.props.messages[this.props.chatid]
		return(
			<Modal 
				visible={this.props.showChat}
				animationType="slide"
				onShow={this.loadUser.bind(this)}
				style={styles.search}
				onRequestClose={this.props.hideChat}>
				<BackNav text={'Chat with ' + this.state.user.username} hide={this.props.hideChat} />
	      <ScrollView 
	      	ref="scrollView"
	      	onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}>
	      {thisChat && this.state.user.id &&
		      <Messages chat={thisChat} user={this.state.user} />
	      }
	      </ScrollView>
	      <View style={styles.textBox}>
	      	<TouchableHighlight 
	      		underlayColor="transparent"
	      		onPress={()=>{
	      			if(this.state.message){
			      		this.props.sendMessage(this.props.profile.id, this.props.chatid, this.state.message)
			      		this.setState({message: ''})
			      	}
	      		}}>
		      	<Ionicons name='md-send' style={styles.icon} />
	      	</TouchableHighlight>
		      <TextInput 
		      	autoCapitalize="sentences"
						style={styles.input}
						onChangeText={(text) => this.setState({message: text})}
		        value={this.state.message} />
	      </View>
			</Modal>
		)
	}
}

const styles = {
	input: {
		fontSize: 16,
		flex: 1,
		padding: 5
	},
	icon: {
		color: '#098ff6',
		fontSize: 32,
		padding: 10,
		paddingBottom: 0,
		paddingTop: 5
	},
	textBox: {
		backgroundColor: '#f2f2f2',
		flexDirection: 'row',
		padding: 5,
		elevation: 2
	}
}

export default connect( state=>({ 
	profile: state.profileReducer.profile.profile,
	messages: state.chatReducer.messages,
	showChat: state.modalDuck.showChat,
	chatid: state.modalDuck.chatid
}), {
	sendMessage, hideChat
})(Chat)
