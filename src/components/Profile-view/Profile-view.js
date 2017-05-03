import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from "../Header-nav.js"
import Bottom from "../Bottom-nav"
import User from "./subcomponents/User-box"
import Photos from "./subcomponents/User-photos"

export default class Profile extends Component{

    render(){

        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Header/>
                    <User/>
                <ScrollView style={styles.photos}>
                    <Photos/>
                </ScrollView>
                <Bottom/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photos:{
        height:450
    }
});

