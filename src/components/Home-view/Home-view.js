import React, {Component} from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MainFeed from "./subcomponents/MainFeed";
import {getList} from '../../reducers/followingReducer';
import {getProfile} from '../../reducers/profileReducer'
import Nav from '../Nav'
import {connect} from 'react-redux'


class Home extends Component {

    componentWillMount(){
        this.props.getList(this.props.mainProfile.profile.id)
    }

    render() {
        return (
            <Nav>
                <ScrollView>
                    <MainFeed currentUser={this.props.mainProfile.profile} list={this.props.follow.followingList}/>
                </ScrollView>
            </Nav>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect( state=>({ 
	mainProfile: state.profileReducer.profile,
    search: state.searchReducer,
    follow: state.followingReducer

}), {
	getList, getProfile
})(Home)
