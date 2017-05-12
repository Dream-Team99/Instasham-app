import React, { Component } from 'react'
import {View, Image, BackAndroid, Alert} from 'react-native'
import {Link} from  'react-router-native'
import { Ionicons } from '@expo/vector-icons'
import {connect} from 'react-redux'

class Nav extends Component{


	componentDidMount(){
		BackAndroid.addEventListener('hardwareBackPress', () => {
			Alert.alert('Do you want to close Instasham?', null, [
				{text: 'Yes', onPress: () => BackAndroid.exitApp()}, 
				{text: 'No'}
			])
			return true
		})
	}

	render(){
		return(
			<View style={styles.container}>

				<View style={[styles.navBar, styles.top]}>

//                         {this.props.follow.location.pathname === '/Post/' + this.props.id  &&
//                             <Link to={this.props.follow.entries[this.props.follow.entries.length -2]}><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
//                         }
//                     {this.props.follow.location.pathname === '/Home' &&
// 					            <Link underlayColor="transparent" to='/Search'><Ionicons underlayColor="transparent" name='md-search' size={32} color='#262626'/></Link>
//                     }
//                     {this.props.follow.location.pathname === '/Search' &&
//                          <Link underlayColor="transparent" to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
//                     }
//                     {this.props.follow.location.pathname === '/Profile/' + this.props.mainProfile.id &&
//                         <Link underlayColor="transparent" to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
//                         || this.props.follow.location.pathname === '/Profile/' + this.props.currentProfile.id &&
//                             <Link underlayColor="transparent" to='/Home'><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>
//                     }
//                     {/*{this.props.follow.location.pathname === '/Comment/' + this.props.id  &&*/}
//                         {/*<Link to={this.props.follow.entries[this.props.follow.entries.length -2]}><Ionicons name='ios-arrow-back' size={32} color='#262626'/></Link>*/}
//                     {/*}*/}
// 					<Link underlayColor="transparent" to='/Home'><Image source={require('../images/logo_360.png')} /></Link>
// 					<Link underlayColor="transparent" to='/Chat'><Ionicons underlayColor="transparent" name='md-chatbubbles' size={32} color='#262626'/></Link>

					<Link underlayColor="#cccccc" to='/Search'>
						<Ionicons name='md-search' style={styles.icon} />
					</Link>
					<Link underlayColor="transparent" to='/Home'>
						<Image source={require('../images/logo_360.png')} />
					</Link>
					<Link underlayColor="#cccccc" to='/Chat'>
						<Ionicons name='md-send' style={styles.icon} />
					</Link>

				</View>

				<View style={styles.container}>
					{this.props.children}
				</View>

				<View style={styles.navBar}>
          <Link underlayColor="#cccccc" to='/Home'>
	          <Ionicons name='md-home' style={styles.icon} />
	        </Link>
          <Link underlayColor="#cccccc" to='/Camera'>
	          <Ionicons name='md-camera' style={styles.icon} />
	        </Link>
          <Link underlayColor="#cccccc" to={'/Profile/' + this.props.userid}>
	          <Ionicons name='md-person' style={styles.icon} />
	        </Link>
	      </View>

			</View>
		)
	}
}

const styles = {
	navBar:{
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#f2f2f2',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#262626',
		fontSize: 32,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	},
	container: {
		flex: 1
	},
	top: {
		paddingTop: 25
	}
}

export default connect(state => ({
    userid: state.profileReducer.profile.profile.id
}), {

})(Nav)
