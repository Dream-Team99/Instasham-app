import React, {Component} from 'react';
import {Text,TouchableHighlight,Image, StyleSheet,View,ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {Link} from  'react-router-native';
import axios from "axios"
import moment from "moment";
let now = moment();
import Nav from './Nav'
import PostCardSection from './Home-view/subcomponents/PostCardSection'



class Comment extends Component {
    constructor(){
        super();

        this.state ={
            post: null,
            comments:[],
            text: ''
        }
    }

    postComment(){
        axios.post('http://52.10.128.151:3005/api/postComment', {userid: this.props.mainProfile.profile.id, comment: this.state.text, photoid: this.state.post.photo_id, timestamp: now}).then(response =>{
            this.setState({comments:response.data})
        })
    }

    componentDidMount() {
        axios.get('http://52.10.128.151:3005/api/getSinglePost/' + this.props.match.params.id).then(response =>{
            this.setState({post:response.data[0]})
        })
        axios.get(`http://52.10.128.151:3005/api/getComments/${this.props.match.params.id}`).then((res)=>{
            this.setState({comments: res.data})
        });

    }


    render()
    {
        return (
            <Nav>
                {this.state.post &&
                <ScrollView>
                    <PostCardSection>
                        <View style={styles.thumbnail_container}>
                            <View>
                                <Link to={"/Profile/" + this.state.post.user_id}><Image style={styles.thumbnail_style}
                                                                                        source={{uri: this.state.post.user_image}}/></Link>
                            </View>
                            <View style={styles.postView}>
                                <Link to={"/Profile/" + this.state.post.user_id}><Text
                                    style={styles.postStyle}>{this.state.post.username}</Text></Link>
                                <Text  style={styles.commentText}> {this.state.post.post_text}</Text>
                                <Text style={styles.timeStampStyle}>{moment(this.state.post.timestamp).fromNow()}</Text>
                            </View>
                        </View>
                    </PostCardSection>
                    <PostCardSection>
                        {this.state.comments.map((val, i) => {
                            return (
                                <View key={i}>
                                    <View style={styles.thumbnail_container}>
                                        <View>
                                            <Link to={"/Profile/" + val.userid}><Image style={styles.thumbnail_style}
                                                                                        source={{uri: val.imageurl}}/></Link>
                                        </View>
                                        <View style={styles.postView}>
                                            <Link to={"/Profile/" + val.userid}><Text style={styles.postStyle}>{val.username}</Text></Link>
                                            <Text style={styles.commentText}>{val.comment}</Text>
                                            <Text style={styles.timeStampStyle} >{moment(val.timestamp).fromNow()}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        })
                        }
                    </PostCardSection>
                </ScrollView>
                }
                <KeyboardAvoidingView keyboardVerticalOffset={5}>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                        <TouchableHighlight
                            onPress={this.postComment.bind(this)}><Text>Comment</Text></TouchableHighlight>

                </KeyboardAvoidingView>

            </Nav>
        )
    }
}

const styles = StyleSheet.create({
    commentText:{
        textAlign:"justify",
    }
    ,
    input:{

    },
    postView:{
        marginLeft: 10
    },
    postImage:{
        height: 300,
        flex: 1,
        width: null
    },
    timeStampStyle:{
        fontSize: 12,
        marginTop: 10
    },
    postStyle:{
        fontWeight: 'bold'
    },
    thumbnail_style:{
        height: 50,
        width: 50,
        borderRadius: 35,
        marginRight: 10
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
export default connect( state=>({
    mainProfile: state.profileReducer.profile,
}), {
})(Comment)