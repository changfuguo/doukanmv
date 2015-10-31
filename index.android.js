/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  ToastAndroid,
} = React;

var SplashScreen = require('./app/android/views/SplashScreen');
var TimerMixin = require('react-timer-mixin');
var ToolbarAndroid = require('ToolbarAndroid');
var MainToolbar = require('./app/android/views/MainToolbar');
var MovieScreen = require('./app/android/views/MovieScreen');
var _navigator;
var Home = require('./app/android/views/Home');
var CategoryList = require('./app/android/views/CategoryList');

var doukanmv = React.createClass({
	mixins: [TimerMixin],
	getInitialState : function () {
		return {
			splashed: false,
			currentRoute :{
				name :'home'
			}
		};
	},
	componentDidMount: function () {
		this.setTimeout(
			() => {
				this.setState({splashed: true});
			},
			2000,
		);
		console.log('aaa in mount');
	},
	RouteManager: function (route, navigationOperations, onComponentRef) {
		_navigator = navigationOperations;
		var name = route.name;

		if (name == 'home') {
			return (
				<View style={styles.container}>
					<Home  navigator ={navigationOperations}/>
				</View>
			);
		} else if (name === 'list_ol') {
			return (
				<View style={styles.container}>
    				<CategoryList navigator ={navigationOperations}/>
				</View>
			);
		} else if (name === 'search') {
			return (
				<View style={styles.container}>
					<Text>search</Text>
				</View>
			);
		} else if (name === 'user') {
			return (
				<View style={styles.container}>
					<Text>user</Text>
				</View>
			);
		} else if (name ==='settings') {
			return (
				<View style={styles.container}>
					<Text>settings</Text>
				</View>
			);
		} else if (name === 'video') {
			return (<MovieScreen navigator= {navigationOperations} id = {route.id} video={route.video} />);
		}
	},
	onSelectMenu : function (name) {
		this.setState({currentRoute:{name:name}});
		if (_navigator && _navigator.getCurrentRoutes().length > 0) {
			_navigator.replace({name:this.state.currentRoute.name});
		}
		ToastAndroid.show('click ' + name,ToastAndroid.SHORT);
	},
	render: function() {
		if(!this.state.splashed) {
			return (
				<SplashScreen />
			);
		}
		var test = [{name:"chang"}];
		return (
			<View style={styles.container}>
				<Navigator
					style={styles.container}
					initialRoute={this.state.currentRoute}
					configureScene={() => Navigator.SceneConfigs.FadeAndroid}
					renderScene={this.RouteManager}
				>
				</Navigator>
				<MainToolbar
					style={styles.maintoolbar}
					currentroute={this.state.currentRoute} onselect={this.onSelectMenu}/>
			</View>
			);
		}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	maintoolbar: {
		height: 56,
		position: 'absolute',
		left: 0 ,
		right: 0,
		bottom: 0
	},
});

AppRegistry.registerComponent('doukanmv', () => doukanmv);
