import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from "../Header-nav.js"
import Bottom from "../Bottom-nav"
import User from "./subcomponents/User-box"
import Photos from "./subcomponents/User-photos"

class Profile extends Component{
    render(){
        // console.log('profile is', this.props.state.profile)
        return(
            <View style={styles.profile}>
                <Header/>
                    <User user={this.props.state.profile}/>
                {/*<ScrollView >*/}
                    {/*<Photos photos={this.props.state.userPhotos}/>*/}
                {/*</ScrollView>*/}
                <Bottom/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    // profile:{
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'space-between'
    // }
});

function mapStateToProps(state) {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(Profile)


