 'use strict'
var videoTypies=[{name:'电影',value:'movie'},{name:'电视剧',value:'tv'},{name:'综艺',value:'zy'},{name:'动漫',value:'katong'}];
var React = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
    ListView,
    ToastAndroid,
} = React;
var CACHE_DATA = {

};

videoTypies.map((video) =>CACHE_DATA[video.value] = {loading: false,data: [], pageindex: 1,totalcount: 0, pagecount:100});
var TimerMixin = require('react-timer-mixin');
var PAGE_SIZE =  15;
var CategoryTabBar = require('./CategoryTabBar');

var VideoCommonItem =  require('../components/VideoCommonItem');
var CategoryList = React.createClass({
        mixins: [TimerMixin],
        getInitialState: function() {
            return {
                page: 0,
                progress: {position: 0, offset: 0},
                movie: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                zy: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                tv: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                katong: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            };
        },

        componentWillMount () {

        },
        componentDidMount () {
            this.fetchData();
        },
        fetchData () {
            var page  = this.state.page;
            var type = videoTypies[page].value;
            var cache_data  = CACHE_DATA[type];
            var params = [];
            params.push('pagesize=' + PAGE_SIZE);
            params.push('type=' + type);



            //fetch data
            if (cache_data['loading']) return ;// is loading return false
            if (cache_data['pageindex'] > 0 && cache_data['pageindex'] > cache_data['pagecount']) {
                ToastAndroid.show('已经加载到最底部拉',ToastAndroid.SHORT);
                return false;
            }
            cache_data.loading = true;
            params.push('pageindex=' + cache_data.pageindex);
            var url = 'http://doukantv.com/api/top/?' + params.join('&');
            fetch(url)
                .then((res) => res.json())
                .then((res) =>{
                    var list = res.result;
                    var length = list.length;
                    var pageinfo = res.page;
                    cache_data.pagecount = pageinfo.pagecount;
                    cache_data.totalcount = pageinfo.totalcount;
                    cache_data.loading = false;
                    list.map((video) => cache_data['data'].push(video));
                    var temp = {};
                    temp[type] = this.getDataSource(type, cache_data['data'])
                    this.setState(temp);
                })
        },
    onPageSelected: function(e) {
        this.setState({page: e.nativeEvent.position});
        var page  = e.nativeEvent.position;
        var type = videoTypies[page].value;
        var cache_data  = CACHE_DATA[type];
        if (cache_data.pageindex === 1) {
            this.setTimeout(this.fetchData,200);
        }
    },
    onPageScroll: function(e) {
        this.setState({progress: e.nativeEvent});
    },
    move: function(delta) {
        var page = this.state.page + delta;
        this.viewPager && this.viewPager.setPage(page);
        this.setState({page});
    },
    go: function(page) {
        this.viewPager && this.viewPager.setPage(page);
        this.setState({page});
        var type = videoTypies[page].value;
        var cache_data  = CACHE_DATA[type];
        if (cache_data.pageindex === 1) {
            this.setTimeout(this.fetchData,200);
        }
    },
    getDataSource: function(type, videos): ListView.DataSource {
        var data  = this.state[type];
        return data.cloneWithRows(videos);
    },
    renderRow (data) {
        return (
            <VideoCommonItem video={data} onSelect={this.onSelect}/>
        );
    },
    onSelect (video) {
            this.props.navigator && this.props.navigator.push({
                name:  'video',
                id: video.id,
                video: video
            });
    },
    onEndReached () {
            var page  = this.state.page;
            var type = videoTypies[page].value;
            var cache_data  = CACHE_DATA[type];
            cache_data['pageindex'] = cache_data['pageindex'] + 1;
            this.fetchData();
    },
    renderHeader () {
        return (<View><Text>renderHeader</Text></View>);
    },
    renderFooter () {
        return (<View><Text>renderFooter</Text></View>);
    },
    render: function() {
        var pages = [];
        for (var i = 0; i < videoTypies.length; i++) {
              var pageStyle = {
                backgroundColor:'#fff',
                alignItems: 'center',
                padding: 20,
              };
              var videoType = videoTypies[i];
              pages.push(
                   <View key={i} style={styles.pageStyle} collapsable={true}>
                          <ListView
                               ref="listview"
                               dataSource={this.state[videoType.value]}
                               renderRow={this.renderRow}
                               onEndReached={()=> { this.onEndReached(videoType.value)}}
                               automaticallyAdjustContentInsets={false}
                               keyboardDismissMode="on-drag"
                               keyboardShouldPersistTaps={true}
                               showsVerticalScrollIndicator={false}
                               initialListSize={6}
                               onEndReachedThreshold={50}
                               pageSize={4}
                               renderHeader={this.renderHeader}
                               renderFooter={this.renderFooter}
                             />
                  </View>
          );
        }
        var page = this.state.page;
        return (
          <View style={styles.container}>
            <CategoryTabBar  go={this.go} page ={this.state.page} progress={this.state.progress}/>
            <ViewPagerAndroid
              style={styles.viewPager}
              initialPage={0}
              onPageScroll={this.onPageScroll}
              onPageSelected={this.onPageSelected}
              ref={viewPager => { this.viewPager = viewPager; }}>
              {pages}
            </ViewPagerAndroid>
          </View>
        );
  },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewPager: {
        flex: 1,
    },
});

module.exports = CategoryList;