import React, {Component} from "react";
import {View} from 'react-native';

const PostCardSection = (props) =>{
    return(
        <View>
            {props.children}
        </View>
    )
};
export default PostCardSection