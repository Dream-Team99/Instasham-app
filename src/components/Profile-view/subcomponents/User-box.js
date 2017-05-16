import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,TouchableHighlight} from 'react-native';
import {Link} from  'react-router-native';
import axios from "axios";

export default class User extends Component{
    constructor(){
        super();
        this.state = {
            isFollowing: []
        }
    };
    addFollower(id, follower){
        axios.post(`http://52.10.128.151:3005/api/users/follower`, {userId: id, followerId: follower}).then((res)=>{
            this.checkFollower.call(this, id)
        });
    };
    checkFollower(id){
        axios.get(`http://52.10.128.151:3005/api/users/follower/${id}`).then((res)=>{
            this.setState({
                isFollowing: res.data.filter((val)=>{
                    return val.id !== this.props.mainProfile.id
                })
            })
        })
    };
    deleteFollower(id, follower){
       axios.post(`http://52.10.128.151:3005/api/users/follower/delete`, {userId: id, followerId: follower}).then((res)=>{
           this.checkFollower.call(this, id)
       })
    };
    componentDidMount(){
        this.checkFollower(this.props.mainProfile.id);
    };
    render(){
        return(
                <View style={styles.pageView}>
                    <View style={styles.profileImageAndName}>
                        <Image style={styles.image} source={{uri: this.props.user.imageurl}} />
                        <Text style={styles.name}>
                            {this.props.user.username}
                            </Text>
                    </View>
                    <View style={styles.linksView}>
                        <View style={styles.links}>
                            <Link>
                                <Text>
                                    {this.props.following_count.post_count}
                                </Text>
                            </Link>
                            <Link style={styles.posts}>
                                <Text>
                                    posts
                                </Text>
                            </Link>
                        </View>
                        <View style={styles.links}>
                            <Link>
                                <Text>
                                    {this.props.following_count.follower_count}
                                </Text>
                            </Link>
                            <Link style={styles.posts}>
                                <Text>
                                    followers
                                </Text>
                            </Link>
                        </View>
                        <View style={styles.links}>
                            <Link>
                                <Text>
                                    {this.props.following_count.following_count}
                                </Text>
                            </Link>
                            <Link style={styles.posts}>
                                <Text>
                                    following
                                </Text>
                            </Link>
                        </View>
                     </View>
                    {this.state.isFollowing.indexOf(this.props.user.id) === -1 &&
                        this.props.mainProfile.id !== this.props.user.id &&
                        <View style={styles.follow}>
                            <TouchableHighlight underlayColor="transparent" onPress={this.addFollower.bind(this, this.props.mainProfile.id, this.props.user.id)}>
                                <Text style={{color:"white",textAlign: 'center',}}>
                                    Follow
                                </Text>
                            </TouchableHighlight>
                        </View>
                    }
                    {this.state.isFollowing.indexOf(this.props.user.id) !== -1 &&
                        this.props.mainProfile.id !== this.props.user.id &&
                        <View style={styles.unfollow}>
                            <TouchableHighlight underlayColor="transparent" onPress={this.deleteFollower.bind(this, this.props.mainProfile.id, this.props.user.id)}>
                                <Text style={{color:"black",textAlign: 'center',}}>
                                    Unfollow
                                </Text>
                            </TouchableHighlight>
                        </View>
                    }
                 </View>
        )
    }
}

const styles = StyleSheet.create({
    pageView:{
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#919191',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    profileImageAndName:{
        flexDirection: 'column',
    },
    name: {
        fontSize: 14,
    },
    image:{
        width: 90,
        height: 90,
        borderRadius: 50
    },
    linksView:{
        flexDirection: 'row',
        alignItems:"center"

    },
    links:{
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems:"center"
    },
    posts:{
        marginLeft:5,
        marginRight: 5
    },
    follow:{
        backgroundColor:"#3897f0",
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:12,
        paddingRight:12,
        borderRadius: 5
    },
    unfollow:{
        backgroundColor:"#fefefe",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5,
        borderRadius: 5,
        borderColor:"black",
        borderWidth:1
    }
});