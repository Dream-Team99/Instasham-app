import React, {Component} from 'react'
import {Text, StyleSheet, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'

class Profile extends Component{
    logout(){
        AsyncStorage.removeItem('id').then(()=>{
            this.props.history.push('/')
        })
    }
}
    render(){
        // console.log('profile is', this.props.state.profile)
        return(
            <Nav>
                <View style={styles.profile}>
                    <ScrollView style={styles.photos}>
                    <User user={this.props.state.profile}/>
                        {/*<Photos photos={this.props.state.userPhotos}/>*/}
                    </ScrollView>
                    <Text onPress={this.logout.bind(this)}>Logout</Text>
                </View>
            </Nav>

        )
    }

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	// Imported Actions
})(Profile)


