
import React from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from "../Header-nav";
import Bottom from "../Bottom-nav"
import MainFeed from "./subcomponents/MainFeed";

let dum = [{
    name: 'bo',
    img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkkDpCi4LO05vygbu4toW_XMv9cpiT_Q_h4aoKvz2DopWfqRNERJj0CA'
},
    {
        name: 'yo',
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkkDpCi4LO05vygbu4toW_XMv9cpiT_Q_h4aoKvz2DopWfqRNERJj0CA'
    },
    {
        name: 'flo',
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkkDpCi4LO05vygbu4toW_XMv9cpiT_Q_h4aoKvz2DopWfqRNERJj0CA'
    }
]

export default class Home extends React.Component {

    render() {
        return (
            <View>
                <Header/>
                <ScrollView style={styles.mainfeed}>
                   <MainFeed list={dum}/>
                </ScrollView>
                    <Bottom />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainfeed:{
        height:470
    }
});

