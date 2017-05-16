import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

const PostCard = (props) =>{
    return(
        <View style={{elevation:1}}>
            {props.children}
        </View>
    )
};

export default PostCard;