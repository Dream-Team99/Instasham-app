import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from "axios";
import PostDetail from './PostDetail'

export default class MainFeed extends Component {



    renderList() {
     return this.props.list.map((post, i) => {


         return <PostDetail currentUser={this.props.currentUser} key={i} post={post}/>
     })

    }

    render() {

        return (
            <View>
                {this.props.list.length > 0 &&
                <View>{this.renderList()}</View>
                }
                {this.props.list.length < 1 &&
                <View>
                    <Text>Start adding followers to see posts.</Text>
                </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({

});

