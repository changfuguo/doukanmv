/**
* pulldown to refresh data
* @author febody.com
*/
'use strict';

var React = require('react-native');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    PanResponder,
    ToastAndroid,
    Dimensions,
    ScrollView,
    ActivityIndicatorIOS,
    Animated
} = React;
var TimerMixin = require('react-timer-mixin');
var deviceWidth = Dimensions.get('window').width;

var MIN_PULLDOWN_DISTANCE = 20;
var SCROLL_HEIGHT = 150;
var SCROLL_EVENT_THROTTLE =100;
var SCROLL_ACC = 5;
var ListViewSimpleExample = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds,
            refreshing: false,
            scrollY: 0,
            touching: false,
            ignoreInertialScroll:true,
            refreshState : '',
        };
    },
    getDefaultProps() {
        return {
            minPulldownDistance: MIN_PULLDOWN_DISTANCE,
            scrollEventThrottle: SCROLL_EVENT_THROTTLE,
            ignoreInertialScroll: true,
        }
    },
    _handlePanResponderGrant: function(e: Object, gestureState: Object) {
        console.log('_handlePanResponderGrant');
        return true;
    },
    _handlePanResponderMove: function(e: Object, gestureState: Object) {
        console.log('_handlePanResponderMove');
        return true;
    },
    _handlePanResponderEnd: function(e: Object, gestureState: Object) {
        console.log('_handlePanResponderEnd');
    },
    componentWillMount: function() {
        this._genRows();
        var that = this;
        this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
        return !that.state.refreshing;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
        this.setState({touching: true});
        console.log('onPanResponderGrant');
        },

        onPanResponderMove: (evt, gestureState) => {

            if(that.scrollY > 0 || that.state.refreshing) {
                return ;
            }
            var dy = that.dy = gestureState.dy * SCROLL_ACC;
            if(dy > MIN_PULLDOWN_DISTANCE && that.state.touching && !that.state.refreshing) {
                that.setState({scrollY:dy});
                that._genRows();
                that.onRefresh(dy);
                console.log(dy);
            }
            console.log('onPanResponderMove');
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            console.log('onPanResponderRelease');
        },
        onPanResponderEnd: (evt, gestureState) => {
            that.onRelease();
            that.setState({touching: false});
            console.log('onPanResponderEnd');
        },
        onPanResponderTerminate: (evt, gestureState) => {
        console.log('onPanResponderTerminate');
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            console.log('onShouldBlockNativeResponder');
            return true;
        },
    });


},

    onRelease () {
        var dy = this.dy ;
        var hander ;
        if(this.state.refreshing && this.dy > 3 && dy < SCROLL_HEIGHT) {
            hander = setInterval(()=>{
                if(dy + 20 < SCROLL_HEIGHT){
                    dy = dy + 20;
                    this.setState({scrollY: dy});
                }else{
                    this.dy = SCROLL_HEIGHT ;
                    clearInterval(hander);
                    this.setState({scrollY:SCROLL_HEIGHT});
                }
            },30);
        }
    },
    onRefresh (dy) {
        this.setState({scrollY:dy > SCROLL_HEIGHT ? SCROLL_HEIGHT: dy});
    },
    componentDidMount () {
    },
    listViewScroll (e) {
        this.scrollY =  e.nativeEvent.contentOffset.y;
    },
    renderHeader () {
        return (
            <View style={[styles.header,styles.content]}>
            <Text>下来刷新数据</Text>
            </View>
        );
    },
    renderIndicator () {

        return(
            <View  style={[styles.indicator,{height: this.state.scrollY/3}]}>
            <Text style={{color:'blue'}}>正在刷新纪录...</Text>
            </View>
        )
    },
    render: function() {
        var pageStyle = {
            backgroundColor:'red',
            alignItems: 'center',
            padding: 20,
        };

        var listStyle = {
            transform: [{
                translateY: this.state.scrollY,
            }]
        };
        return (

        <ScrollView key='1' onScroll = {this.listViewScroll}
            {...this._panResponder.panHandlers}
        scrollEventThrottle={200}>
            {this.renderIndicator()}
            <ListView
            ref={listview => { this.listview = listview; }}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            scrollRenderAheadDistance= {100}
            keyboardShouldPersistTaps={false}
            showsVerticalScrollIndicator={true}
            initialListSize={12}
            onEndReachedThreshold={50}
            pageSize={6}
            style={[styles.list,listStyle]}
            />
        </ScrollView>

        );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        return (
            <View style={{height:80}}>
            <Text>{rowData + ' !'}</Text>
            </View>
        );
    },

    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {


    if(this.state.refreshing) return;
    var number = Math.round(Math.random()*30);
    var data = [];
    number =20;
    for(var i = 0;i < number; i++) {
        if(i == 0 || i == 1 || i == 2) {
            data.push(Math.random());
        } else {
            data.push(data[i-1] + data[i-2])
        }
    }
    this.setState({refreshing:true});
    var that = this;
    this.setTimeout(function(){
        that.setState({refreshing: false});
        that.setState({dataSource: that.state.dataSource.cloneWithRows(data.reverse())});

        var hander  = setInterval(()=>{
            if(that.state.scrollY - 20 > 0 ){
            that.setState({scrollY:that.state.scrollY-20})
            } else {
            clearInterval(hander);
            that.setState({scrollY:0})
            }
        },40);
    },1000)
    },


    _pressRow: function(rowID: number) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(
            this._genRows(this._pressData)
        )});
    },
});


var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        marginTop: 10,
    }
,
    list: {
        translateX:0,
        backgroundColor:'red',
        width:deviceWidth
    },
    indicator:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
        position:'absolute',
        top:0,
        left:0,
        width:deviceWidth
    }
});

module.exports = ListViewSimpleExample;
