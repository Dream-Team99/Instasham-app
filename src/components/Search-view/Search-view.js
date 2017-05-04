
import React, {Component} from 'react';
import {View, Image, StyleSheet, ScrollView, TextInput,Text} from 'react-native';
import {connect} from 'react-redux';
import {searchForUsers} from "../../reducers/searchReducer"
import Profiles from "./subcomponents/Profiles"
import Header from "../Header-nav";
import Bottom from "../Bottom-nav"



class Search extends Component{

    render(){
        return(
            <View>
                <Header/>
                <TextInput
                    style={styles.input}
                    onChangeText={(e)=> this.props.searchForUsers(e)}
                    value={this.props.state.SearchText}
                />
                <ScrollView>
                    <Profiles users={this.props.state.Profiles}/>
                </ScrollView>
                <Bottom/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
    }
});

function mapStateToProps(state) {
    return{
        state: state.searchReducer
    }
}

export default connect(mapStateToProps,{searchForUsers})(Search)
