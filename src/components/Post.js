import React, {Component} from "react";
import axios from 'axios';
import {View, Text, StyleSheet, Image} from 'react-native';
import PostDetail from './Home-view/subcomponents/PostDetail';
import {connect} from 'react-redux';
import Nav from '../components/Nav'

class Post extends Component{
    constructor(){
        super();
        this.state = {
            post: null
        }
    }

    componentWillMount(){
        axios.get('http://52.10.128.151:3005/api/getSinglePost/' + this.props.match.params.id).then(response =>{
            // console.log(response.data)
            this.setState({post:response.data[0]})
        });
    }
    componentDidMount(){

    }

    render() {
        // console.log(this.state.post)
        return (
            <Nav>
                <View>
                    <View>
                        {this.state.post &&
                            <PostDetail currentUser={this.props.currentProfile.profile} post={this.state.post}/>
                        }
                    </View>
                </View>
            </Nav>
        );
    }

}

const styles = StyleSheet.create({

});

export default connect( state=>({
    currentProfile: state.profileReducer.currentProfile
}), {

})(Post)