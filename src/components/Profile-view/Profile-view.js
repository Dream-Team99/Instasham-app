import React, {Component} from 'react';
import {Text,TouchableHighlight, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Nav from '../Nav';
import {getProfile} from '../../reducers/profileReducer';
import {followerCount, passHistory} from "../../reducers/followingReducer";
import User from './subcomponents/User-box';
import  Photos from "./subcomponents/User-photos";

class Profile extends Component {

    componentDidMount() {
        this.props.getProfile(this.props.match.params.id);
        this.props.followerCount(this.props.match.params.id);
        this.props.passHistory(this.props.history, 1)
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.props.getProfile(newProps.match.params.id);
            this.props.followerCount(newProps.match.params.id);
        }
    }
        logout()
        {
            AsyncStorage.removeItem('token').then(() => {
                this.props.history.push('/')
            })
        }

        render()
        {
            return (
                <Nav>
                    {this.props.currentProfile.profile &&
                    <View style={styles.profile}>
                        <ScrollView style={styles.photos}>
                            <User following_count={this.props.following.profileCount} user={this.props.currentProfile.profile}/>
                            <Photos photos={this.props.currentProfile.photos}/>
                            <TouchableHighlight style={styles.logout} onPress={this.logout.bind(this)}><Text
                                style={{color: "white", textAlign: 'center',}}>Logout</Text></TouchableHighlight>
                        </ScrollView>


                    </View>
                    }
                </Nav>
            )
        }
    }

const styles = StyleSheet.create({
    logout:{
        backgroundColor:"#3897f0",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:17,
        paddingRight:17,
        borderRadius: 5
    },
});

export default connect( state=>({ 
	mainProfile: state.profileReducer.profile,
    currentProfile: state.profileReducer.currentProfile,
    following: state.followingReducer
}), {
	getProfile,followerCount, passHistory

})(Profile)