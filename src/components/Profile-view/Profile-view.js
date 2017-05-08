import React, {Component} from 'react'
import {Text, StyleSheet, AsyncStorage, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Nav from '../Nav'
import User from './subcomponents/User-box'
import Photos from './subcomponents/User-photos';

class Profile extends Component {
    logout() {
        AsyncStorage.removeItem('id').then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        console.log('profile id', this.props.params)
        return (
            <Nav>
                <View style={styles.profile}>
                    <ScrollView style={styles.photos}>
                        <User user={this.props.mainProfile.profile}/>
                        <Photos photos={this.props.mainProfile.userPhotos}/>
                    </ScrollView>
                    {/*<Text onPress={this.logout.bind(this)}>Logout</Text>*/}
                </View>
            </Nav>


        )
    }
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	mainProfile: state.profileReducer
}), {
	// Imported Actions
})(Profile)


