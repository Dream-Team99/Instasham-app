/**
 * Created by beebe on 5/3/2017.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link} from  'react-router-native';
import { Ionicons } from '@expo/vector-icons';



export default class Bottom extends Component{
    render(){
        return(
            <View style={styles.nav}>

                <Link to="/Home"><Ionicons name="md-home" size={32} color="black" /></Link>
                <Link to="/Camera"><Ionicons name="md-camera" size={32} color="black" /></Link>
                <Link to="/Profile"><Ionicons name="md-person" size={32} color="black" /></Link>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav:{
        height:50,
        alignItems:"center",
        elevation:2,
        borderColor:"grey",
        borderStyle: "solid",
        marginTop:22,
        flexDirection: "row",
        justifyContent:"space-around",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
    },

});

