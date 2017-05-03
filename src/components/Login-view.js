import React, {Component} from 'react';
import {View,Image, StyleSheet, Button, Alert, Text} from 'react-native';
import {connect} from 'react-redux';
import Expo, { Facebook} from 'expo'
import {getProfile} from '../reducers/profileReducer';

export class Login extends Component{
    state = {profile: ''};
    login(){
        this.props.getProfile()
        //this.props.history.push('/Profile')
    }
    componentWillReceiveProps(newProps){
        if(newProps.state.profile){
           this.props.history.push('/Profile')
        }
    }
    componentDidMount(){
        // console.log('checking token', this.state.token)
        if(this.state.token){
            fetch(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${this.state.token}`).then(result =>{
                this.setState({profile: result.json,
                    token: this.state.token});
            });
            this.props.history.push('/Profile')
        }

    }

    render(){
        return(
            <View style={styles.loginScreen}>
                <View style={styles.header}>
                    <Image source={require('./logo.png')} />
                </View>
                <Button onPress={this.login.bind(this)} title="Login with Facebook" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginScreen:{
        marginTop: 95,
        justifyContent: 'space-around',
        height: 200
    },
    header:{
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return{
        state: state
    }
}
export default connect(mapStateToProps, {getProfile})(Login)