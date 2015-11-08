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
                Platform,
                TouchableHighlight,
                TouchableNativeFeedback,
                Dimensions,
                PanResponder,
            } = React;

            var createElementFrom = require('../components/createElementFrom')
            var RefreshingIndicator = require('../components/RefreshingIndicator')

            var SCROLL_EVENT_THROTTLE = 32
            var MIN_PULLDOWN_DISTANCE = 40
            var TimerMixin = require('react-timer-mixin');
            var PAGE_SIZE =  15;
            var CategoryTabBar = require('./CategoryTabBar');
            var deviceWidth = Dimensions.get('window').width;

            var Hot = React.createClass({
                    mixins: [TimerMixin],
                    getInitialState: function() {

                        var getSectionData = (dataBlob, sectionID) => {
                            return dataBlob[sectionID];
                        };

                        var getRowData = (dataBlob, sectionID, rowID) => {
                            return dataBlob[sectionID + ':' + rowID];
                        };

                        var dataSource = function () {
                            return new ListView.DataSource({
                               getRowData: getRowData,
                               getSectionHeaderData: getSectionData,
                               rowHasChanged: (row1, row2) => row1 !== row2,
                               sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                            });
                        }
                        return {
                            page: 0,
                            progress: {position: 0, offset: 0},
                            waitingForRelease: false,
                            isRefreshing: false,
                            movie: {
                                data: dataSource(),
                                loading : 0
                            },
                            zy : {
                                data: dataSource(),
                                loading : 0
                            },
                            tv: {
                                data: dataSource(),
                                loading : 0
                            },
                            katong: {
                                data: dataSource(),
                                loading : 0

                            }
                        };
                    },

                    getDefaultProps() {
                        return {
                          minPulldownDistance: MIN_PULLDOWN_DISTANCE,
                          scrollEventThrottle: SCROLL_EVENT_THROTTLE,
                          ignoreInertialScroll: true,
                          refreshingIndictatorComponent: RefreshingIndicator,

                          refreshDescription: '刷新数据吧'
                        }
                    },
 
                    componentWillMount () {


                    },

                    componentDidMount () {
                        this.fetchData();
                    },
                    fetchData () {
                        var page  = this.state.page;
                        var type = videoTypies[page].value;

                        var loading = this.state[type].loading;
                        if(loading === 1) return;
                        var url = 'http://doukantv.com/api/hot/?type=' + type;
                        this.state[type].loading = 1;
                        fetch(url)
                            .then((res) => res.json())
                            .then((res) =>{
                                var temp ={};
                                temp[type] = {
                                    data: this.getDataSource(type, res.result),
                                    loading: 0
                                }
                                this.setState(temp);
                            })
                    },
                onPageSelected: function(e) {
                     this.setState({page: e.nativeEvent.position});
                     var page  = e.nativeEvent.position;
                     var type = videoTypies[page].value;
                     if (this.state[type].loading === 0) {
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

                    if (this.state[type].loading === 0) {
                        this.setTimeout(this.fetchData,200);
                    }
                },
                getDataSource: function(type, videos): ListView.DataSource {
                    var data  = this.state[type].data;

                    var dataBlob = {};
                    var sectionsID = [];
                    var rowsID = [];
                    videos.map((item, index)=>{
                        sectionsID.push(index);
                        dataBlob[index] = {name: item.name};
                        var rowID = rowsID[index] = [];
                        item.list.map((video) => {
                            var id = video.id;
                            dataBlob[index + ':' + id] = video;
                            rowID.push(id);
                        });
                    });
                    return data.cloneWithRowsAndSections(dataBlob, sectionsID, rowsID);
                },
                onSelect (video) {
                        this.props.navigator && this.props.navigator.push({
                            name:  'video',
                            id: video.id,
                            video: video
                        });
                },
                selectVideo (video) {
                    this.props.navigator && this.props.navigator.push({
                        name:  'video',
                        id: video.id,
                        video: video

                    });
                },
                renderRow: function(
                    video: Object,
                    sectionID: number | string,
                    rowID: number | string,
                    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
                    ) {
                        var TouchableElement = TouchableHighlight;
                        if (Platform.OS === 'android') {
                            TouchableElement = TouchableNativeFeedback;
                        }
                        return(
                              <TouchableElement onPress={() => this.selectVideo(video)} underlayColor="transparent">
                                    <View>
                                          <View style={styles.row}>
                                                <Image source={{uri:video.vthumburl}} style={styles.cover} />
                                                <Text style={styles.name}>{video.programname}</Text>
                                                <Text style={[styles.brief,]} numberOfLines= {2} >{video.shortdesc}</Text>
                                          </View>
                                    </View>
                              </TouchableElement>

                        );
                  },
                renderSectionHeader: function(sectionData: Object,
                    sectionID: number | string) {
                        return (
                            <View style={styles.sectionHeader}>
                                <Text >| {sectionData.name}</Text>
                            </View>
                    );

                },
                listViewScroll (e) {
                    //ToastAndroid.show(videoType + '',ToastAndroid.SHORT);
                     console.log('listViewScroll')

                    var scrollY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y
                    this.lastScrollY = scrollY
                    this.lastContentInsetTop = e.nativeEvent.contentInset.top
                    this.lastContentOffsetX = e.nativeEvent.contentOffset.x

                    if (this.isTouching || (!this.isTouching && !this.props.ignoreInertialScroll)) {
                        if (scrollY < -this.props.minPulldownDistance) {
                            if (!this.state.isRefreshing) {
                                setTimeout(()=>{
                                    this.state.isRefreshing = true;
                                },1000);
                            }
                        }
                    }
                },
                render: function() {
                    var pages = [];
                    for (var i = 0; i < videoTypies.length; i++) {
                        var pageStyle = {
                            backgroundColor:'red',
                            alignItems: 'center',
                            padding: 20,
                        };
                        var videoType = videoTypies[i];
                        pages.push(
                               <View key={i} style={styles.pageStyle} collapsable={true}>
                                      <ListView
                                           ref={"listview" + '_' +videoType.value}
                                           dataSource={this.state[videoType.value].data}
                                           renderRow={this.renderRow}
                                           automaticallyAdjustContentInsets={false}
                                           keyboardDismissMode="on-drag"
                                           onScroll = {this.listViewScroll}

                                           renderHeader = {this.renderHeader}
                                           keyboardShouldPersistTaps={true}
                                           renderSectionHeader={this.renderSectionHeader}
                                           showsVerticalScrollIndicator={true}
                                           initialListSize={12}
                                           onEndReachedThreshold={50}
                                           pageSize={6}
                                           contentContainerStyle={styles.list}
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
            renderHeader() {
                var description = this.props.refreshDescription

                var refreshingIndictator
                if (this.state.isRefreshing) {
                    refreshingIndictator = createElementFrom(this.props.refreshingIndictatorComponent, {description})
                } else {
                    refreshingIndictator = null
                }

                return refreshingIndictator;
            },
            });

            var styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: 'white',
                },
                viewPager: {
                    flex: 1,
                    justifyContent: 'space-around',
                },
                row: {
                    justifyContent: 'center',
                    padding: 5,
                    margin: 3,
                    width: 100,
                    height: 180,
                    backgroundColor: '#F6F6F6',
                    alignItems: 'center',
                 },
                list: {
                    padding:20,
                    paddingTop: 10,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                },
                sectionHeader: {
                    color: '#333',
                    fontWeight: 'bold',
                    flexDirection:'row',
                    width: (deviceWidth - 40),
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

            module.exports = Hot;