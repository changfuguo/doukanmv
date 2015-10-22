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
} = React;

var online = false;

var MoiveScreen = React.createClass({
    getInitialState () {
        return {
            isLoading: false,
            data: null,
            type: this.props.type,
            videos: null,
            episode: false
        }
    },
    goBack () {
        var navigator = this.props.navigator
        if( navigator && navigator.getCurrentRoutes().length > 0){
            navigator.pop();
        }
    },
    componentDidMount () {
        var state = {};
        if(this.props.type === 'movie'){
            state.episode = false
        } else {
            state.episode = true;
        }
        if (online === false) {
            state.data = videoMock.data;
            state.videos = videoMock.videos;
            state.isLoading = true;
         }else {
            // fetch data from remote address
        }
    },
    render () {
            return (
                <View style={styles.container} >
                </View>
            );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5
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