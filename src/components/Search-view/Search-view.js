
import React, {Component} from 'react'
import {StyleSheet, ScrollView, TextInput} from 'react-native'
import Profiles from './subcomponents/Profiles'
import {searchForUsers} from '../../reducers/searchReducer'
import {connect} from 'react-redux'
import Nav from '../Nav'

class Search extends Component{
    componentDidMount(){
        this.props.searchForUsers(``)
    }
	render(){
        // console.log(this.props.redux.profileReducer.profile)

        return(

			<Nav>
				<TextInput
					style={styles.input}
					onChangeText={(e)=> this.props.searchForUsers(e)}
					value={this.props.redux.SearchText}
				/>
				<ScrollView>
					<Profiles currentUser={this.props.redux.profileReducer.profile} users={this.props.redux.searchReducer.Profiles}/>
				</ScrollView>
			</Nav>
		)
	}
}

const styles = StyleSheet.create({
	input:{
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	}
})

export default connect( state=>({ 
	redux: state
}), {
  searchForUsers
	// Imported Actions
})(Search)
