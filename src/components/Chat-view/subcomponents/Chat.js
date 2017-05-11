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
import BackNav from './backNav'

class Chat extends Component{

	render(){
		return(
			<Modal 
				visible={this.props.visible}
				animationType="slide"
				style={styles.search}
				onRequestClose={this.props.hide}>
				<BackNav hide={this.props.hide} />
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
	      <TextInput 
					style={styles.input}
					onChangeText={(text) => this.props.searchHandle(this.props.userid, text)}
	        value={this.props.search} />
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
	
}), {
	
})(Chat)