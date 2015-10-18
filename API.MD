# 用到的涉及一些API
host : http://doukantv.com/api/

## 1、热点数据获取-首页
 
url： /hot/?sys_ver=8.4&cli=iphone&type=movie&ver=2.3.4

1)  type 取值为 movie、tv、zy、katong 分别表示为 电影、电视剧、综艺、动漫
    上面四个为一类模板，type 为movie时，返回的响应如下


        {
            "result": [
                {
                    "list": [
                       
                        {
                            "craw": "布拉德·皮特/罗根·勒曼/希亚·拉博夫/乔·博恩瑟",
                            "episode": null,
                            "vthumburl": "http://p0.qhimg.com/t01664690ad29fae87b.jpg",
                            "programname": "狂怒 2014",
                            "shortdesc": "二战虎式坦克的辉煌岁月",
                            "id": 96006
                        }
                    ],
                    "name": "热点"
                }
            ]
        }
    
>  电影会有名称、简介、图片，还有一个id
>  有剧集的会 用到一个 剧集的字段，

2)  type为专题的时候 

  url：/recommend/?type=movie&ver=2.3.4&sys_ver=8.4&cli=iphone&pageindex=1&pagesize=20
  返回的数据
  
  {
      "result": [
          {
              "vthumburl": "http://p3.qhimg.com/t01fffbad21f1b7ebce.jpg",
              "shortdesc": "盘点电影中执掌江山，坐拥美人的霸主",
              "id": 1067,
              "programname": "醒掌天下权，醉卧铜雀台"
          }
      ],
      "page": {
          "totalcount": 343,
          "pageindex": 1,
          "pagesize": 15,
          "pagecount": 23
      }
  }


## 2 进入类别

有 电影 、电视剧、综艺、动漫、直播  ，还有筛选条件,对应的type分别为：movie、tv、zy、katong ，live、

/top/?pagesize=20&ver=2.3.4&sys_ver=8.4&type=movie&pageindex=1&cli=iphone

返回的数据格式如下

    {
        "result": [
            {
                "craw": "李易峰/张慧雯/尼坤/李玟",
                "episode": null,
                "average": 7.8,
                "vthumburl": "http://p8.qhimg.com/t01103fa1edea6e1e05.jpg",
                "programname": "栀子花开2015",
                "shortdesc": "李易峰变国民男友",
                "id": 106241
            },
        ],
        "page": {
            "totalcount": 26127,
            "pageindex": 1,
            "pagesize": 15,
            "pagecount": 1742
        }
    }

>  有剧集的会多一个剧集字段，直播的  只会用名称和图片


### 类别 这里有个地方显示筛选 

接口如下 
/filter/?type=tv&ver=2.3.4&sys_ver=8.4&cli=iphone&pageindex=2&pagesize=20

返回的数据接口如下

        
        {
            "filter": [
                {
                    "sort": "year",
                    "values": [
                        {
                            "key": "all",
                            "title": "全部"
                        },
                        {
                            "key": "2015",
                            "title": "2015"
                        },
                    ],
                    "title": "年代"
                },
                {
                    "sort": "area",
                    "values": [
                        {
                            "key": "all",
                            "title": "全部"
                        },
                        {
                            "key": "香港",
                            "title": "香港"
                        },
                    ],
                    "title": "地区"
                },
                {
                    "sort": "category",
                    "values": [
                        {
                            "key": "all",
                            "title": "全部"
                        },
                        {
                            "key": "伦理",
                            "title": "伦理"
                        },
                    ],
                    "title": "类型"
                }
            ]
        }

  当有 过滤条件时 请求的地址为
  url: /top/?pagesize=20&ver=2.3.4&sys_ver=8.4&type=tv&year=2015&area=all&category=all&pageindex=1&cli=iphone


# 3 详情页面 
> 任何一个列表进去都可以用到详情页

请求地址为  /program/?id=121863&sys_ver=8.4&cli=iphone&ver=2.3.4

返回的请求

    {
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
    }

根据videoUrl的域名展示来源 ，根据域名显示不用的网站来源

# 4 搜索 功能

请求地址
url : /?cli=iphone&pageindex=1&ver=2.3.4&q=%E5%96%9C%E5%89%A7%E7%8F%AD%E7%9A%84%E6%98%A5%E5%A4%A9&sys_ver=8.4&pagesize=20&type=all

返回的数据格式为 

    {
        "result": [
            {
                "craw": "李易峰/唐嫣/杨洋/刘天佐/张智尧/魏巍/郑佩佩/颖儿/李昕亮/孙耀琦/李晨浩",
                "average": 7.5,
                "vthumburl": "http://p15.qhimg.com/t01d6eff4379b65ea5f.jpg",
                "programname": "盗墓笔记",
                "shortdesc": "护宝小分队雏形初现",
                "id": 113906
            },
            {
                "craw": "张启灵 / 吴邪 / 解语花 / 黑眼镜",
                "average": 9,
                "vthumburl": "http://images.kumi.cn/uploadfile/2013/dhpic/150-daomubiji.jpg",
                "programname": "盗墓笔记动画",
                "shortdesc": null,
                "id": 71019
            },
            {
                "craw": "未知",
                "average": 7,
                "vthumburl": "http://pic9.qiyipic.com/image/20150821/e8/5c/v_109408404_m_601_195_260.jpg",
                "programname": "强词夺理：盗墓笔记里的张起灵是不是处男？",
                "shortdesc": null,
                "id": 120943
            },
            {
                "craw": "郑云/陆超",
                "average": 5,
                "vthumburl": "http://s.wasu.tv/mrms/manage/images/201502/11/54dab1ab5dd65.jpg",
                "programname": "盗墓笔记之英国归来",
                "shortdesc": null,
                "id": 102076
            }
        ],
        "page": {
            "totalcount": 4,
            "pageindex": 1,
            "pagesize": 10,
            "pagecount": 1
        }
    }
