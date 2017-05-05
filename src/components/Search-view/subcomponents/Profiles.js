import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import ProfileDetail from './ProfileDetail'

export default class Profiles extends Component{
	renderProfiles(){
		const filteredUsers = this.props.users.filter(val => val.id !== this.props.currentUser.id)
		return filteredUsers.map((p,i) => {
			return <ProfileDetail key={i}>
						<View style={styles.fullProfile}>
							<View style={styles.profileImageAndName}>
								<Image style={styles.image} source={{uri: p.imageurl}} />
								<Text style={styles.name}>{p.username}</Text>
							</View>
						</View>
					</ProfileDetail>
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
