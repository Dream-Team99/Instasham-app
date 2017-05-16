import React, {Component} from 'react';
import {
	View, 
	Text
} from 'react-native';
import moment from 'moment';

export default class Messages extends Component{
	componentDidMount(){
		// This is just to show the updated time since messages where sent
		this.autoUpdate = setInterval(()=>this.forceUpdate(), 60000)
	};
	componentWillUnmount(){
		clearInterval(this.autoUpdate)
	};
	render(){
		// Clone chat array so that 'reverse' won't change the original array
		let chat = [...this.props.chat];
		return(
			<View>
				{chat.reverse().map(message => {
					if(message.senderid === this.props.user.id){
						return (
							<View style={styles.outer} key={message.timestamp}>
								<View style={styles.from}>
									<View style={styles.inner}>
										<Text style={styles.rightAlign}>
											{message.message}
										</Text>
									</View>
								</View>
								<Text style={styles.timestamp}>
									{moment(message.timestamp).fromNow()}
								</Text>
							</View>
						)
					} else {
						return (
							<View style={styles.outer} key={message.timestamp}>
								<View style={styles.to}>
									<View style={[styles.inner, styles.blueBackground]}>
										<Text style={styles.rightAlign}>
                                            {message.message}
                                        </Text>
									</View>
								</View>
								<Text style={[styles.timestamp, styles.rightAlign]}>
									{moment(message.timestamp).fromNow()}
								</Text>
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
		justifyContent: 'flex-end',
		flex: 1	,
		marginLeft: 75	
	},
	inner: {
		backgroundColor: '#f2f2f2',
		flexDirection: 'column',
		elevation: 0.5,
		borderRadius: 5,
		padding: 10,
		paddingRight: 15,
		paddingLeft: 15,
	},
	outer: {
		margin: 10
	},
	blueBackground: {
		backgroundColor: '#3aa6f8'
	},
	rightAlign: {
		textAlign: 'right'
	},
	timestamp: {
		color: '#999',
		fontSize: 12
	},
	from: {
		marginRight: 75,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flex: 1	
	}
};