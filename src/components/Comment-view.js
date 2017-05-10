import React, {Component} from 'react';
import {Text,TouchableHighlight,Image, StyleSheet,View,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Link} from  'react-router-native';
import axios from "axios"
import Nav from './Nav'
import PostCardSection from './Home-view/subcomponents/PostCardSection'



class Comment extends Component {
    constructor(){
        super();
        this.state ={
            post:{
            },
            comments:[]
        }
    }

    componentDidMount() {
        axios.get('http://52.10.128.151:3005/api/getSinglePost/' + this.props.match.params.id).then(response =>{
            console.log(response.data)
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
                <ScrollView>
                    <PostCardSection>
                        <View style={styles.thumbnail_container}>

                            <View>
                                <Link to={"/Profile/" + this.state.post.user_id}><Image style={styles.thumbnail_style}
                                                                                        source={{uri: this.props.post.user_image}}/></Link>
                            </View>
                            <View>
                                <Link to={"/Profile/" + this.state.post.user_id}><Text>{this.props.post.username}</Text></Link>
                            </View>
                        </View>
                        <Text> {this.state.post.post_text}</Text>
                    </PostCardSection>
                    <PostCardSection>
                    {this.state.comments.map((val, i) => {
                    return (
                        <View key={i}>
                        <View>
                            <Link to={"/Profile/" + val.user_id}><Image style={styles.thumbnail_style}
                                                                        source={{uri: val.user_image}}/></Link>
                        </View>
                        <View>
                            <Link to={"/Profile/" + this.state.post.user_id}><Text>{this.props.post.username}</Text></Link>
                        </View>
                        <Text>{val.comment}</Text>
                        <Text>{val.timestamp}</Text>
                    </View>
                    )
                    })}
                    </PostCardSection>
                    <PostCardSection>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e)=> (e)}
                        value={this.state.comment}
                    />
                        <TouchableHighlight><Text>Comment</Text></TouchableHighlight>
                    </PostCardSection>
                </ScrollView>
            </Nav>
        )
    }
}

const styles = StyleSheet.create({
    input:{

    },
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
export default connect( state=>({
    mainProfile: state.profileReducer.profile,
}), {
})(Comment)