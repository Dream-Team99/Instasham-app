import React, {Component} from 'react';
import {View, Image, BackAndroid, Alert, Text} from 'react-native';
import {Link} from  'react-router-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import WelcomeText from "react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.ios";

class Nav extends Component{
	componentDidMount(){
		BackAndroid.addEventListener('hardwareBackPress', () => {
			Alert.alert('Do you want to close Instasham?', null, [
				{text: 'Yes', onPress: () => BackAndroid.exitApp()}, 
				{text: 'No'}
			]);
			return true
		})
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={[styles.navBar, styles.top]}>
					{this.props.follow.location.pathname === '/Profile/' + this.props.userid &&
						<Link to='/Home'>
							<Ionicons style={styles.icon} name='ios-arrow-back' size={32} color='#262626'/>
						</Link>
					|| this.props.follow.location.pathname === '/Profile/' + this.props.selectedId &&
						<Link to='/Home'>
							<Ionicons style={styles.icon} name='ios-arrow-back' size={32} color='#262626'/>
						</Link>
					|| this.props.follow.location.pathname &&
						<Link underlayColor="#cccccc" to='/Search'>
							<Ionicons name='md-search' style={styles.icon} />
						</Link>
					}
                    <Link underlayColor="transparent" to='/Home'>
						<Text style={styles.logo}>
							On-The-Line
						</Text>
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
	logo:{
		fontFamily:'serif',
		fontSize: 28
	},
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
};
export default connect(state => ({
    userid: state.profileReducer.profile.profile.id,
	follow: state.followingReducer.passedHistory,
    selectedId: state.profileReducer.currentProfile.profile.id
}), {
})(Nav);