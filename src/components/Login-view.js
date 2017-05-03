import React, {Component} from 'react';
import {View, TextInput, Text,Image, StyleSheet, Button, Alert} from 'react-native';
import Expo, {Constants, Facebook} from 'expo'

export default class Login extends Component{
    state = {profile: ''}

    componentDidMount(){
        console.log('checking token', this.state.token)
        if(this.props.token){
            fetch(`https://graph.facebook.com/me?access_token=${this.props.token}`).then(result =>{
                this.setState({profile: result.json,
                    token: this.state.token});
            });
            this.props.history.push('/Home')
        }

    }

    _handleFacebookLogin = async () => {
        if(!this.state.token) {
            try {
                const {type, token} = await Facebook.logInWithReadPermissionsAsync(
                    '1025828367561659', // Replace with your own app id in standalone app
                    {permissions: ['public_profile']}
                );

                switch (type) {
                    case 'success': {
                        // Get the user's name using Facebook's Graph API
                        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                        const profile = await response.json();
                        this.setState({
                            profile: profile,
                            token: token
                        });
                        this.props.history.push('/Home');
                        // console.log(profile);
                        break;
                    }
                    case 'cancel': {
                        Alert.alert(
                            'Cancelled!',
                            'Login was cancelled!',
                        );
                        break;
                    }
                    default: {
                        Alert.alert(
                            'Oops!',
                            'Login failed!',
                        );
                    }
                }
            } catch (e) {
                Alert.alert(
                    'Oops!',
                    'Login failed!',
                );
            }
        }else {
            this.props.history.push('/Home')
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('./images/logo.png')} />
                </View>
                <Button style={styles.buttons} onPress={this._handleFacebookLogin} title="Login with Facebook" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
        justifyContent: 'space-around',
    },
    header:{
        marginTop: 65,
        alignItems: 'center'
    },
    buttons:{
        justifyContent: 'space-around'
    }
});

