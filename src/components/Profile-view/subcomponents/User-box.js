
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Link} from  'react-router-native';



class Profile extends Component{
    render(){
        return(
            <View style={styles.pageView}>
            //     <View style={styles.fullProfile}>
            //         <View style={styles.profileImageAndName}>
            //         <Image style={styles.image} source={{uri: this.props.state.profile.picture.data.url}} />
            //         <Text style={styles.name}>{this.props.state.profile.name}</Text>
            //     </View>
            //     <View style={styles.stuff}>
            //         <Link><Text>posts</Text></Link>
            //         <Link><Text>followers</Text></Link>
            //         <Link><Text>following</Text></Link>
            //     </View>
            // </View>
    )
    }
}

const styles = StyleSheet.create({
    pageView:{
        marginTop: 50
    },
    fullProfile:{
        flexDirection: 'row',
    },
    profileImageAndName:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 18,
        textAlign: 'center',
    },
    image:{
        width: 75,
        height: 75,
        borderRadius: 40
    },
    stuff:{
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    }
});