import React, {Component} from 'react'
import {View, Image, Text, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import {showChat} from '../../../reducers/modalDuck'

class ChatPreview extends Component{
	constructor(){
		super()

		this.state = {
			user: {}
		}
	}

	componentDidMount(){
		axios.get('http://52.10.128.151:3005/api/chat/findUser/' + this.props.id).then(response => {
			this.setState({user: response.data})
		})
		// This is just to show the updated time since messages where sent
		this.autoUpdate = setInterval(()=>this.forceUpdate(), 60000)
	}

	componentWillUnmount(){
		clearInterval(this.autoUpdate)
	}

	mostRecent(messages){
		let mostRecent = {...messages[0]}
		mostRecent.timestamp = moment(mostRecent.timestamp).fromNow()
		if(mostRecent.message.length > 50){
			mostRecent.message = mostRecent.message.slice(0, 50) + '.....'
		}
		return mostRecent
	}

	render(){
		return(
			<TouchableHighlight 
				underlayColor="#f2f2f2" 
				onPress={()=>this.props.showChat(this.props.id)}>
				<View style={styles.container}>
					<Image source={{uri: this.state.user.imageurl}} style={styles.image} />
					<View style={styles.info}>
						<Text style={styles.name}>{this.state.user.username}</Text>
						<Text>{this.mostRecent(this.props.messages).message}</Text>
						<Text style={styles.timestamp}>{this.mostRecent(this.props.messages).timestamp}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default connect( state=>({ 
	
}), {
	showChat
})(ChatPreview)

const styles = {
	image: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10
	},
	container: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2'
	},
	info: {
		flex: 1
	},
	timestamp: {
		textAlign: 'right',
		fontSize: 12,
		color: '#999'
	},
	name: {
		fontWeight: 'bold'
	}
}
