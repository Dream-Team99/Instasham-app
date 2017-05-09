import React, {Component} from 'react';
import {Text, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Nav from '../Nav';
import {getProfile} from '../../reducers/profileReducer';
import {followerCount} from "../../reducers/followingReducer";
import User from './subcomponents/User-box';
import  Photos from "./subcomponents/User-photos";

class Profile extends Component {
    componentWillMount() {
        // console.log(this.props.history.location.pathname)
        this.props.getProfile(this.props.match.params.id)
    }

    componentDidMount(){
        // followerCount(this.props.match.params.id)
    }
    // logout() {
    //     AsyncStorage.removeItem('token').then(() => {
    //         this.props.history.push('/')
    //     })
    // }

    render() {
        return (
            <Nav>
                <View style={styles.profile}>
                    <ScrollView style={styles.photos}>
                        <User user={this.props.history.location.pathname === '/Profile/' + this.props.mainProfile.profile.id ? this.props.mainProfile.profile : this.props.currentProfile.profile}/>
                        <Photos photos={this.props.history.location.pathname === '/Profile/' + this.props.mainProfile.profile.id ? this.props.mainProfile.photos : this.props.currentProfile.photos}/>
                    </ScrollView>
                    <Text onPress={this.logout.bind(this)}>Logout</Text>
                </View>
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
	getProfile,followerCount

})(Profile)


