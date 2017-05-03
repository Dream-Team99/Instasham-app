import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route} from  'react-router-native';
import Login from './src/components/Login-view';
import Profile from './src/components/Profile-view/Profile-view'
import Camera from './src/components/Camera'
import Provider from "react-redux/src/components/Provider";
import createStore from './src/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore}>
            <NativeRouter>
              <View>
                <Route path='/' exact component={Login}/>
                <Route path='/Profile' component={Profile}/>
              </View>
            </NativeRouter>
            </Provider>
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
