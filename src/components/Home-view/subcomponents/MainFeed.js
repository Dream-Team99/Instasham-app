
import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import PostDetail from './PostDetail'

export default class MainFeed extends Component {

    renderList() {
     return this.props.list.map(post => <PostDetail key={post.id} post={post}/>)
    }

    render() {
        return (
            <View>
                {this.renderList()}
            </View>
        );
    }
}
const styles = StyleSheet.create({

});

