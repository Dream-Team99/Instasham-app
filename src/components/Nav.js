import React, { Component } from 'react'
import {View, Image, StyleSheet, TouchableOpacity, Button} from 'react-native'
import {Link} from  'react-router-native'
import { Ionicons } from '@expo/vector-icons'
import {connect} from 'react-redux'


class Nav extends Component{

	render(){
        // console.log(this.props.follow.entries[this.props.follow.entries.length -2])
        console.log(this.props.id)
		return(
			<View style={styles.container}>
				<View style={[styles.navBar, styles.top]}>
                        {this.props.follow.location.pathname === '/Post/' + this.props.id  &&
                            <Link to={this.props.follow.entries[this.props.follow.entries.length -2]}><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
                        }
                    {this.props.follow.location.pathname === '/Home' &&
                         < Link to='/Search'><Ionicons name='md-search' size={32} color='#262626'/></Link>
                    }
                    {this.props.follow.location.pathname === '/Search' &&
                         <Link to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
                    }
                    {this.props.follow.location.pathname === '/Profile/' + this.props.mainProfile.id &&
                        <Link to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
                        || this.props.follow.location.pathname === '/Profile/' + this.props.currentProfile.id &&
                            <Link to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
                    }
                    {/*{this.props.follow.location.pathname === '/Comment/' + this.props.id  &&*/}
                        {/*<Link to={this.props.follow.entries[this.props.follow.entries.length -2]}><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>*/}
                    {/*}*/}
					<Link to='/Home'><Image source={require('../images/logo_360.png')} /></Link>
					<Link to='/Chat'><Ionicons name='md-send' size={32} color='#262626'/></Link>
				</View>
				<View style={styles.container}>
					{this.props.children}
				</View>
				<View style={styles.navBar}>
          <Link to='/Home'><Ionicons name='md-home' size={32} color='#262626' /></Link>
          <Link to='/Camera'><Ionicons name='md-camera' size={32} color='#262626' /></Link>
          <Link to={'/Profile/' + this.props.mainProfile.id}><Ionicons name='md-person' size={32} color='#262626' /></Link>
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
    currentProfile: state.profileReducer.currentProfile.profile,
    search: state.searchReducer,
    follow: state.followingReducer.passedHistory,
    id: state.followingReducer.id
}), {

})(Nav)



