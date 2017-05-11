import React, {Component} from 'react'
import {
	View, 
	TextInput, 
	Text, 
	Image, 
	Button, 
	ScrollView,
	Keyboard
} from 'react-native'
import {connect} from 'react-redux'
import {searchHandle} from '../../../reducers/chatReducer'

class Search extends Component{

	render(){
		return(
			<View style={styles.search}>
				<TextInput 
					style={styles.input}
					onChangeText={(text) => this.props.searchHandle(this.props.userid, text)}
	        value={this.props.search} />
	      <ScrollView>
		      {this.props.searchResults.map(user => {
		      	console.log(user)
		      	return (
		      		<View style={styles.user} key={user.id}>
		      			<Image style={styles.image} source={{uri: user.imageurl}} />
		      			<Text style={{fontSize: 16}}>{user.username}</Text>
		      			<Button title="Message" onPress={()=>{}} />
		      		</View>
		      	)
		      })}
	      </ScrollView>
			</View>
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
	}
}

export default connect( state=>({ 
	search: state.chatReducer.search,
	searchResults: state.chatReducer.searchResults,
	userid: state.profileReducer.profile.profile.id
}), {
	searchHandle
})(Search)