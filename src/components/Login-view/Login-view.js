import React, {Component} from 'react'
import {View, Image, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {getProfile, checkToken} from '../../reducers/profileReducer'

class Login extends Component{

	login(){
    this.props.getProfile()
  }

  componentWillMount(){
    this.props.checkToken()
  }

  componentWillReceiveProps(newProps){
    if(newProps.profile){
       this.props.history.push('/Home')
    }
	}

	render(){
		return(
			<View>
				<View style={styles.header}>
        	<Image source={require('../../images/logo_medium.png')} />
        </View>
        <Button onPress={this.login.bind(this)} title="Login with Facebook" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	profile: state.profile
}), {
	getProfile, checkToken
})(Login)
