import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from "../Header-nav.js"
import Bottom from "../Bottom-nav"
import User from "./subcomponents/User-box"
import Photos from "./subcomponents/User-photos"
import Video from "expo/src/Video";

class Profile extends Component{







    render(){
        return(
            <View style={styles.profile}>
                <Header/>
                <ScrollView style={styles.photos}>
                {/*<User user={this.props.state.profile}/>*/}
                    {/*<Photos photos={this.props.state.userPhotos}/>*/}
                </ScrollView>
                <Bottom/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    photos:{
            height:470
    }
});
function mapStateToProps(state) {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(Profile)


