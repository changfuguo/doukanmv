'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,  
  ToastAndroid,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var Video = require('../model/Video');
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
var videoTypies = CONST_BARS;
var TimerMixin = require('react-timer-mixin');
var Home = React.createClass({
		getInitialState() {
			return {
				isLoading: false,
				movie:  [{name:'list',list:['aa']},{name:'lists',list:['dd']}],
				tv: [],
				zy: [],
				katong: [],
				recommend: [],
				currentPage: 0,
			};
		},
		mixins: [TimerMixin],
		componentDidMount(){
			this.fetchVideos();
			this.setTimeout(()=>{
			this.setState({movie:[{name:"ccc",list:[]}]});
			fetch('http://doukantv.com/api/hot/?type=movie')
				.then((res)=>res.json())
				.then((res)=>{
					this.setState({movie:res.result})
				})
			});
		},
		rendHot(list){
			
			var ls = list.map((item)=>{
					var uri = item && item.vthumburl ? item.vthumburl : null;
					return (
						<View>
							<Image source={{uri: uri}} style={{width:50,height:70}}></Image>
							<Text>{item.programname}-{item.vthumburl}</Text>
						</View>
					);
				});

			return ls;
		},
		fetchVideos(){
			var videoType = videoTypies[this.state.currentPage];
			new Video().hot(videoType.value).then(function(data){
				var temp = {};
				temp[videoType.value] = data.result;
				this.setState(temp);	
			});
		},

		render() {
			return (
				<View style={styles.container}>
					<ScrollableTabView renderTabBar={() => <HomeTabBar />}>
						<ScrollView tabLabel='电影' style={styles.tabView}>
							{this.state.movie.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
										{this.rendHot(movie.list)}
									</View>
								);
							})}
						</ScrollView>
						<ScrollView tabLabel='电视剧' style={styles.tabView}>
							{this.state.tv.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
										{this.rendHot(movie.list)}
									</View>
								);
							})}
						</ScrollView>
						<ScrollView tabLabel='综艺' style={styles.tabView}>
							{this.state.zy.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
										{this.rendHot(movie.list)}
									</View>
								);
							})}
						
						</ScrollView>
						<ScrollView tabLabel='动漫' style={styles.tabView}>
							{this.state.katong.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
										{this.rendHot(movie.list)}
									</View>
								);
							})}
						
						</ScrollView>
						<ScrollView tabLabel='专题' style={styles.tabView}>
							{this.state.recommend.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
										{this.rendHot(movie.list)}
									</View>
								);
							})}
						
						</ScrollView>

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
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

module.exports = Home; 
