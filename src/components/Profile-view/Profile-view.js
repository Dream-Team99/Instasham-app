import React, {Component} from 'react'
import {Text, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import {followerCount} from "../../reducers/followingReducer"
import User from './subcomponents/User-box'
import  Photos from "./subcomponents/User-photos"

class Profile extends Component {
    componentDidMount(){
        this.props.followerCount(this.props.profile.profile.id)
    }
    logout() {
        AsyncStorage.removeItem('token').then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        console.log(this.props.following_count)
        return (
            <Nav>
                <View style={styles.profile}>
                    <ScrollView style={styles.photos}>
                        <User user={this.props.profile.profile} following_count={this.props.following_count}/>
                        <Photos photos={this.props.profile.currentUserPhotos}/>
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
	profile: state.profileReducer,
    following_count: state.followingReducer.profileCount
}), {
    followerCount
})(Profile)


