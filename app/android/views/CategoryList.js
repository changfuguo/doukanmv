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
} = React;

var CategoryTabBar = require('./CategoryTabBar');
var CategoryList = React.createClass({

  getInitialState: function() {
    return {page: 0, progress: {position: 0, offset: 0}};
  },
  onPageSelected: function(e) {
    this.setState({page: e.nativeEvent.position});
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
        <View key={i} style={pageStyle} collapsable={true}>
          <Text>{i}{videoType.name}</Text>
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
