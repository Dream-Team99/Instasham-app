import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Link} from  'react-router-native'
import { Ionicons } from '@expo/vector-icons'


export default class Header extends Component{
	constructor(){
		super()
		this.state = {
			btnSelected: 1
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={[styles.navBar, styles.top]}>
					<Link to='/Search' ><Ionicons name='md-search' size={32} color='black'/></Link>
					<Link to='/Home' ><Image source={require('./images/logo_360.png')} /></Link>
					<Link to='/Chat'><Ionicons name='md-chatbubbles' size={32} color='black'/></Link>
				</View>
				{this.props.children}
				<View style={styles.navBar}>
          <Link to='/Home'><Ionicons name='md-home' size={32} color='black' /></Link>
          <Link to='/Camera'><Ionicons name='md-camera' size={32} color='black' /></Link>
          <Link to='/Profile'><Ionicons name='md-person' size={32} color='black' /></Link>
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
		color:'black'
	}
})

