import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeRouter, Route} from  'react-router-native'
import {Provider} from 'react-redux'
import createStore from './src/store'

import Home from './src/components/Home-view/Home-view'
import Login from './src/components/Login-view/Login-view'
import Profile from './src/components/Profile-view/Profile-view'
import Search from './src/components/Search-view/Search-view'
import Chat from './src/components/Chat-view/Chat-view'
import Camera from './src/components/Camera-view/Camera-view'							

export default class App extends Component {
	render() {
		return (
			<Provider store={createStore}>
				<NativeRouter>
					<View style={styles.container}>
						<Route path='/' exact component={Login}/>
						<Route path='/Home' component={Home}/>
						<Route path='/Profile/:id' component={Profile}/>
						<Route path='/Camera' component={Camera}/>
						<Route path='/Search' component={Search}/>
						<Route path='/Chat' component={Chat}/>
					</View>
				</NativeRouter>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
})
