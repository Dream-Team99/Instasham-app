import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route} from  'react-router-native';
import Login from './src/components/Login-view';
import Home from "./src/components/Home-view/Home-view";
import Profile from './src/components/Profile-view/Profile-view';
import Camera from "./src/components/Camera-view"
import Search from "./src/components/Search-view"
import Chat from "./src/components/Chat-view/Chat-view"

export default class App extends Component {
    render() {
        return (
            <NativeRouter>
                <View>
                    <Route path='/Login'  component={Login}/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/Profile' component={Profile}/>
                    <Route path='/Camera' component={Camera}/>
                    <Route path='/Search' component={Search}/>
                    <Route path='/Chat' component={Chat}/>
                </View>
            </NativeRouter>
        )
    }
}

const styles ={
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
