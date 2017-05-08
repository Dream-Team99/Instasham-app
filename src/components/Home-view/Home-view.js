import React, {Component} from "react";
import axios from 'axios';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MainFeed from "./subcomponents/MainFeed";
import {getList} from '../../reducers/followingReducer';
import Nav from '../Nav'
import {connect} from 'react-redux'

const followingList = [];

class Home extends Component {
    componentWillMount(){
            this.props.getList(this.props.mainProfile.profile.id)
    }

    render() {
        // console.log(this.props.follow.followingList)
        return (
            <Nav>
                <ScrollView>
                    <MainFeed list={this.props.follow.followingList}/>
                </ScrollView>
            </Nav>
        );
    }
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	mainProfile: state.profileReducer,
    search: state.searchReducer,
    follow: state.followingReducer

}), {
	getList
})(Home)
