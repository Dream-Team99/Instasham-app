
import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Header from "./Header-nav";
import Bottom from "./Bottom-nav"



export default class Search extends Component{
    render(){
        return(
            <View>
                <Header/>
                <Text>Input here</Text>
                <Text>Search for users Here</Text>
                <Bottom/>
            </View>
        )
    }
}