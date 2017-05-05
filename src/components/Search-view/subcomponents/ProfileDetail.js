import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

class ProfileDetail extends Component {
    render(){
        return(
            <View>
                {this.props.children}
            </View>
        )
    };

}

export default ProfileDetail;
