import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import PostCard from './PostCard';
import PostCardSection from './PostCardSection'

const PostDetail = (props) =>{
    return(
        <PostCard>
            <PostCardSection>
                <View style={styles.thumbnail_container}>
                    <Image style={styles.thumbnail_style} source={{uri: props.post.img}}/>
                    <Text>{props.post.name}</Text>
                </View>
            </PostCardSection>
            <PostCardSection>
                <View style={styles.headerContentStyle}>
                    <Image style={styles.image_style} source={{uri: props.post.img}}/>
                </View>
            </PostCardSection>
            <PostCardSection>
                <View>
                    <Text>like</Text>
                    <Text>comment</Text>
                </View>
            </PostCardSection>
            <PostCardSection>
                <Text>post</Text>
                <Text>1st comment</Text>
                <Text>2nd comment</Text>
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
    header_text:{
        fontSize: 18
    },
    thumbnail_style:{
        height: 50,
        width: 50,
        borderRadius: 35
    },
    thumbnail_container:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginRight: 10
    },
    image_style:{
        height: 300,
        flex: 1,
        width: null
    }
});

export default PostDetail