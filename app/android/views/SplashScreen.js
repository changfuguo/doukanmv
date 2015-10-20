'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} = React;

var Animated = require('Animated');

var WINDOW_WIDTH = Dimensions.get('window').width;


var SplashScreen = React.createClass({
  getInitialState: function() {
    return {
      cover: null,
      bounceValue: new Animated.Value(1),
    };
  },
  componentDidMount: function() {
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.1,
        duration: 5000,
      }
    ).start();
  },
  render: function() {
    var img, text;
      img = require('image!splash');
      text = '你想看的，这里都有';
    
	return(
		<View style={styles.container}>
			<Animated.Image
				source={img}
				style={{
				flex: 1,
				width: WINDOW_WIDTH,
				height: 1,
				backgroundColor:'rgba(0,0,0,.4)',
				transform: [
				  {scale: this.state.bounceValue},
				]
			}} >
		</Animated.Image>
		<Text style={styles.text}>
				{text}
		</Text>
	  </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  logowrapper :{
	position: 'absolute',
	left: 0,
	right: 0,
    bottom: 50,
    height: 50,
	alignItems: 'center',
	justifyContent:'center',
	flex: 1,
  },
  logo: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
    backgroundColor: 'transparent',
  }
});

module.exports = SplashScreen;
