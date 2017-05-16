import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import PostDetail from './PostDetail'
import Link from "react-router-native/Link";

export default class MainFeed extends Component {



    renderList() {
     return this.props.list.map((post, i) => {
         return <PostDetail  style={{borderWidth:5, borderColor:"black", borderBottom:1, elevation:1}} currentUser={this.props.currentUser} key={i} post={post}/>
     })

    }

    render() {

        return (
            <View>
                {this.props.list.length > 0 &&
                <View>{this.renderList()}</View>
                }
                {this.props.list.length < 1 &&
                    <View style={styles.outerNoFollowers}>
                        <View style={styles.noFollowersView}>
                            <Ionicons underlayColor="grey" name='ios-home-outline' size={52} color='black'/>
                            <View>
                                <Text style={{textAlign:"center"}}>Welcome to Instasham</Text>
                                <Text style={styles.noFollowerstext}>When you add followers you will see posts from them here.</Text>
                            </View>
                            <Link style={styles.findButton} to="/Search" underlayColor="transparent" ><Text style={styles.findButtonText}>Find your Friends Here</Text></Link>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    outerNoFollowers:{
      alignSelf:"center",
    },
    noFollowersView:{
        marginTop:70,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 70,
        borderWidth:2,
        borderColor:"black",
        backgroundColor:"white",
        height:260,
        width:300
    },
    noFollowerstext:{
        color:"grey",
        marginTop:5,
        padding:10,
        fontSize:20,
    },
    findButton:{
        marginTop:3,
      backgroundColor:"#3897f0",
        paddingRight:15,
        paddingLeft:15,
        paddingTop:3,
        paddingBottom:3
    },
    findButtonText:{
        color:"white",
        textAlign:"center"
    },
});

