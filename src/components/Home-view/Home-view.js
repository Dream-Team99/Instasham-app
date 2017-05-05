import React from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MainFeed from "./subcomponents/MainFeed";
import Nav from '../Nav'
import {connect} from 'react-redux'


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

class Home extends React.Component {

    render() {
        console.log(this.props.redux)
        return (
            <Nav>
                <ScrollView style={styles.mainfeed}>
                    <MainFeed list={dum}/>
                </ScrollView>
            </Nav>
        );
    }
}

const styles = StyleSheet.create({
	
})

export default connect( state=>({ 
	redux: state
}), {
	// Imported Actions
})(Home)
