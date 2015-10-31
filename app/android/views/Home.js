'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
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

var ToolbarAndroid = require('ToolbarAndroid');
var toolbarActions = [
  {title: 'Create', icon: require('image!ic_user_active'), show: 'always'},
  {title: 'Filter'},
  {title: 'Settings', icon: require('image!ic_cog_active'), show: 'always'},
];

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
		name: '专题',
		value: 'recommend'
	}];
var videoTypies = CONST_BARS;
var TimerMixin = require('react-timer-mixin');
var stylesHotCell = StyleSheet.create({
        toolbar: {
            backgroundColor: '#e9eaed',
            height: 30,
         },
		hotrow: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
		viewcell: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 100,
			height: 180,
		},
		hotblock: {
			flex: 1,
			flexDirection: 'column' ,
		},
		cover:{
			width:100,
			height:130,
			resizeMode: 'cover',
		},
		name: {
			fontSize: 12,
			color: '#666',
			height:15,
		},
		brief: {
			fontSize: 10,
			color: '#999',
			height:30
		}
	});

var HotCell = React.createClass({
	
		getInitialState () {
			return {
				name: this.props.name,
				items: this.props.items,
				throat: this.props.throat || 3
			}
		},

		componentDidMount(){
			this.name = this.props.name;
			this.items = this.props.items;
		},
		renderViewCell(cell) {
			var TouchableElement = TouchableHighlight;
			if (Platform.OS === 'android') {
				TouchableElement = TouchableNativeFeedback;	
			}
			return (
				<TouchableElement onPress={()=>this.onSelect(cell)}>
					<View style={stylesHotCell.viewcell}>
						<Image source={{uri:cell.vthumburl}} style={stylesHotCell.cover} />
						<Text style={stylesHotCell.name}>{cell.programname}</Text>
						<Text style={[stylesHotCell.brief,]} numberOfLines= {2} >{cell.shortdesc}</Text>
					</View>
				</TouchableElement>
			);

		},
		onSelect(cell){
			ToastAndroid.show(cell.programname,ToastAndroid.SHORT);
			this.props.navigator && this.props.navigator.push({
			    name:  'video',
                id: cell.id,
                video: cell

			});
		},
		renderHotCellRow(rows) {
			
			var TouchableElement = TouchableHighlight;
			if (Platform.OS === 'android') {
				TouchableElement = TouchableNativeFeedback;	
			}
			return(
				<View style = { stylesHotCell.hotrow} >
					{rows.map((row) =>{
						return this.renderViewCell(row);
						//return row.map((cell) => this.renderViewCell(cell))	
					})}
				</View>
			);
		},
		computeCellRows () {
			var cells = this.props.items || [];
			var n = Math.ceil(cells.length / 3);
			var throat = this.state.throat - 0;
			var rows = [];
			for(var i = 1; i <= n; i++) {
				rows.push(cells.slice((i - 1) * throat, i * throat));	
			}
			return rows.map(this.renderHotCellRow);
		
		},
		render(){
			var rows  = this.computeCellRows();
			return (
				<View style={stylesHotCell.hotblock}>
					<Text>{this.props.name}</Text>
					{rows}
				</View>
			);	
		}
	});


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
		},
		renderHots(movie){
			return (<HotCell key={'hotcell_' + movie.id} name={movie.name} items={movie.list} navigator={this.props.navigator}/>);
		},
		fetchVideos(){
			var videoType = videoTypies[this.state.currentPage];
			var value = videoType.value;

			fetch('http://doukantv.com/api/hot/?type=' + value)
				.then((res)=>res.json())
				.then((res)=>{
					var temp ={};
					temp[value] = res.result;
					this.setState(temp)
				}).catch((err)=>{
					ToastAndroid.show('len:' + res.result.length,ToastAndroid.SHORT);
				})

		},
		onChange (data) {
			this.setState({currentPage: data.i - 0});
			this.fetchVideos();
		},

		render() {
			return (
				<View style={styles.container}>
					<ScrollableTabView  afterChanged={this.onChange} renderTabBar={() => <HomeTabBar />}>
						<ScrollView tabLabel='电影' style={styles.tabView}>
							{this.state.movie.map((movie)=>{
								return (
									<View style={styles.card}>
										{this.renderHots(movie)}
									</View>
								);
							})}
						</ScrollView>
						<ScrollView tabLabel='电视剧' style={styles.tabView}>
							{this.state.tv.map((movie)=>{
								return (
									<View style={styles.card}>
										{this.renderHots(movie)}
									</View>
								);
							})}
						</ScrollView>
						<ScrollView tabLabel='综艺' style={styles.tabView}>
							{this.state.zy.map((movie)=>{
								return (
									<View style={styles.card}>
										{this.renderHots(movie)}
									</View>
								);
							})}

						</ScrollView>
						<ScrollView tabLabel='动漫' style={styles.tabView}>
							{this.state.katong.map((movie)=>{
								return (
									<View style={styles.card}>
										{this.renderHots(movie)}
									</View>
								);
							})}

						</ScrollView>
						<ScrollView tabLabel='专题' style={styles.tabView}>
							{this.state.recommend.map((movie)=>{
								return (
									<View style={styles.card}>
										<Text>{movie.name}--{movie.list.length}</Text>
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
    padding: 0,
  },
  card: {
    backgroundColor: 'transparent',
    padding: 15 ,
	paddingTop:5
  },
});

var moviesMock =  {
    "result": [{
        "list": [{
            "craw": "\u90fd\u770b\u5f71\u89c6\u5347\u7ea7",
            "episode": null,
            "vthumburl": "http://m1.app111.com/AppImg/160x160/2013/01/03/5821308501411146159554.jpg",
            "programname": "\u90fd\u770b\u5f71\u89c6\u5347\u7ea7",
            "shortdesc": "\u2764\u3010\u4fee\u590d\u9ed1\u5c4f\u3011\u63d0\u5347\u4e0b\u8f7d\u901f\u5ea6",
            "id": 98928
        },
        {
            "craw": "\u5a1c\u5854\u4e3d\u00b7\u6ce2\u7279\u66fc/\u827e\u4ec0\u987f\u00b7\u5e93\u5f7b/\u51ef\u6587\u00b7\u514b\u83b1\u6069/\u52a0\u5229\u00b7\u827e\u5c14\u7ef4\u65af/\u683c\u91cc\u5854\u00b7\u683c\u6587\u683c/\u857e\u514b\u00b7\u8d1d\u5c14/\u5965\u8389\u8587\u00b7\u745f\u5c14\u6bd4/",
            "episode": null,
            "vthumburl": "http://p1.qhimg.com/d/dy_98e5a8556de97baf23e2c28ff171ad4f.",
            "programname": "\u65e0\u6027\u4e0d\u7231",
            "shortdesc": "\u4e00\u591c\u70ae\u53cb\u7adf\u6210\u7737\u5c5e",
            "id": 5213
        },
        {
            "craw": "\u6768\u5e42/\u90ed\u91c7\u6d01/\u9648\u5b66\u51ac/\u90ed\u78a7\u5a77",
            "episode": null,
            "vthumburl": "http://p2.qhimg.com/t01e2bc951b19fc0d1d.jpg",
            "programname": "\u5c0f\u65f6\u4ee34\uff1a\u7075\u9b42\u5c3d\u5934",
            "shortdesc": "\u65f6\u4ee3\u5bb6\u65cf\u6325\u6cea\u544a\u522b",
            "id": 108495
        },
        {
            "craw": "\u827e\u4f26\u00b7\u827e\u514b\u54c8\u7279/\u4f0a\u51af\u5a1c\u00b7\u65af\u7279\u62c9\u970d\u592b\u65af\u57fa/Miranda Otto/\u6bd4\u5c14\u00b7\u5948\u4f0a/\u6770\u00b7\u79d1\u7279\u5c3c",
            "episode": null,
            "vthumburl": "http://pic6.qiyipic.com/image/20150713/a8/21/v_109287044_m_601_m1_195_260.jpg",
            "programname": "\u5c60\u9b54\u6218\u58eb \u56fd\u8bed",
            "shortdesc": "\u4eba\u795e\u9b54\u4e09\u754c\u7a7f\u8d8a",
            "id": 118054
        },
        {
            "craw": "\u9648\u610f\u6db5/\u7aa6\u9a81/\u6768\u7950\u5b81/\u5b8b\u4f0a\u4eba",
            "episode": null,
            "vthumburl": "http://p4.qhimg.com/t01e28d968e8828b007.jpg",
            "programname": "\u65b0\u6b65\u6b65\u60ca\u5fc3",
            "shortdesc": "",
            "id": 105156
        },
        {
            "craw": "\u767d\u767e\u4f55/\u5434\u5f66\u7956/\u5f20\u5b50\u8431/\u674e\u5a9b",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t017184ee8da394832a.jpg",
            "programname": "\u6eda\u86cb\u5427\uff01\u80bf\u7624\u541b",
            "shortdesc": "",
            "id": 105531
        },
        {
            "craw": "\u514b\u91cc\u65af\u00b7\u666e\u62c9\u7279/\u6731\u8fea\u00b7\u683c\u96f7\u5c14/\u5e03\u83b1\u4e1d\u00b7\u8fbe\u62c9\u65af\u00b7\u970d\u534e\u5fb7/\u6587\u68ee\u7279\u00b7\u591a\u8bfa\u8d39\u5965",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t01eb62b3eab867f4d6.jpg",
            "programname": "\u4f8f\u7f57\u7eaa\u4e16\u754c",
            "shortdesc": null,
            "id": 108536
        },
        {
            "craw": "\u672a\u77e5",
            "episode": null,
            "vthumburl": "http://img36.pplive.cn/2014/09/25/13313116998_230X306.jpg",
            "programname": "\u6800\u5b50\u82b1\u5f00",
            "shortdesc": null,
            "id": 106216
        },
        {
            "craw": "\u54c6\u5566A\u68a6/\u91ce\u6bd4\u5927\u96c4/\u6e90\u9759\u9999/\u521a\u7530\u6b66/\u9aa8\u5ddd\u5c0f\u592b",
            "episode": null,
            "vthumburl": "http://s.wasu.tv/mrms/manage/images/201506/30/559256a65a72a.jpg",
            "programname": "\u54c6\u5566A\u68a6\uff1a\u4f34\u6211\u540c\u884c \u56fd\u8bed",
            "shortdesc": null,
            "id": 122181
        }],
        "name": "\u7cbe\u5f69\u63a8\u8350"
    },
    {
        "list": [{
            "craw": "\u6768\u5e42/\u90ed\u91c7\u6d01/\u9648\u5b66\u51ac/\u90ed\u78a7\u5a77",
            "episode": null,
            "vthumburl": "http://p2.qhimg.com/t01e2bc951b19fc0d1d.jpg",
            "programname": "\u5c0f\u65f6\u4ee34\uff1a\u7075\u9b42\u5c3d\u5934",
            "shortdesc": "\u65f6\u4ee3\u5bb6\u65cf\u6325\u6cea\u544a\u522b",
            "id": 108495
        },
        {
            "craw": "\u674e\u6613\u5cf0/\u5f20\u6167\u96ef/\u5c3c\u5764/\u674e\u739f",
            "episode": null,
            "vthumburl": "http://p8.qhimg.com/t01103fa1edea6e1e05.jpg",
            "programname": "\u6800\u5b50\u82b1\u5f002015",
            "shortdesc": "\u674e\u6613\u5cf0\u53d8\u56fd\u6c11\u7537\u53cb",
            "id": 106241
        },
        {
            "craw": "\u9648\u8d6b/\u5e38\u8fdc/\u59da\u661f\u5f64/\u5f20\u4f51\u8d6b",
            "episode": null,
            "vthumburl": "http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/a/ami6svxx9nst264.jpg",
            "programname": "\u4e00\u8def\u5411\u524d",
            "shortdesc": "\u9648\u8d6b\u4e0a\u6f14\u529e\u516c\u5ba4\u604b\u60c5",
            "id": 107346
        },
        {
            "craw": "\u79e6\u660a/\u674e\u68a6/\u5218\u96c5\u745f/\u90fd\u65e5\u662d\u65e5\u683c\u56fe",
            "episode": null,
            "vthumburl": "http://p6.qhimg.com/t01f50159b389e24df8.jpg",
            "programname": "\u6447\u6eda\u82f1\u96c4",
            "shortdesc": "\u63ed\u9732\u6700\u771f\u5b9e\u7684\u6447\u6eda\u9752\u6625",
            "id": 111002
        },
        {
            "craw": "\u5468\u6da6\u53d1/\u5f20\u5bb6\u8f89/\u5218\u5609\u73b2/\u4f59\u6587\u4e50",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t014c9945a4893897cc.jpg",
            "programname": "\u6fb3\u95e8\u98ce\u4e912",
            "shortdesc": "\u5468\u6da6\u53d1\u8054\u624b\u5f20\u5bb6\u8f89\u518d\u73b0\u8d4c\u795e\u98ce\u91c7",
            "id": 108293
        },
        {
            "craw": "\u5434\u9547\u5b87/\u59da\u661f\u5f64/\u9a6c\u5929\u5b87/\u674e\u83c1",
            "episode": null,
            "vthumburl": "http://p9.qhimg.com/t011d46892cfa63cfd3.jpg",
            "programname": "\u571f\u8c6a520",
            "shortdesc": "\u5434\u9547\u5b87\u5f00\u5766\u514b\u72c2\u6492\u94b1",
            "id": 104485
        },
        {
            "craw": "\u827e\u4f26\u00b7\u827e\u514b\u54c8\u7279/\u4f0a\u51af\u5a1c\u00b7\u65af\u7279\u62c9\u970d\u592b\u65af\u57fa/Miranda Otto/\u6bd4\u5c14\u00b7\u5948\u4f0a/\u6770\u00b7\u79d1\u7279\u5c3c",
            "episode": null,
            "vthumburl": "http://pic6.qiyipic.com/image/20150713/a8/21/v_109287044_m_601_m1_195_260.jpg",
            "programname": "\u5c60\u9b54\u6218\u58eb \u56fd\u8bed",
            "shortdesc": "\u4eba\u795e\u9b54\u4e09\u754c\u7a7f\u8d8a",
            "id": 118054
        },
        {
            "craw": "\u67ef\u5b87\u7eb6/\u6881\u6d1b\u65bd/\u5f20\u5b5d\u5168/\u674e\u5fc3\u6d01",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t0191278ace0cf4ba5a.jpg",
            "programname": "\u5ff5\u5ff5",
            "shortdesc": "\u547d\u4e2d\u6ce8\u5b9a\u6765\u8650\u4f60",
            "id": 103039
        },
        {
            "craw": "\u54c1\u51a0/\u66fe\u6cf3\u918d/\u97e9\u5b9d\u51db/\u9648\u5cf0",
            "episode": null,
            "vthumburl": "http://p7.qhimg.com/t0149c978f35ffd7517.jpg",
            "programname": "\u593a\u547d\u65c5\u884c",
            "shortdesc": "\u54c1\u51a0\u8de8\u754c\u6311\u6218\u60ca\u609a\u7247",
            "id": 107830
        },
        {
            "craw": "\u5409\u59c6\u00b7\u5e15\u68ee\u65af/\u857e\u54c8\u5a1c/\u8a79\u59ae\u5f17\u00b7\u6d1b\u4f69\u5179/\u9a6c\u7279\u00b7\u743c\u65af",
            "episode": null,
            "vthumburl": "http://p4.qhimg.com/t014f64608434b966ec.jpg",
            "programname": "\u75af\u72c2\u5916\u661f\u4eba",
            "shortdesc": "\u8c22\u8033\u6735\u79d2\u53d8\u5916\u661f\u4eba",
            "id": 104380
        },
        {
            "craw": "\u6797\u6c38\u5065/\u97e9\u96ea/\u5b8b\u5141\u7693/\u5b8b\u4e39\u4e39",
            "episode": null,
            "vthumburl": "http://p9.qhimg.com/t0196e4090da347afc6.jpg",
            "programname": "\u5973\u795e\u8ddf\u6211\u8d70",
            "shortdesc": "\u6797\u6c38\u5065\u5f81\u670d\u97e9\u96ea",
            "id": 104744
        },
        {
            "craw": "\u5434\u9547\u5b87/\u4efb\u8fbe\u534e/\u53e4\u5de8\u57fa/\u8c2d\u8000\u6587",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t01e11644cb4192a13c.jpg",
            "programname": "\u51b2\u950b\u8f66",
            "shortdesc": "\u5434\u9547\u5b87\u7b56\u5212\u60ca\u5929\u9634\u8c0b",
            "id": 103517
        },
        {
            "craw": "\u5434\u9547\u5b87/\u4f59\u7537/\u91d1\u6c4e/\u53e4\u529b\u5a1c\u624e",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t01ddc0e682e4bb7168.jpg",
            "programname": "\u7231\u6211\u5c31\u966a\u6211\u770b\u7535\u5f71",
            "shortdesc": "\u5434\u9547\u5b87\u5999\u8ba1\u8ffd\u4f59\u7537",
            "id": 103088
        },
        {
            "craw": "\u9648\u4f1f\u9706/\u8d75\u67ef/\u674e\u83f2\u513f/\u6e21\u8fb9\u5948\u7eea\u5b50",
            "episode": null,
            "vthumburl": "http://p9.qhimg.com/t016878ada1c10ecbf1.jpg",
            "programname": "\u640f\u51fb\u8ff7\u57ce",
            "shortdesc": "\u9648\u4f1f\u9706\u989c\u503c\u7206\u8868\u79c0\u8eab\u6750",
            "id": 111525
        },
        {
            "craw": "\u5434\u4eac/\u4f59\u7537/\u65af\u79d1\u7279\u00b7\u963f\u91d1\u65af/\u51ef\u6587\u00b7\u674e",
            "episode": null,
            "vthumburl": "http://p8.qhimg.com/t01bb76444f85e9edea.jpg",
            "programname": "\u6218\u72fc 2015",
            "shortdesc": "\u519b\u65c5\u5de8\u5236\u70ed\u8840\u7206\u68da",
            "id": 106484
        },
        {
            "craw": "\u66fe\u5fd7\u4f1f/\u738b\u7956\u84dd/\u9648\u5609\u6866/\u9648\u9759",
            "episode": null,
            "vthumburl": "http://p9.qhimg.com/t0108ac20ac292f602f.jpg",
            "programname": "\u5409\u661f\u9ad8\u71672015",
            "shortdesc": "\u5c71\u5be8\u661f\u7237\u9999\u6e2f\u5947\u9047",
            "id": 100334
        },
        {
            "craw": "\u8fde\u59c6\u00b7\u5c3c\u68ee/\u798f\u91cc\u65af\u7279\u00b7\u60e0\u7279\u514b/\u6cd5\u7c73\u514b\u00b7\u8a79\u68ee/\u739b\u59ec\u00b7\u683c\u857e\u65af",
            "episode": null,
            "vthumburl": "http://p1.qhimg.com/t01e9da4cc5ada0407a.jpg",
            "programname": "\u98d3\u98ce\u8425\u65513",
            "shortdesc": "\u8fde\u59c6\u00b7\u5c3c\u68ee\u4e0a\u6f1412\u7edd\u6740",
            "id": 108654
        },
        {
            "craw": "\u5c0f\u6c88\u9633/\u7530\u4eae/\u9648\u5c0f\u6625/\u718a\u9edb\u6797",
            "episode": null,
            "vthumburl": "http://p3.qhimg.com/t0167a1c89087499945.jpg",
            "programname": "\u5c06\u9519\u5c31\u9519",
            "shortdesc": "\u5c0f\u6c88\u9633\u75f4\u604b\u718a\u9edb\u6797",
            "id": 108308
        },
        {
            "craw": "\u6797\u5fd7\u73b2/\u5218\u70e8/\u7406\u67e5\u5fb7\u00b7\u5fb7\u514b\u52d2\u514b/\u6c5f\u758f\u5f71",
            "episode": null,
            "vthumburl": "http://p4.qhimg.com/t01dfbf3cc0cc732840.jpg",
            "programname": "\u5317\u4eac\uff0c\u7ebd\u7ea6",
            "shortdesc": "\u6797\u5fd7\u73b2\u5218\u70e8\u6f14\u7ece\u6700\u7f8e\u8de8\u56fd\u604b",
            "id": 109674
        },
        {
            "craw": "\u5b8b\u6167\u4e54/\u767d\u65e5\u535a/\u59dc\u4e1c\u5143/\u91d1\u7532\u6d19/\u674e\u6210\u6c11/\u66f9\u627f\u7a46/\u8bb8\u4fca\u7855/TaeTiSeo",
            "episode": null,
            "vthumburl": "http://box1.bfimg.com/img/272/786772/51_270*340.jpg",
            "programname": "\u6251\u901a\u6251\u901a\u6211\u7684\u4eba\u751f-\u56fd",
            "shortdesc": "\u5b8b\u6167\u4e54\u59dc\u680b\u5143\u4e00\u543b\u5b9a\u60c5",
            "id": 114389
        },
        {
            "craw": "\u53e4\u5929\u4e50/\u5f20\u7ff0/\u66fe\u5fd7\u4f1f/\u6bdb\u821c\u7b60",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t0179995113cf43eec4.jpg",
            "programname": "\u795e\u63a2\u9a7e\u5230",
            "shortdesc": "\u7f8e\u8273\u67f3\u5ca9\u6492\u5a07\u79d8\u6280",
            "id": 108490
        },
        {
            "craw": "\u5218\u5fb7\u534e/\u4e95\u67cf\u7136/\u5434\u541b\u5982/\u6881\u5bb6\u8f89",
            "episode": null,
            "vthumburl": "http://p3.qhimg.com/t0108ce5f5b35435ff9.jpg",
            "programname": "\u5931\u5b64",
            "shortdesc": "\u534e\u4ed4\u4e95\u5b9d\"\u5982\u7236\u5982\u5b50\"",
            "id": 108218
        },
        {
            "craw": "\u674e\u627f\u70ab/\u5f20\u84dd\u5fc3/\u5218\u6866/\u80e1\u590f",
            "episode": null,
            "vthumburl": "http://p1.qhimg.com/t01cf340d60bb327056.jpg",
            "programname": "\u9ec4\u91d1\u798f\u5c06",
            "shortdesc": "\u674e\u627f\u70ab\u906d\u7f8e\u5973\u5408\u56f4",
            "id": 108428
        },
        {
            "craw": "\u51af\u7ecd\u5cf0/\u7aa6\u9a81/\u6602\u54c8\u59ae\u739b/\u5c39\u94f8\u80dc",
            "episode": null,
            "vthumburl": "http://p8.qhimg.com/t01452a9d79d6ae78b1.jpg",
            "programname": "\u72fc\u56fe\u817e",
            "shortdesc": "\u51af\u7ecd\u5cf0\u6f14\u7ece\u4eba\u72fc\u60c5\u6df1",
            "id": 96779
        },
        {
            "craw": "\u674e\u601d\u5112/\u738b\u7fc0/\u5468\u5a77/\u738b\u9c81",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t01ca75a10477b2097c.jpg",
            "programname": "\u4e00\u4e07\u5e74\u4ee5\u540e",
            "shortdesc": "\u766b\u72c2\u7684\u5947\u5e7b\u4e4b\u65c5",
            "id": 97505
        },
        {
            "craw": "\u732a\u54e5\u4eae/\u6797\u5fc3\u5982/\u674e\u4e1c\u5b66/\u5bc7\u4e16\u52cb",
            "episode": null,
            "vthumburl": "http://p3.qhimg.com/t0128c21a34aea0d87c.jpg",
            "programname": "\u5927\u559c\u4e34\u95e8",
            "shortdesc": "\u738b\u7237\u5a36\u516c\u4e3b\u91cd\u53e3\u5473\u559c\u5267",
            "id": 108217
        },
        {
            "craw": "\u6770\u592b\u00b7\u5e03\u91cc\u5409\u65af/\u672c\u00b7\u5df4\u6069\u65af/\u6731\u4e3d\u5b89\u00b7\u6469\u5c14/\u57fa\u7279\u00b7\u54c8\u7075\u987f",
            "episode": null,
            "vthumburl": "http://p6.qhimg.com/t0193e82e114161509d.jpg",
            "programname": "\u7b2c\u4e03\u5b50",
            "shortdesc": "\u9a71\u9b54\u4eba\u9f99\u6bcd\u5973\u7981\u5fcc\u4e4b\u604b",
            "id": 96682
        },
        {
            "craw": "\u9648\u7fd4/\u82f1\u8fbe/\u6234\u7acb\u5fcd/\u9ec4\u79cb\u751f",
            "episode": null,
            "vthumburl": "http://p6.qhimg.com/t0102372c48d5118b9d.jpg",
            "programname": "\u70ed\u8840\u7537\u4eba\u5e2e",
            "shortdesc": "\u9648\u7fd4\u643a\u5927\u53d4\u6253\u9020\u72d7\u8840\u5144\u5f1f\u8fde",
            "id": 108727
        },
        {
            "craw": "\u7530\u4eae/\u6218\u83c1\u4e00/\u7530\u5f81/\u8042\u946b",
            "episode": null,
            "vthumburl": "http://p1.qhimg.com/t01e22ad3b586c4ef6f.jpg",
            "programname": "\u6d77\u5c9b\u4e4b\u604b",
            "shortdesc": "\u8c01\u52a8\u4e86\u7530\u4eae\u7684\u672a\u5a5a\u59bb",
            "id": 103018
        },
        {
            "craw": "\u90ed\u91c7\u6d01/\u8427\u656c\u817e/\u8d75\u4e3d\u9896/\u51e4\u5c0f\u5cb3",
            "episode": null,
            "vthumburl": "http://p3.qhimg.com/t015c1558126c6bce46.jpg",
            "programname": "\u4e00\u8def\u60ca\u559c",
            "shortdesc": "\u90ed\u91c7\u6d01\u5e8a\u538b\u51e4\u5c0f\u5cb3",
            "id": 96842
        },
        {
            "craw": "\u963f\u6770/\u7687\u8d1e\u5b63/\u5b9d\u6728\u4e2d\u9633/\u5c71\u65b0",
            "episode": null,
            "vthumburl": "http://p3.qhimg.com/t014c4429be2b080894.jpg",
            "programname": "\u5341\u4e07\u4e2a\u51b7\u7b11\u8bdd 2014",
            "shortdesc": "\u9ad8\u80fd\u5410\u69fd\u5927\u6218\u4e00\u89e6\u5373\u53d1",
            "id": 96177
        },
        {
            "craw": "\u6c5f\u4e00\u71d5/\u90d1\u607a/\u4e8e\u7b11/\u5e38\u65b9\u6e90",
            "episode": null,
            "vthumburl": "http://p6.qhimg.com/t01110b8f9b15d607b1.jpg",
            "programname": "\u6709\u79cd\u4f60\u7231\u6211",
            "shortdesc": "\u6c5f\u4e00\u71d5\u90d1\u607a\u593a\u5b50\u5927\u6218",
            "id": 96557
        },
        {
            "craw": "\u59dc\u6587/\u845b\u4f18/\u5468\u97f5/\u8212\u6dc7",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t01d8021af5e4e471bc.jpg",
            "programname": "\u4e00\u6b65\u4e4b\u9065",
            "shortdesc": "\u59dc\u6587\u6253\u9020\u6700\u4e89\u8bae\u8c6a\u534e\u5927\u7247",
            "id": 96174
        },
        {
            "craw": "\u5f20\u6db5\u4e88/\u6797\u66f4\u65b0/\u4f5f\u4e3d\u5a05/\u6881\u5bb6\u8f89/",
            "episode": null,
            "vthumburl": "http://p2.qhimg.com/t0142d3a1a121b664ba.jpg",
            "programname": "\u667a\u53d6\u5a01\u864e\u5c71",
            "shortdesc": "\u5f90\u514b\u643a\u4f17\u661f\u6253\u54cd\u527f\u532a\u6218",
            "id": 21245
        },
        {
            "craw": "\u5a01\u5c14\u00b7\u963f\u5948\u7279/\u5e03\u5170\u767b\u00b7\u8d39\u820d/\u8fde\u59c6\u00b7\u5c3c\u68ee/\u51ef\u745f\u7433\u00b7\u6d77\u683c\u5c14",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t01c028e73361bd11c0.jpg",
            "programname": "\u62a2\u52ab\u575a\u679c\u5e97",
            "shortdesc": "\u677e\u9f20\u201c\u7279\u5de5\u201d\u5446\u840c\u6765\u88ad",
            "id": 96762
        },
        {
            "craw": "\u962e\u7ecf\u5929/\u5468\u51ac\u96e8/\u6768\u5b50\u59d7/\u6768\u6d0b",
            "episode": null,
            "vthumburl": "http://p0.qhimg.com/t0119f5593768faf8d1.jpg",
            "programname": "\u66b4\u8d70\u795e\u63a2",
            "shortdesc": "\u962e\u7ecf\u5929\u53d8\u840c\u766b\u795e\u63a2",
            "id": 96940
        },
        {
            "craw": "\u6768\u9896/\u9648\u8d6b/\u5f20\u9c81\u4e00/\u66f9\u7490",
            "episode": null,
            "vthumburl": "http://p9.qhimg.com/t014de455835944ef80.jpg",
            "programname": "\u5fae\u7231\u4e4b\u6e10\u5165\u4f73\u5883",
            "shortdesc": "\u9648\u8d6b\u6210\u7f16\u5267\u6df1\u591c\u7ea6baby",
            "id": 96175
        },
        {
            "craw": "\u6797\u5fd7\u73b2/\u6881\u5bb6\u8f89/\u949f\u6b23\u6f7c/\u8499\u4ead\u5b9c",
            "episode": null,
            "vthumburl": "http://p4.qhimg.com/t011b9c43f07bb6a5ae.jpg",
            "programname": "\u738b\u724c",
            "shortdesc": "\u8c0d\u6218\u5267\u8fa3\u624b\u6467\u82b1 \u5fd7\u73b2\u53d7\u8650",
            "id": 97657
        },
        {
            "craw": "\u90d1\u9547\u8363/\u67f3\u627f\u9f99/\u91d1\u6b63\u6cf0/\u5434\u8fbe\u6d19/",
            "episode": null,
            "vthumburl": "http://p5.qhimg.com/t01907d401cce4019f9.jpg",
            "programname": "7\u53f7\u623f\u7684\u793c\u7269",
            "shortdesc": "\u65e0\u654c\u7236\u7231\u6e29\u6696\u5168\u4e16\u754c",
            "id": 43575
        },
        {
            "craw": "\u5468\u8fc5/\u4f5f\u5927\u4e3a/\u949f\u6c49\u826f/\u5f20\u6893\u7433",
            "episode": null,
            "vthumburl": "http://p2.qhimg.com/t017c4f53026e3afb58.jpg",
            "programname": "\u6211\u7684\u65e9\u66f4\u5973\u53cb",
            "shortdesc": "\u7edd\u4e16\u6696\u7537VS\u5b66\u9738\u6e23\u7537",
            "id": 96178
        },
        {
            "craw": "\u5d14\u5cb7\u690d/\u67f3\u627f\u9f99/\u8d75\u9707\u96c4/\u664b\u4e45",
            "episode": null,
            "vthumburl": "http://p7.qhimg.com/t016556773ab1e7a4c2.jpg",
            "programname": "\u9e23\u6881\u6d77\u6218",
            "shortdesc": "\u5f71\u5e1d\u5d14\u5cb7\u690d\u9886\u8854\u6297\u6218\u53f2\u8bd7",
            "id": 96179
        },
        {
            "craw": "\u5b89\u4e1c\u5c3c\u5965\u00b7\u73ed\u5fb7\u62c9\u65af/\u8fea\u4f26\u00b7\u9ea6\u514b\u5fb7\u83ab\u7279/\u6885\u5170\u5c3c\u00b7\u683c\u91cc\u83f2\u65af/\u6bd4\u5409\u7279\u00b7\u7ea6\u5c14\u7279\u00b7\u7d22\u4f26\u68ee",
            "episode": null,
            "vthumburl": "http://p8.qhimg.com/t013b8a182504ef839f.jpg",
            "programname": "\u673a\u5668\u7eaa\u5143",
            "shortdesc": "\u4eba\u5de5\u667a\u80fd\u8fdb\u5316\u795e\u901f\u582a\u6bd4\u8d85\u4f53",
            "id": 97061
        },
        {
            "craw": "\u5f6d\u4e8e\u664f/\u4e95\u67cf\u7136/\u738b\u73de\u4e39/\u6d2a\u91d1\u5b9d",
            "episode": null,
            "vthumburl": "http://p2.qhimg.com/t011984516a8c56af2c.jpg",
            "programname": "\u9ec4\u98de\u9e3f\u4e4b\u82f1\u96c4\u6709\u68a6",
            "shortdesc": "baby\u53d8\u5fc3\u673a\u5973\u62a2\u5f6d\u4e8e\u664f",
            "id": 96196
        },
        {
            "craw": "\u9ec4\u5b97\u6cfd/\u9648\u4f1f\u9706/\u8c22\u5929\u534e/\u91d1\u521a",
            "episode": null,
            "vthumburl": "http://p7.qhimg.com/t018198ed6c92653eb9.jpg",
            "programname": "\u7537\u4eba\u4e0d\u53ef\u4ee5\u7a77",
            "shortdesc": "\u7537\u795e\u201c\u5927\u8fde\u840c\u201d",
            "id": 96176
        }],
        "name": "\u70ed\u70b9"
    }]
};

module.exports = Home; 
