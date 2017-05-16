import React, {Component} from 'react';
import {Text,TouchableHighlight, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Nav from '../Nav';
import Link from "react-router-native/Link";
import { Ionicons } from '@expo/vector-icons'
import {getProfile} from '../../reducers/profileReducer';
import {followerCount, passHistory} from "../../reducers/followingReducer";
import User from './subcomponents/User-box';
import  Photos from "./subcomponents/User-photos";

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile(this.props.match.params.id);
        this.props.followerCount(this.props.match.params.id);
        this.props.passHistory(this.props.history)
    }
    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.props.getProfile(newProps.match.params.id);
            this.props.followerCount(newProps.match.params.id);
        }
    }
    logout(){
        AsyncStorage.removeItem('token').then(() => {
            this.props.history.push('/')
        })
    }
    render() {
            if(this.props.currentProfile.profile === null) return null
        return (
            <Nav>

                    <View style={styles.profile}>
                        <ScrollView style={styles.photos}>
                            <User following_count={this.props.following.profileCount} mainProfile={this.props.mainProfile}  user={this.props.currentProfile.profile}/>
                            {this.props.currentProfile.photos.length > 0 &&
                                <Photos photos={this.props.currentProfile.photos}/>
                            }
                            {this.props.currentProfile.photos.length < 1 &&
                                <View style={styles.outerNoFollowers}>
                                    <View style={styles.noFollowersView}>
                                        <Link to="/Camera" underlayColor="transparent" >
                                            <Ionicons underlayColor="grey" name='ios-add-circle-outline' size={52} color='black'/>
                                        </Link>
                                        <Text style={styles.noFollowerstext}>
                                            When you share photos and videos, they'll appear on your profile.
                                        </Text>
                                    </View>
                                </View>
                            }
                            {this.props.mainProfile.id === this.props.currentProfile.profile.id &&
                                <TouchableHighlight style={styles.logout} onPress={this.logout.bind(this)}>
                                    <Text style={{color: "grey", textAlign: 'center',}}>
                                        Logout
                                    </Text>
                                </TouchableHighlight>
                            }
                        </ScrollView>
                    </View>

            </Nav>
        )
    }
}
const styles = StyleSheet.create({
    logout:{
        marginTop:20,
        backgroundColor:"#ffffff",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:17,
        paddingRight:17,
        borderRadius: 5,
        borderWidth:2,
        borderColor:"black",
    },
    outerNoFollowers:{
        alignSelf:"center",
    },
    noFollowersView:{
        marginTop:20,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 70,
        borderWidth:2,
        borderColor:"black",
        backgroundColor:"white",
        height:260,
        width:260
    },
    noFollowerstext:{
        color:"grey",
        marginTop:5,
        padding:10,
        fontSize:20,
    }
});
export default connect( state=>({ 
	mainProfile: state.profileReducer.profile.profile,
    currentProfile: state.profileReducer.currentProfile,
    following: state.followingReducer
}), {
	getProfile,followerCount, passHistory
})(Profile)