import React, {Component} from "react";
import axios from 'axios';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import PostDetail from './Home-view/subcomponents/PostDetail';
import {connect} from 'react-redux';
import Nav from '../components/Nav'
import {passHistory} from '../reducers/followingReducer';

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
        // console.log(this.props.history)
        // console.log(this.props.match.params.id)
        this.props.passHistory(this.props.history, this.props.match.params.id)
    }

    render() {
        // console.log(this.state.post)
        return (
            <Nav>
                <ScrollView>
                    {this.state.post &&
                    <PostDetail currentUser={this.props.mainProfile.profile} post={this.state.post}/>
                    }
                </ScrollView>
            </Nav>
        );
    }

}

const styles = StyleSheet.create({

});

export default connect( state=>({
    mainProfile: state.profileReducer.profile,
    follow: state.followingReducer
}), {
    passHistory
})(Post)