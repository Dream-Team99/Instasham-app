import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native'
import axios from "axios";
import Link from "react-router-native/Link";

export default class Profiles extends Component{
	constructor(){
		super();
		this.state = {
			isFollowing: []
		}
	}

	addFollower(id, follower){
		axios.post(`http://52.10.128.151:3005/api/users/follower`, {userId: id, followerId: follower}).then((res)=>{
            this.checkFollower.call(this, id)
		});
	}
	checkFollower(id){
		axios.get(`http://52.10.128.151:3005/api/users/follower/${id}`).then((res)=>{
			this.setState({
				isFollowing: res.data
			})
		})
	}
	// deleteFollower(id, follower){
     //    axios.post(`http://52.10.128.151:3005/api/users/follower/delete`, {userId: id, followerId: follower}).then((res)=>{
     //        this.setState({
     //            isFollowing: res.data
     //        })
     //    })
	// }
	componentDidMount(){
        this.checkFollower(this.props.currentUser.id);
	}

	renderProfiles(){
        const filteredUsers = this.props.users.filter(val => val.id !== this.props.currentUser.id);
		return filteredUsers.map((p,i) => {
			return (
					<View style={styles.fullProfile} key={i}>
							<View style={styles.profileImageAndName}>
								<Link to={"/Profile/" + p.id}><Image style={styles.image} source={{uri: p.imageurl}} /></Link>
							</View>

                    <Link to={"/Profile/" + p.id}><Text style={styles.name}>{p.username}</Text></Link>

						{this.state.isFollowing.indexOf(p.id) === -1 &&
						<View style={styles.follow}>
							<TouchableHighlight onPress={this.addFollower.bind(this, this.props.currentUser.id, p.id)}><Text style={{color:"white",textAlign: 'center',}}>Follow</Text></TouchableHighlight>
						</View>
						}
                        {this.state.isFollowing.indexOf(p.id) !== -1 &&

						<View style={styles.unfollow}>
							<TouchableHighlight ><Text style={{color:"black",textAlign: 'center',}}>Following</Text></TouchableHighlight>
						</View>
                        }

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
        justifyContent: 'space-between',
		alignItems:"center",
		padding:5
	},
	profileImageAndName:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	name: {
		fontSize: 16,
		textAlign: 'center',
	},
	image:{
		width: 50,
		height: 50,
		borderRadius: 40
	},
	follow:{
		backgroundColor:"#3897f0",
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:17,
		paddingRight:17,
        borderRadius: 5
    },
    unfollow:{
        backgroundColor:"#fefefe",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        borderRadius: 5,
		borderColor:"black",
		borderWidth:2
	}
});
