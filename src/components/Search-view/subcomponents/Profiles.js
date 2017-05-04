
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Link} from  'react-router-native';



export default class User extends Component{

    render(){

        const Profiles = this.props.users.map((p,i)=> {
            return (
                <View style={styles.fullProfile} key={p.id}>
                    <View style={styles.profileImageAndName}>
                        <Image style={styles.image} source={{uri: p.imageurl}} />
                        <Text style={styles.name}>{p.username}</Text>
                    </View>
                </View>
        )});
        return (
            <View style={styles.pageView}>
                {Profiles}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageView:{
    },
    fullProfile:{
        flexDirection: 'row',
    },
    profileImageAndName:{
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 14,
        textAlign: 'center',
    },
    image:{
        width: 75,
        height: 75,
        borderRadius: 40
    }
});