import React, {Component} from 'react';
import {Text, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Nav from '../Nav';
import {getProfile, setProfile} from '../../reducers/profileReducer';
import {followerCount} from "../../reducers/followingReducer";
import User from './subcomponents/User-box';
import  Photos from "./subcomponents/User-photos";

class Profile extends Component {
    componentDidMount(){
        this.props.getProfile(this.props.match.params.id);
        this.props.followerCount(this.props.match.params.id);
    }
    componentWillReceiveProps(newProps){
        if(this.props.match.params.id !== newProps.match.params.id) {
            this.props.getProfile(newProps.match.params.id);
            this.props.followerCount(newProps.match.params.id);
        }

    logout() {
        AsyncStorage.removeItem('token').then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <Nav>
                {this.props.currentProfile.profile &&
                <View style={styles.profile}>
                    <ScrollView style={styles.photos}>
                        <User following_count={this.props.following} user={this.props.currentProfile.profile}/>
                        <Photos photos={this.props.currentProfile.photos}/>

                    </ScrollView>
                    {/*<Text onPress={this.logout.bind(this)}>Logout</Text>*/}
                </View>
                }
            </Nav>
        )
    }
}
const styles = StyleSheet.create({
	
});

export default connect( state=>({ 
	mainProfile: state.profileReducer.profile,
    currentProfile: state.profileReducer.currentProfile,
    following: state.followingReducer.profileCount
}), {
	setProfile,getProfile,followerCount

})(Profile)