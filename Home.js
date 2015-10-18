'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} = React;

var ScrollableTabView = require('react-native-scrollable-tab-view');
var HomeTabBar = require('./HomeTabBar');
var deviceWidth = Dimensions.get('window').width;

var CONST_BARS =[{
		name: '电影',
		value: 'movie',
	},
	{
		name: '电视剧',
		value: 'tv'
	},{
		name: '综艺',
		value: 'zy'
	},{
		name: '动漫',
		value: 'katong'
	},{
		name: '直播',
		value: 'live'
	}];
var Home = React.createClass({
		render() {
			var bars = CONST_BARS.map((tab, i) => {
				return (
					<ScrollView tabLabel={tab.name} style={styles.tabView}>
						<View style={styles.card}>
								<Text>News</Text>
						</View>
					</ScrollView>	
				);	
			});

			return (
				<View style={styles.container}>
					<ScrollableTabView renderTabBar={() => <HomeTabBar />}>
						{bars}
					</ScrollableTabView>
			  </View>
			);
	  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    width: deviceWidth,
    padding: 10,
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

module.exports = Home; 
