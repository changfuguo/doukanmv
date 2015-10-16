# doukanmv---React-native  for android 

> 这里利用《都看影视》app的api，做一个react native for Android 版本的程序 

# 1、Splash 完成
> Splash只是`Animate` 一个组件就可以了，通过使用该组件发现，组件内部实际上维护了一个定时器，该定时器会更新所需要的一些属性值，动态绘制到layout上

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
      }} >
    </Animated.Image>
    
如下图所示：

> 启示：
>  1）`Animated` 可以展示其他View，里面也可以嵌套，这里跟CSS无任何差别，`<Animated.Image` 可以是`<Animated.View` 
>  2)  可以使用类css语法，对FE友好


