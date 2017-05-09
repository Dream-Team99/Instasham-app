import React, {Component} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import Link from "react-router-native/Link";



export default class Photos extends Component{

    render(){
        // console.log(this.props.photos)
        const userPhotoList = this.props.photos.map((p,i)=>  <Link key={i} to={"/Post/" + p.id}><Image style={styles.photo} source={{uri: p.url}} /></Link>);
        return(
            <View style={styles.photos}>
                {userPhotoList}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    photos:{
        flexDirection: "row",
        alignItems:"center",
        flexWrap:"wrap",

    },
    photo:{
        width: 120,
        height: 120,
        borderWidth:2,
        borderColor:"white"
    }

});

