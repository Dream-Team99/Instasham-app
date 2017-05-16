import React, {Component} from "react";
import axios from 'axios';
import {ScrollView} from 'react-native';
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
    };
    componentWillMount(){
        axios.get('http://52.10.128.151:3005/api/getSinglePost/' + this.props.match.params.id).then(response =>{
            this.setState({post:response.data[0]})
        });
    };
    render() {
        return (
            <Nav>
                <ScrollView>
                    {this.state.post &&
                        <PostDetail history={this.props.history} location={this.props.location.pathname}  currentUser={this.props.mainProfile} post={this.state.post}/>
                    }
                </ScrollView>
            </Nav>
        );
    }
}
export default connect( state=>({
    currentProfile: state.profileReducer.currentProfile,
    mainProfile: state.profileReducer.profile.profile
}), {
    passHistory
})(Post)