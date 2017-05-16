import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';
import Link from "react-router-native/Link";



export default class Photos extends Component{

    render(){
        const userPhotoList = this.props.photos.map((p,i)=>  <Link key={i} to={"/Post/" + p.id}><Image style={
            {width:Dimensions.get('window').width / 3,
                height:125,
                borderWidth:2, borderColor:"white"}} source={{uri: p.url}} /></Link>);
        return(
            <View style={styles.photos}>
                {userPhotoList}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    photos:{
        alignSelf:"stretch",
        flexDirection: "row",
        alignItems:"center",
        flexWrap:"wrap",

    },


});

