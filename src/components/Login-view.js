import React, {Component} from 'react';
import {View,Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import Expo, { Facebook} from 'expo'
import {getProfile, checkToken} from '../reducers/profileReducer';

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
    componentWillMount(){
    }
    componentDidMount(){
        checkToken()
        console.log('checking profile', this.props.state.profile);
        if(this.props.state.profile){
            this.props.history.push('/Profile')
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('./images/logo_medium.png')} />
                </View>
                <Button onPress={this.login.bind(this)} title="Login with Facebook" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        marginTop:80,
        height: 200,
        justifyContent: 'space-around'
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
export default connect(mapStateToProps, {getProfile, checkToken})(Login)