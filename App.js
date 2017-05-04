import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeRouter, Route} from  'react-router-native'
import Login from './src/components/Login-view'
import Profile from './src/components/Profile-view/Profile-view'
import Provider from 'react-redux/src/components/Provider'
import createStore from './src/store'
import Home from './src/components/Home-view/Home-view'
import Camera from './src/components/Camera-view'
import Search from './src/components/Search-view'
import Chat from './src/components/Chat-view/Chat-view'
import Nav from './src/components/Nav'

export default class App extends Component {
	render() {
		return (
			<Provider store={createStore}>
				<NativeRouter>
					<View style={styles.container}>
						<Route path='/login'  component={Login}/>
						<Nav>
							<Route path='/' exact component={Home}/>
							<Route path='/Profile' component={Profile}/>
							<Route path='/Camera' component={Camera}/>
							<Route path='/Search' component={Search}/>
							<Route path='/Chat' component={Chat}/>
						</Nav>
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
