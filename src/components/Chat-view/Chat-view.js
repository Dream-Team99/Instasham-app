/**
 * Created by beebe on 5/3/2017.
 */

import React, {Component} from 'react';
import {View, Image, StyleSheet, Text, FlatList} from 'react-native';
import ChatBox from "./subcomponents/Chat-box"
import Header from "../Header-nav";
import Bottom from "../Bottom-nav"


export default class Search extends Component{
    render(){
        return(
            <View>
                <Header/>
                <FlatList>
                     <ChatBox />
                </FlatList>
                <Text>input  Here</Text>
                <Bottom/>
            </View>
        )
    }
}