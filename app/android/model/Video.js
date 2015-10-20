/*
*  video model 
*  author:changfuguo@qq.com
*/

//var React = require('react-native');
//var {
  //AsyncStorage,
//} = React;
var BaseModel = require('./Base');
var API_HOT = '/hot/';
var API_HOT_RECOMMEND = '/recommend/';
var API_TOP = '/top/';
var API_PROGRAM = '/program/';
var API_SEARCH = '/';



class Video extends BaseModel {
	constructor (type) {
		super();
		this.type = type || this.type || Video.videoTypies[0].name;
	}	
	hot (type) {
		type = type || this.type;
		return super.getData(API_HOT, {type: type});
	}
	recommend () {
		return super.getData(API_HOT_RECOMMEND);
	}
	top (params) {
		var newParam = {};
		newParam.pagesize = params.pagesize || 20;
		newParam.pageindex = params.pageindex || 1;
		newparam.type = params.type || this.type;
		return super.getData(API_TOP, newParam);
	}
	programe (id) {
		return super.getData(API_PROGRAME, {id:id});
	}
}

Video.videoTypies = [{
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
	}
];

module.exports = Video;
