import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Link} from  'react-router-native';

export default class User extends Component{
    render(){
        // console.log('user' ,this.props.user)
        return(
                <View style={styles.pageView}>
                    <View style={styles.profileImageAndName}>
                        <Image style={styles.image} source={{uri: this.props.user.imageurl}} />
                        <Text style={styles.name}>{this.props.user.username}</Text>
                    </View>

                    <View style={styles.linksView}>
                        <View style={styles.links}>
                            <Link style={styles.posts_count}><Text>{this.props.following_count.post_count}</Text></Link>
                            <Link style={styles.posts}><Text>posts</Text></Link>
                        </View>
                        <View style={styles.links}>
                            <Link style={styles.posts_count}><Text>{this.props.following_count.follwer_count}</Text></Link>
                            <Link style={styles.posts}><Text>followers</Text></Link>
                        </View>
                        <View style={styles.links}>
                            <Link style={styles.posts_count}><Text>{this.props.following_count.following_count}</Text></Link>
                            <Link style={styles.posts}><Text>following</Text></Link>
                        </View>
                     </View>
                 </View>
        )
    }
}

const styles = StyleSheet.create({
    pageView:{
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#919191',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    profileImageAndName:{
        flexDirection: 'column',
    },
    name: {
        fontSize: 14,
    },
    image:{
        width: 90,
        height: 90,
        borderRadius: 50
    },
    linksView:{
        flexDirection: 'row',
        alignItems:"center"

    },
    links:{
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems:"center"
    },
    posts_count:{
    },
    posts:{
        marginLeft:5,
        marginRight: 5
    }
});