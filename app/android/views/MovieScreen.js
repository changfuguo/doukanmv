'user strict';

var React = require('react-native');

var {
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight,
    ToastAndroid,
    Navigator,
    ToolbarAndroid,
    Dimensions,
    Animated,
    ScrollView
} = React;

var VideoHelper = require('../utils/VideoHelper');

var deviceWidth =  Dimensions.get('window').width;
var deviceHeight  = Dimensions.get('window').height;
var SEP_WIDTH =(deviceWidth - 15 * 2) / 3;
var online = false;
var showActions = ['play','download','detail'];

var cacheLinks = {};
var MoiveScreen = React.createClass({
    getInitialState () {
        return {
            isLoading: true,
            video: null,
            type: this.props.type,
            links: null,
            episode: false,
            currentPage: 0,
            scrollValue: new Animated.Value(0),
            currentSource:null,
            download :{

            },
            play:{

            },
        }
    },
    goBack () {
        var navigator = this.props.navigator;
        if( navigator && navigator.getCurrentRoutes().length > 0){
            navigator.pop();
        }
    },
    componentDidMount () {
        var state = {};

        fetch('http://doukantv.com/api/program/?id=' + this.props.id)
            .then((res) => res.json())
            .then((res)=>{
                this.setState({
                    video: res.data,
                    links: res.videos,
                    episode: !res.data.videotype === 'movie',
                    isLoading : false
                })
                res.videos.map((link)=>{

                    var source = VideoHelper.getSource(link.videourl);
                    cacheLinks[source.value] = link.urls;
                    if(this.state.currentSource){
                        this.setState({currentSource:source.value});
                    }
                })

            });

//        state.video = videoMock.data;
//        state.links = videoMock.videos;
//        state.isLoading = false;
//        state.episode = false;


        //this.setState({video:state.video,links:state.links,isLoading: false});
    },

    show (current) {
        ToastAndroid.show('current:' + current,ToastAndroid.SHORT);
        this.setState({currentPage:current});
        Animated.spring(this.state.scrollValue, {toValue: current, friction: 10, tension: 50}).start();
    },
    selectSource (source){
        ToastAndroid.show('in selectSource:' + source,ToastAndroid.SHORT);
        this.setState({currentSource:source});
    },
    selectLink(current){
         var action = showActions[this.state.currentPage];
         var cs = this.state.currentSource;
         if(action == 'play'){
            ToastAndroid.show('in play:' + current.url,ToastAndroid.SHORT);
         }

         if(action == 'download') {
            ToastAndroid.show('in download:' + current.url,ToastAndroid.SHORT);
         }
    },
    renderBottomPanel(currentPage,currentSource){
        ToastAndroid.show('in renderBottomPanel:' + currentPage+';'+currentSource,ToastAndroid.SHORT);
        var action = showActions[currentPage];
        var content = null;
         var TouchableElement = TouchableHighlight;
            if (Platform.OS === 'android') {
                TouchableElement = TouchableNativeFeedback;
         }
        if(action == 'play' || action == 'download'){
             var currents = cacheLinks[currentSource];
             if(!currents) return null;
             content = currents.map((current)=>{
                    return(
                          <TouchableElement onPress={()=> this.selectLink(current)}>
                                <View style={[styles.linkItem,styles.actionItem]}>
                                    <Text >{current.seq}</Text>
                                </View>
                          </TouchableElement>

                    );
             })
        } else if(action == 'detail') {
            return (
                    <View style={{flex:1}}>
                        <Text numberOfLines={14}>{this.state.video.programedesc}</Text>
                    </View>
            );
        }
        return content;
    },
    renderSource(){
        var action = showActions[this.state.currentPage];
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        if(action == 'detail') {

            return null;
        }
        var sources = this.state.links.map((link)=>{
            var source = VideoHelper.getSource(link.videourl);
            if(!source) return null;
            if(!this.state.currentSource){
                this.setState({currentSource:source.value});
            }
            return(
                <TouchableElement onPress={()=> this.selectSource(source.value)}>
                    <View style={[styles.sourceItem,styles.actionItem,{backgroundColor: this.state.currentSource == source.value?'#ddd':'#fff'}]}>
                        <Text >{source.name}</Text>
                    </View>
                </TouchableElement>
            );

        })

        return (
                <View style={[styles.row,styles.sourceRow]}>
                {sources}
                </View>
            );

    },
    render () {
        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <Text>正在加载...</Text>
                </View>
            );
        }

        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }

        var tabUnderlineStyle = {
          position: 'absolute',
          width: SEP_WIDTH,
          height: 2,
          backgroundColor: 'purple',
          bottom: 0,
        };

        var left = this.state.scrollValue.interpolate({
              inputRange: [0, 1], outputRange: [0, SEP_WIDTH]
        });
        return (
            <View style={styles.container} >
                <View style={[styles.toolbar]}>
                    <TouchableElement onPress={()=>this.goBack()}>
                          <View  style={styles.actionItem}>
                                  <Image
                                    style={styles.backIcon}
                                    source={require('image!ic_back_white')}
                                    resizeMode='contain' />
                          </View>
                    </TouchableElement>
                    <View  style={styles.actionItem}>
                        <Text style={styles.title}>{this.state.video.programname}</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <View style={styles.row}>
                        <View style={styles.coverWrapper}>
                            <Image source={{uri:this.state.video.vthumburl}} style={styles.cover} />
                        </View>
                        <View style={styles.descWrapper}>
                            <Text  style={styles.showtxt}>导演：{this.state.video.director}</Text>
                            <Text style={styles.showtxt}>年代：{this.state.video.year}</Text>
                            <Text style={styles.showtxt} numberOfLines={2}>演员：{this.state.video.craw}</Text>
                            <Text style={styles.showtxt}>地区：{this.state.video.area}</Text>
                        </View>
                    </View>
                    <View style={[styles.row,styles.btnRow]}>
                           <TouchableElement onPress={()=>this.show(0)}>
                                  <View  style={[styles.actionItem,styles.btnItem]}>
                                       <Text>播放</Text>
                                  </View>

                           </TouchableElement>
                           <TouchableElement onPress={()=>this.show(1)}>
                                  <View  style={[styles.actionItem,styles.btnItem,]}>
                                         <Text>下载</Text>
                                  </View>

                           </TouchableElement>
                           <TouchableElement onPress={()=>this.show(2)}>
                                 <View  style={[styles.actionItem,styles.btnItem,]}>
                                        <Text>详情</Text>
                                 </View>
                            </TouchableElement>
                            <Animated.View style={[tabUnderlineStyle,{left}]} />
                    </View>
                    <ScrollView style={[styles.row,styles.sourceRow]} horizontal={true}>
                        {this.renderSource(this.state.currentPage)}
                    </ScrollView>
                    <ScrollView style={{height:220}}>
                        <View style ={[styles.row,styles.panelRow]} >
                            {this.renderBottomPanel(this.state.currentPage,this.state.currentSource)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    main:{
        paddingLeft: 15,
        paddingRight: 15,
        marginTop:20
    },
    row:{
        flex:1,
        flexDirection: 'row'
    },
    coverWrapper:{
        marginRight:5,
        width:100,
        height:130,
        flexDirection:'column',
        marginRight:20
    },
    cover:{
        width:100,
        height:130,

    },
    toolbar:{
        backgroundColor:'#3a3941',
        height:30,
        alignItems:'center',
        flexDirection:'row',
        textAlign:'center',
        paddingRight:46
    },
    seperator: {
        position:'absolute',
        left:0,
        bottom:0,
        width:100,
        height:1/PixelRatio.get(),
    },
    actionItem: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 8,
        paddingRight: 8,
    },
    linkItem:{
        width:40,
        height:40,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth:1,
        borderColor: 'red',
        backgroundColor:'#fff',
        marginRight:5,
        marginTop:5,
        color:'#000'
    },
    sourceItem:{
        borderRadius: 3,
        borderWidth:1,
        borderColor:'red',
        width: 50,
        marginRight:10,
        marginTop:10
    },
    sourceRow:{
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        height:40,
    },
    panelRow:{
        justifyContent:'space-between',
        flexWrap:'wrap',
        marginTop:10
    },
    btnRow:{
        height:50,
        marginTop:20,
    },
    btnItem:{
        height: 50,
        flex:1,
    },
    showtxt:{
        marginTop:3,
        marginBottom:3
    },
    backIcon:{
        width:20,
        height:20,
    },
    title:{
        color: '#fff',
        flex:1
    }

});

var videoMock = {
                "data": {
                    "director": "吴彦和",
                    "year": "2015",
                    "id": 121863,
                    "videotype": "tv",
                    "craw": "刘静怡/庄洁梦/丁冠森",
                    "episode": "更新至10集",
                    "area": "大陆",
                    "l": "len3579",
                    "programedesc": "一间颇具特色的女仆咖啡厅，因缘巧合之下汇聚了一群不同年龄，不同身份，不同梦想的都市男女，就在这里，一幕幕看似平常却又乐趣十足的故事每天都在上演，或搞笑，或离奇，或浪漫，或感动。人老心不老的老板西门先生、风情万种却又迷恋物质的御姐林沁、天真无邪的萌妹谢晓星、世故圆滑的厨师大胡子、温顺随和的女神钟瑶、认真执着却又常犯二的横漂叶小辉、力图振兴中华影视的虎编秦向南等。他们性格各异，活泼搞怪，但无一例外，他",
                    "vthumburl": "http://p9.qhimg.com/t018697d33a30e1544c.jpg",
                    "programname": "女仆咖啡厅"
                },
                "videos": [
                    {
                        "play": 5,
                        "videourl": "http://www.funshion.com/vplay/m-202612.e-1",
                        "urls": [
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-10",
                                "seq": 10
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-9",
                                "seq": 9
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-8",
                                "seq": 8
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-7",
                                "seq": 7
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-6",
                                "seq": 6
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-5",
                                "seq": 5
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-4",
                                "seq": 4
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-3",
                                "seq": 3
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-2",
                                "seq": 2
                            },
                            {
                                "url": "http://www.funshion.com/vplay/m-202612.e-1",
                                "seq": 1
                            }
                        ]
                    },
                    {
                        "play": 5,
                        "videourl": "http://www.tudou.com/albumplay/JzIIBRj7udY/MfQ1I_c5X0A.html?dvid=8240345&dpid=369370",
                        "urls": [
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/Nyv2uVlfNro.html?dvid=8344181",
                                "seq": 9
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/0PO2PP76eDk.html?dvid=8312569",
                                "seq": 8
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/eH4KMKLCxp8.html?dvid=8240351",
                                "seq": 7
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/5KF7WY6-rqo.html?dvid=8240350",
                                "seq": 6
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/Z5C5bH2_w40.html?dvid=8240349",
                                "seq": 5
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/Wn8G25Z0-dM.html?dvid=8240348",
                                "seq": 4
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/6DkzOe6AxsA.html?dvid=8240347",
                                "seq": 3
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/8KgTtCHhw2I.html?dvid=8240346",
                                "seq": 2
                            },
                            {
                                "url": "http://www.tudou.com/albumplay/JzIIBRj7udY/MfQ1I_c5X0A.html?dvid=8240345",
                                "seq": 1
                            }
                        ]
                    },
                    {
                        "play": 5,
                        "videourl": "http://v.youku.com/v_show/id_XMTM0MTQzMzI5Ng==.html?dvid=8240352&dpid=369371",
                        "urls": [
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM1ODEwMjY2OA==.html?dvid=8344182",
                                "seq": 9
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM1NDg1ODM2NA==.html?dvid=8313470",
                                "seq": 8
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0NzAxNzQ2MA==.html?dvid=8240358",
                                "seq": 7
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0MjgwMzY4NA==.html?dvid=8240357",
                                "seq": 6
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0MjgwMzcwMA==.html?dvid=8240356",
                                "seq": 5
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0MjgwMzY5Ng==.html?dvid=8240355",
                                "seq": 4
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0MjkzNjkyOA==.html?dvid=8240354",
                                "seq": 3
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0Mjk2MTY3Mg==.html?dvid=8240353",
                                "seq": 2
                            },
                            {
                                "url": "http://v.youku.com/v_show/id_XMTM0MTQzMzI5Ng==.html?dvid=8240352",
                                "seq": 1
                            }
                        ]
                    },
                    {
                        "play": 5,
                        "videourl": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/m0166fww91f.html",
                        "urls": [
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/k01682n8mbg.html",
                                "seq": 9
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/t01685zunpy.html",
                                "seq": 8
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/n0167ej08dz.html",
                                "seq": 7
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/h0166bkipfo.html",
                                "seq": 6
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/z0166tztbeu.html",
                                "seq": 5
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/e0166wt0ej6.html",
                                "seq": 4
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/l01661jhtbk.html",
                                "seq": 3
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/p01661016jy.html",
                                "seq": 2
                            },
                            {
                                "url": "http://v.qq.com/cover/2/2lfkafyfu6lxkxu/m0166fww91f.html",
                                "seq": 1
                            }
                        ]
                    }
                ],
                "recommend": []
  };

module.exports = MoiveScreen;