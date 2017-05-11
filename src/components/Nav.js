import React, { Component } from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Link} from  'react-router-native'
import { Ionicons } from '@expo/vector-icons'
import {connect} from 'react-redux'


class Nav extends Component{
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		btnSelected: 1
	// 	}
	// }

	render(){
		// console.log( 'lolo',this.props)
		return(

			<View style={styles.container}>
				<View style={[styles.navBar, styles.top]}>
					<Link underlayColor="transparent" to='/Search'><Ionicons underlayColor="transparent" name='md-search' size={32} color='#262626'/></Link>
					<Link underlayColor="transparent" to='/Home'><Image source={require('../images/logo_360.png')} /></Link>
					<Link underlayColor="transparent" to='/Chat'><Ionicons underlayColor="transparent" name='md-chatbubbles' size={32} color='#262626'/></Link>
				</View>
				<View style={styles.container}>
					{this.props.children}
				</View>
				<View style={styles.navBar}>
          <Link underlayColor="transparent" to='/Home'><Ionicons underlayColor="transparent" name='md-home' size={32} color='#262626' /></Link>
          <Link underlayColor="transparent" to='/Camera'><Ionicons underlayColor="transparent" name='md-camera' size={32} color='#262626' /></Link>
          <Link underlayColor="transparent" to={'/Profile/' + this.props.mainProfile.id}><Ionicons underlayColor="grey" name='md-person' size={32} color='#262626' /></Link>
	      </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar:{
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#f2f2f2',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	},
	top: {
		paddingTop: 35
	},
	container: {
		flex: 1
	},
	btnSelected: {
		color:'grey'
	},
	notSelected : {
		color:'#262626'
	}
})

export default connect( state=>({
    mainProfile: state.profileReducer.profile.profile,
    search: state.searchReducer,
    follow: state.followingReducer

}), {

})(Nav)



