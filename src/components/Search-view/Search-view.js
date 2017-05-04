
import React, {Component} from 'react'
import {View, Image, StyleSheet, ScrollView, TextInput,Text} from 'react-native';
import Profiles from "./subcomponents/Profiles"
import {searchForUsers} from "../../reducers/searchReducer"
import {connect} from 'react-redux'
import Nav from '../Nav'

class Search extends Component{
	render(){
		return(
			<Nav>
   
				                <TextInput
                    style={styles.input}
                    onChangeText={(e)=> this.props.searchForUsers(e)}
                    value={this.props.redux.SearchText}
                />
                <ScrollView>
                    <Profiles users={this.props.redux.Profiles}/>
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
	redux: state.reducer
}), {
  searchForUsers
	// Imported Actions
})(Search)
