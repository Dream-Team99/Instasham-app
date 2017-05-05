import React from "react";
import axios from 'axios';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MainFeed from "./subcomponents/MainFeed";
import Nav from '../Nav'
import {connect} from 'react-redux'


const followingList = []

class Home extends React.Component {

    // componentWillMount(){
    //     axios.get('http://52.10.128.151:3005/api/getFollowing' + this.props.profile).then(result =>{
    //         const followingList = result.data
    //     })
    // }

    render() {
        // console.log(this.props.redux)
        return (
            <Nav>
                <ScrollView style={styles.mainfeed}>
                    <MainFeed list={followingList}/>
                </ScrollView>
            </Nav>
        );
    }
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	profile: state.profileReducer,
    search: state.searchReducer

}), {
	// Imported Actions
})(Home)
