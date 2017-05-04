import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'

class Home extends Component{
	render(){
		return(
			<Nav>
				<Text>Home Route</Text>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	// Imported Actions
})(Home)
