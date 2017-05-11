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

class Chat extends Component{

	render(){
		return(
			<Modal 
				visible={this.props.visible}
				animationType="slide"
				style={styles.search}
				onRequestClose={this.props.hide}>
				<TextInput 
					style={styles.input}
					onChangeText={(text) => this.props.searchHandle(this.props.userid, text)}
	        value={this.props.search} />
	      <ScrollView>
		      {this.props.searchResults.map(user => {
		      	return (
		      		<View style={styles.user} key={user.id}>
		      			<Image style={styles.image} source={{uri: user.imageurl}} />
		      			<Text style={{fontSize: 16}}>{user.username}</Text>
		      			<Button title="Message" onPress={()=>{}} />
		      		</View>
		      	)
		      })}
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
	}
}

export default connect( state=>({ 
	search: state.chatReducer.search,
	searchResults: state.chatReducer.searchResults,
	userid: state.profileReducer.profile.profile.id
}), {
	searchHandle
})(Chat)