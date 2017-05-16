
import React, {Component} from 'react'
import {StyleSheet, ScrollView, TextInput} from 'react-native'
import Profiles from './subcomponents/Profiles'
import {searchForUsers} from '../../reducers/searchReducer'
import {followerCount, passHistory} from '../../reducers/followingReducer';
import {connect} from 'react-redux'
import Nav from '../Nav'

class Search extends Component{
    componentDidMount(){
        this.props.searchForUsers(``)
		this.props.passHistory(this.props.history, 0)
    }
	render(){
        // console.log(this.props.redux.profileReducer.profile)

        return(

			<Nav>
				<TextInput
					style={styles.input}
					onChangeText={(e)=> this.props.searchForUsers(e)}
					value={this.props.search.SearchText}
				/>
				<ScrollView>
					<Profiles currentUser={this.props.mainProfile.profile} users={this.props.search.Profiles}/>

				</ScrollView>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	input:{
		height: 40,
        paddingLeft:5,
        paddingRight:5,
		borderColor: 'gray',
		borderWidth: 1
	}
});

export default connect( state=>({ 
	mainProfile: state.profileReducer.profile,
	search: state.searchReducer,
	follow: state.followingReducer

}), {
  searchForUsers, followerCount, passHistory
	// Imported Actions
})(Search)
