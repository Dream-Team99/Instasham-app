import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from "../Header-nav.js"
import Bottom from "../Bottom-nav"
import User from "./subcomponents/User-box"
import Photos from "./subcomponents/User-photos"

class Profile extends Component{
    render(){
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Header/>
                    <User />
                <ScrollView >
                    <Photos/>
                </ScrollView>
                <Bottom/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(Profile)


