import React, {Component} from 'react'
import {
	View, 
	TextInput, 
	Text, 
	Image, 
	Button, 
	ScrollView,
	Modal
} from 'react-native'
import {connect} from 'react-redux'
import {searchHandle} from '../../../reducers/chatReducer'
import BackNav from './BackNav'
import {hideSearch, showChat} from '../../../reducers/modalDuck'

class Search extends Component{

	mapResults(results){
		if(results.length === 0){
			return <Text style={styles.noResults}>Search for one of your friends to start chatting!</Text>
		}
		return results.map(user => {
    	return (
    		<View style={styles.user} key={user.id}>
    			<Image style={styles.image} source={{uri: user.imageurl}} />
    			<Text style={{fontSize: 16}}>{user.username}</Text>
    			<Button title="Message" onPress={() => {
    				this.props.showChat(user.id)
    				this.props.searchHandle(null, '')
    			}} />
    		</View>
    	)
    })
	}
	
	// this.props.searchHandle(null, '')

	render(){
		return(
			<Modal 
				visible={this.props.showSearch}
				animationType="slide"
				style={styles.search}
				onRequestClose={this.props.hideSearch}>
				<BackNav text="Send a new message..." hide={this.props.hideSearch} />
				<TextInput 
					style={styles.input}
					onChangeText={(text) => this.props.searchHandle(this.props.userid, text)}
	        value={this.props.search} />
	      <ScrollView>
		      {this.mapResults(this.props.searchResults)}
	      </ScrollView>
			</Modal>
		)
	}
}

const styles = {
	search: {
		flex: 1
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30
	},
	user: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#e6e6e6',
		borderBottomWidth: 1
	},
	input: {
		padding: 10,
		fontSize: 16
	},
	noResults: {
		color: '#999',
		textAlign: 'center',
		padding: 20,
		fontSize: 16
	}
}

export default connect( state=>({ 
	search: state.chatReducer.search,
	searchResults: state.chatReducer.searchResults,
	userid: state.profileReducer.profile.profile.id,
	showSearch: state.modalDuck.showSearch
}), {
	searchHandle,
	hideSearch,
	showChat
})(Search)