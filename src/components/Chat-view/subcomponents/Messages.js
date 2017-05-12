import React, {Component} from 'react'
import {
	View, 
	Text, 
	Image
} from 'react-native'
import moment from 'moment'

export default class Messages extends Component{

	compenentDidMount(){
		// This is just to show the updated time since messages where sent
		this.autoUpdate = setInterval(()=>this.forceUpdate(), 60000)
	}

	componentWillUnmount(){
		clearInterval(this.autoUpdate)
	}

	render(){
		let chat = [...this.props.chat]
		return(
			<View>
				{chat.reverse().map(message => {
					if(message.senderid === this.props.user.id){
						return (
							<View style={styles.from} key={message.timestamp}>
								<View>
									<Text>{message.message}</Text>
									<Text>{moment(message.timestamp).fromNow()}</Text>
								</View>
							</View>
						)
					} else {
						return (
							<View style={styles.to} key={message.timestamp}>
								<View>
									<Text style={styles.toText}>{message.message}</Text>
									<Text style={styles.toText}>{moment(message.timestamp).fromNow()}</Text>
								</View>
							</View>
						)
					}
				})}
			</View>
		)
	}
}

const styles = {
	to: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	toText: {
		textAlign: 'right'
	},
	from: {

	}
}
