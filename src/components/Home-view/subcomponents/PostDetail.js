import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import PostCard from './PostCard';
import PostCardSection from './PostCardSection'

const PostDetail = (props) =>{
    return(
        <PostCard>
            <PostCardSection>
                <View style={styles.thumbnail_container}>
                    <Image style={styles.thumbnail_style} source={{uri: props.post.user_image}}/>
                    <Text>{props.post.username}</Text>
                </View>
            </PostCardSection>
            <PostCardSection>
                <View style={styles.headerContentStyle}>
                    <Image style={styles.image_style} source={{uri: props.post.url}}/>
                </View>
            </PostCardSection>
            <PostCardSection>
                <View style={styles.likes}>
                    <Text>like</Text>
                    <Text> comment</Text>
                </View>
            </PostCardSection>
            <PostCardSection>
                <View style={styles.poster}>
                    <Text style={styles.postStyle}>{props.post.username} </Text>
                    <Text> {props.post.post_text}</Text>
                </View>
                <View style={styles.timeStampView}>
                    <Text style={styles.timeStampStyle}>{props.post.timestamp}</Text>
                </View>
                {/*<Text>2nd comment</Text>*/}
            </PostCardSection>
        </PostCard>
    )
};

const styles = StyleSheet.create({
    postImage:{
        height: 300,
        flex: 1,
        width: null
    },
    timeStampView:{
        marginBottom: 10,
        marginLeft: 10
    },
    timeStampStyle:{
        fontSize: 12
    },
    postStyle:{
        fontWeight: 'bold'
    },
    header_text:{
        fontSize: 18
    },
    thumbnail_style:{
        height: 35,
        width: 35,
        borderRadius: 35,
        marginRight: 10
    },
    poster:{
        marginLeft: 10,
        flexDirection: 'row'
    },
    likes:{
        flexDirection: 'row',
        marginLeft: 10
    },
    thumbnail_container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 10
    },
    image_style:{
        height: 300,
        flex: 1,
        width: null
    }
});

export default PostDetail