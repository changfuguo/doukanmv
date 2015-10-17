# doukanmv---React-native  for android 

> 这里利用《都看影视》app的api，做一个react native for Android 版本的程序 

# 1、Splash 完成
> Splash只是`Animated` 一个组件就可以了，通过使用该组件发现，组件内部实际上维护了一个定时器，该定时器会更新所需要的一些属性值，动态绘制到layout上

### Setup 1 设定初始值  
    getInitialState: function() {
          return {
            cover: null,
            bounceValue: new Animated.Value(1),
          };
    },

### Setup 2 触发定时器
    componentDidMount: function() {
       this.state.bounceValue.setValue(1);
       Animated.timing(
         this.state.bounceValue,
         {
           toValue: 1.1,
           duration: 5000,
         }
       ).start();
    }
### Setup 3 控制view的变量写入

    <Animated.Image
      source={img}
      style={{
      flex: 1,
      width: WINDOW_WIDTH,
      height: 1,
      backgroundColor:'rgba(0,0,0,.4)',
      transform: [
        {scale: this.state.bounceValue}, // 这里设定值 
      ]
      }} 
    </Animated.Image>
    
如下图所示：
![启动图](https://raw.githubusercontent.com/changfuguo/doukanmv/master/temp/screensnap/splash.png)
> 启示：
>  1）`Animated` 可以展示其他View，里面也可以嵌套，这里跟CSS无任何差别，`<Animated.Image` 可以是`<Animated.View` 
>  2)  可以使用类css语法，对FE友好


# 2、主页导航

### Setup 1 编写导航功能
> 功能主要实现 
> 1、选中状态

> 2、讲选中的菜单value传递到主页去，主页的逻辑来加载不同的View

        var menus=CONST_MENUS.map((menu) =>{ 
                var icon = 'fontawesome|' + menu.icon;
                var isCurrent = menu.value == this.state.active;

                return (<TouchableElement onPress={()=> this.onSelect(menu.value)}>
                            <View style={styles.actionItem}>
                                <View style={styles.actionIconRow}>
                                        <Icon 
                                            name = {icon}
                                            size={30}
                                            color={isCurrent ? '#0a78eb' :'#999999'}
                                            style={styles.actionIcon}
                                        />  
                                </View>
                                <View style={styles.actionIconRow}>
                                    <Text style={[styles.actionText,isCurrent ? styles.actionActive:'']}>
                                        {menu.text}
                                    </Text>
                                </View>
                            </View>
                    </TouchableElement>
                );
         });

在onSelect中处理选中状态，同时回掉主页逻辑，主页逻辑通过props传递进来

    onSelect : function (name) {
        this.setState({active:name});
        this.props.onselect(name);
    },
    
    
### setup 2 主页 逻辑选择

> 主页选择router的逻辑是通过Navigator来实现的，根据上一步菜单返回的值做选择，具体逻辑可见[index.android.js](https://github.com/changfuguo/doukanmv/blob/master/index.android.js#L94)

主页图如下：

![主页](https://raw.githubusercontent.com/changfuguo/doukanmv/master/temp/screensnap/home.png)

# 3、关于图标的说明

android 里面的图片需要设置好几种样式，同时还的去找不同图标，直接用了[react-native-icons](https://github.com/corymsmith/react-native-icons)，demo期间为了方便


# 4、主页功能
 主页功能按照不同分类只是占时top N

# 5、分类
这里可以不断下拉展示N多条

# 6、搜索

# 7、用户中心

# 8、帮助中心









