import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'

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
	}

	mostRecent(messages){
		let mostRecent = messages.sort((a, b) => {
			return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1
		})[0]
		mostRecent = {...mostRecent}
		mostRecent.timestamp = moment(mostRecent.timestamp).fromNow()
		if(mostRecent.message.length > 50){
			mostRecent.message = mostRecent.message.slice(0, 50) + '.....'
		}
		return mostRecent
	}

	render(){
		return(
			<View style={styles.container}>
				<Image source={{uri: this.state.user.imageurl}} style={styles.image} />
				<View style={styles.info}>
					<Text style={styles.name}>{this.state.user.username}</Text>
					<Text>{this.mostRecent(this.props.messages).message}</Text>
					<Text style={styles.timestamp}>{this.mostRecent(this.props.messages).timestamp}</Text>
				</View>
			</View>
		)
	}
}

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

export default connect( state=>({ 
	
}), {
	
})(ChatPreview)