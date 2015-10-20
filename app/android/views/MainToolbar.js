'use strict';

/*
* home toolbar :[home,category,search,user,setting]
*/

var React = require('react-native');

var {
  AppRegistry,
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  ToastAndroid,
} = React;

var SwitchAndroid = require('SwitchAndroid');
var ToolbarAndroid = require('ToolbarAndroid');
var statusBarSize = Platform.OS == 'ios' ? 10 : 0;

// Const menu config 
var CONST_MENUS = [
		{icon:'home',text:'主页',value:'home',},
		{icon:'list_ol',text:'分类',value:'list_ol'},
		{icon:'search',text:'搜索',value:'search'},
		{icon:'user',text:'用户中心',value:'user'},
		{icon:'cog',text:'设置',value:'settings'},
	];

var MainToolbar = React.createClass({
	getInitialState: function () {
		return {
			active: 'home',
			isLoading: true,
		};
	},
	onSelect : function (name) {
		this.setState({active:name});
		this.props.onselect(name);
	},
	isActive(menu){
		return menu === this.state.active;	
	},
	render: function () {
		var TouchableElement = TouchableHighlight;
		if (Platform.OS === 'android') {
			TouchableElement = TouchableNativeFeedback;	
		}
		return (
			<View {...this.props}>
				<View style={styles.actionsContainer}>
				<TouchableElement onPress={()=> this.onSelect('home')}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
									<Image source = {this.isActive('home') ? require('image!ic_home_active') : require('image!ic_home')} style={styles.actionIcon}/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText, this.isActive('home') ? styles.actionActive : '']}>
										主页
									</Text>
								</View>
							</View>
					</TouchableElement>
					<TouchableElement onPress={()=> this.onSelect('list_ol')}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
									<Image source = {this.isActive('list_ol') ? require('image!ic_list_ol_active'):require('image!ic_list_ol')} style={styles.actionIcon}/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText, this.isActive('list_ol') ? styles.actionActive : '']}>
										分类
									</Text>
								</View>
							</View>
					</TouchableElement>
					<TouchableElement onPress={()=> this.onSelect('search')}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
									<Image source = {this.isActive('search') ? require('image!ic_search_active') : require('image!ic_search')} style={styles.actionIcon}/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText, this.isActive('search') ? styles.actionActive : '']}>
										搜索
									</Text>
								</View>
							</View>
					</TouchableElement>
					<TouchableElement onPress={()=> this.onSelect('user')}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
									<Image source = {this.isActive('user') ? require('image!ic_user_active') : require('image!ic_user')} style={styles.actionIcon}/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText,this.isActive('user') ? styles.actionActive : '']}>
										用户
									</Text>
								</View>
							</View>
					</TouchableElement>
					<TouchableElement onPress={()=> this.onSelect('cog')}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
									<Image source = { this.isActive('cog')? require('image!ic_cog_active'):require('image!ic_cog')} style={styles.actionIcon}/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText,this.isActive('cog') ? styles.actionActive:'']}>
										设置
									</Text>
								</View>
							</View>
					</TouchableElement>
				</View>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	actionsContainer: {
		height: 56,
		paddingTop: statusBarSize,
		flexDirection: 'row',
		borderTopWidth:1,
		borderTopColor:'#999999',
		backgroundColor:'#f4f4f4',
		alignItems: 'center',
	},
	actionActive: {
		color:'#0a78eb'
	},
	actionIconRow:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	actionIcon: {
		width:32,
		height:32,
		flex:1,
		marginLeft: 8,
		marginRight: 8,
		flexDirection: 'row',
	},
	titleContainer: {
		flex: 1,
		alignSelf: 'center',
		backgroundColor: 'transparent'
	},
	actionText:{
		color: '#888888',
		textAlign: 'center'
	},
	actionItem: {
		flex: 1,
		height: 56,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor:'transparent',
	},
});

module.exports = MainToolbar;
