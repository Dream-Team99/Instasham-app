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
			<View style={styles.nav}>
				<View style={styles.header}>
					<Link to='/Search' ><Ionicons name='md-search' size={32} color='black'/></Link>
					<Link to='/Home' ><Image source={require('./images/logo_360.png')} /></Link>
					<Link to='/Chat'><Ionicons name='md-chatbubbles' size={32} color='black'/></Link>
				</View>
				{this.props.children}
				<View style={styles.footer}>
          <Link to='/Home'><Ionicons name='md-home' size={32} color='black' /></Link>
          <Link to='/Camera'><Ionicons name='md-camera' size={32} color='black' /></Link>
          <Link to='/Profile'><Ionicons name='md-person' size={32} color='black' /></Link>
	      </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	header:{
		alignItems:'center',
		height:50,
		elevation:2,
		borderColor:'grey',
		borderStyle: 'solid',
		marginTop:22,
		flexDirection: 'row',
		justifyContent:'space-between',
		paddingLeft:10,
		paddingRight:10,
		paddingTop:5,
		paddingBottom:5
	},
	nav:{
    height:50,
    alignItems:'center',
    borderColor:'grey',
    borderStyle: 'solid',
    borderWidth:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5
  },
	btnSelected: {
		color:'grey'
	},
	notSelected : {
		color:'black'
	}
})

