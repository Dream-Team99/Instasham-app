import React, {Component} from 'react'
import {
	View, 
	TextInput, 
	Text, 
	Image, 
	Button, 
	ScrollView,
	Modal
} from 'react-native'
import {connect} from 'react-redux'
import BackNav from './backNav'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import moment from 'moment'

class Chat extends Component{
	constructor(){
		super()
		this.state = {
			message: '',
			user: {}
		}
	}

	componentDidMount(){
		// This is just to show the updated time since messages where sent
		this.autoUpdate = setInterval(()=>this.forceUpdate(), 60000)
	}

	componentWillUnmount(){
		clearInterval(this.autoUpdate)
	}

	loadUser(){
		axios.get('http://52.10.128.151:3005/api/chat/findUser/' + this.props.id).then(response => {
			this.setState({user: response.data})
		})
	}

	render(){
		let thisChat = this.props.messages[this.props.id]
		return(
			<Modal 
				visible={this.props.visible}
				animationType="slide"
				onShow={this.loadUser.bind(this)}
				style={styles.search}
				onRequestClose={this.props.hide}>
				<BackNav hide={this.props.hide} />
	      <ScrollView>
		      <Text>{JSON.stringify(thisChat)}</Text>
	      </ScrollView>
	      <TextInput 
					style={styles.input}
					onChangeText={(text) => this.setState({message: text})}
	        value={this.state.message} />
	        <Ionicons name='md-send' style={styles.icon} />
			</Modal>
		)
	}
}

const styles = {
	input: {
		padding: 10,
		fontSize: 16
	},
	icon: {
		color: '#0066ff',
		fontSize: 32,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	}
}

export default connect( state=>({ 
	messages: state.chatReducer.messages
}), {
	
})(Chat)


// import React, {Component} from 'react'
// import {View, Image, Text, TouchableHighlight} from 'react-native'
// import {connect} from 'react-redux'
// import axios from 'axios'
// import moment from 'moment'

// class ChatPreview extends Component{
// 	constructor(){
// 		super()

// 		this.state = {
// 			user: {}
// 		}
// 	}

// 	componentDidMount(){
// 		axios.get('http://52.10.128.151:3005/api/chat/findUser/' + this.props.id).then(response => {
// 			this.setState({user: response.data})
// 		})
// 		// This is just to show the updated time since messages where sent
// 		this.autoUpdate = setInterval(()=>this.forceUpdate(), 60000)
// 	}

// 	componentWillUnmount(){
// 		clearInterval(this.autoUpdate)
// 	}

// 	mostRecent(messages){
// 		let mostRecent = messages.sort((a, b) => {
// 			return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1
// 		})[0]
// 		mostRecent = {...mostRecent}
// 		mostRecent.timestamp = moment(mostRecent.timestamp).fromNow()
// 		if(mostRecent.message.length > 50){
// 			mostRecent.message = mostRecent.message.slice(0, 50) + '.....'
// 		}
// 		return mostRecent
// 	}

// 	render(){
// 		return(
// 			<TouchableHighlight 
// 				underlayColor="#f2f2f2" 
// 				onPress={()=>this.props.openChat(this.props.id)}>
// 				<View style={styles.container}>
// 					<Image source={{uri: this.state.user.imageurl}} style={styles.image} />
// 					<View style={styles.info}>
// 						<Text style={styles.name}>{this.state.user.username}</Text>
// 						<Text>{this.mostRecent(this.props.messages).message}</Text>
// 						<Text style={styles.timestamp}>{this.mostRecent(this.props.messages).timestamp}</Text>
// 					</View>
// 				</View>
// 			</TouchableHighlight>
// 		)
// 	}
// }

// const styles = {
// 	image: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		marginRight: 10
// 	},
// 	container: {
// 		flexDirection: 'row',
// 		padding: 10,
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#f2f2f2'
// 	},
// 	info: {
// 		flex: 1
// 	},
// 	timestamp: {
// 		textAlign: 'right',
// 		fontSize: 12,
// 		color: '#999'
// 	},
// 	name: {
// 		fontWeight: 'bold'
// 	}
// }

// export default connect( state=>({ 
	
// }), {
	
// })(ChatPreview)