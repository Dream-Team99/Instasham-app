import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Link} from  'react-router-native';

export default class User extends Component{
    render(){
        return(
                <View style={styles.pageView}>
                    <View style={styles.profileImageAndName}>
                        <Image style={styles.image} source={{uri: this.props.user.imageurl}} />
                        <Text style={styles.name}>{this.props.user.username}</Text>
                    </View>
                    <View style={styles.links}>
                        <Link style={styles.posts}><Text>posts</Text></Link>
                        <Link style={styles.posts}><Text>followers</Text></Link>
                        <Link style={styles.posts}><Text>following</Text></Link>
                     </View>
                 </View>
        )
    }
}

const styles = StyleSheet.create({
    pageView:{
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#919191',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    profileImageAndName:{
        flexDirection: 'column',
    },
    name: {
        fontSize: 14,
    },
    image:{
        width: 90,
        height: 90,
        borderRadius: 50
    },
    links:{
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    posts:{
        marginLeft:5,
        marginRight: 5
    }
});