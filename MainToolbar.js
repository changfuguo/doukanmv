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

var {Icon,} = require('react-native-icons');
var SwitchAndroid = require('SwitchAndroid');
var ToolbarAndroid = require('ToolbarAndroid');
var statusBarSize = Platform.OS == 'ios' ? 10 : 0;

// Const menu config 
var CONST_MENUS = [
		{icon:'home',text:'主页',value:'home'},
		{icon:'list-ol',text:'分类',value:'category'},
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
	render: function () {
		var TouchableElement = TouchableHighlight;
		if (Platform.OS === 'android') {
			TouchableElement = TouchableNativeFeedback;	
		}
		var menus=CONST_MENUS.map((menu) =>{
				var icon = 'fontawesome|' + menu.icon;
				var isCurrent = menu.value == this.state.active;

				return (<TouchableElement onPress={()=> this.onSelect(menu.value)}>
							<View style={styles.actionItem}>
								<View style={styles.actionIconRow}>
										<Icon 
											name = {icon}
											size={30}
											color={isCurrent ? '#0a78eb' :'#999999'}
											style={styles.actionIcon}
										/>
								</View>
								<View style={styles.actionIconRow}>
									<Text style={[styles.actionText,isCurrent ? styles.actionActive:'']}>
										{menu.text}
									</Text>
								</View>
							</View>
					</TouchableElement>
				);
		 });

		return (
			<View {...this.props}>
				<View style={styles.actionsContainer}>
				{menus}
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
