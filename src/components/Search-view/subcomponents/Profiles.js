import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native'
import axios from "axios";

export default class Profiles extends Component{

	addFollower(id, follower){
		axios.post(`http://52.10.128.151:3005/api/users/follower`, {userId: id, followerId: follower})
	}
	renderProfiles(){
		const filteredUsers = this.props.users.filter(val => val.id !== this.props.currentUser.id);
		console.log(filteredUsers.length)
		return filteredUsers.map((p,i) => {
			return (
					<View style={styles.fullProfile} key={i}>
							<View style={styles.profileImageAndName}>
								<Image style={styles.image} source={{uri: p.imageurl}} />
								<Text style={styles.name}>{p.username}</Text>
								<TouchableHighlight onPress={this.addFollower.bind(null, this.props.currentUser.id, p.id)}><Text>Follow</Text></TouchableHighlight>
							</View>
					</View>
			)
			})
	}

	render(){
        return (
			<View style={styles.pageView}>
				{this.renderProfiles()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	pageView:{
	},
	fullProfile:{
		flexDirection: 'row',
	},
	profileImageAndName:{
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	name: {
		fontSize: 14,
		textAlign: 'center',
	},
	image:{
		width: 75,
		height: 75,
		borderRadius: 40
	}
})
