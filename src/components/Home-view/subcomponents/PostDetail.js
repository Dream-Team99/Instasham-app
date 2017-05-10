import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import PostCard from './PostCard';
import PostCardSection from './PostCardSection'
import {Link} from  'react-router-native';


class PostDetail extends Component{
    // console.log(props.post.url)
    render() {
        return (
            <PostCard>
                <PostCardSection>
                    <View style={styles.thumbnail_container}>
                        <View>
                            <Link to={"/Profile/" + this.props.post.user_id}><Image style={styles.thumbnail_style}
                                                                               source={{uri: this.props.post.user_image}}/></Link>
                        </View>
                        <View>
                            <Link to={"/Profile/" + this.props.post.user_id}><Text>{this.props.post.username}</Text></Link>
                        </View>
                    </View>
                </PostCardSection>
                <PostCardSection>
                    <View>
                        <Image style={styles.image_style} source={{uri: this.props.post.url}}/>
                    </View>
                </PostCardSection>
                <PostCardSection>
                    <View style={styles.likes}>
                        <View>
                            <Text style={styles.postStyle}>{this.props.likes} likes </Text>
                        </View>
                    </View>
                </PostCardSection>
                <PostCardSection>
                    <View style={styles.poster}>
                        <Link to={"/Profile/" + this.props.post.user_id}><Text
                            style={styles.postStyle}>{this.props.post.username} </Text></Link>
                        <Text> {this.props.post.post_text}</Text>
                    </View>
                    <View style={styles.timeStampView}>
                        <Text style={styles.timeStampStyle}>{this.props.post.timestamp}</Text>
                    </View>
                    {/*<Text>2nd comment</Text>*/}
                </PostCardSection>
            </PostCard>
        )
    }
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
    }
});

export default PostDetail