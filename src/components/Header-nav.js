import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Link} from  'react-router-native';
import { Ionicons } from '@expo/vector-icons';



export default class Header extends Component{
    render(){
        return(
            <View style={styles.nav}>

                <Link to="/Search"><Ionicons name="md-search" size={32} color="black" /></Link>
                    <Link to="/Home"><Image source={require('./images/logo_360.png')} /></Link>
                <Link to="/Chat"><Ionicons name="md-chatbubbles" size={32} color="black" /></Link>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav:{
        alignItems:"center",
        height:50,
        elevation:2,
        borderColor:"grey",
        borderStyle: "solid",
        marginTop:22,
        flexDirection: "row",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
    },

});

