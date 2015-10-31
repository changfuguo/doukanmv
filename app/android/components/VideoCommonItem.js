'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var VideoCommonItem = React.createClass({

    getInitialState () {
        return {
            video: null
        };
    },

    componentWillMount () {
        this.setState({video: this.props.video})
    },

    render () {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
          TouchableElement = TouchableNativeFeedback;
        }
        return (
              <View>
                    <TouchableElement
                          onPress={()=>this.props.onSelect(this.state.video)}>
                                <View style={styles.row}>

                                      <View style={styles.coverWrapper}>
                                          <Image source={{uri:this.state.video.vthumburl}} style={styles.cover} />
                                      </View>
                                        <View style={styles.descWrapper}>
                                        <Text style={[styles.movieCommonText,styles.movieTitle]} numberOfLines={1}>
                                             {this.state.video.programname}
                                        </Text>
                                        <Text style={[styles.movieCommonText]} numberOfLines={2}>
                                            {this.state.video.shortdesc}
                                        </Text>
                                        <Text style={[styles.movieCommonText]} numberOfLines={2}>
                                            {this.state.video.craw}
                                        </Text>
                                        </View>
                                </View>
                    </TouchableElement>
              </View>
        );
    }

});

var styles = StyleSheet.create({
      textContainer: {
        flex: 1,
      },
      movieTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop:4,
        color:'#000'
      },
      movieCommonText : {
        fontSize: 12,
        color: '#999',
        flex: 1,
        marginBottom: 2,
      },
      coverWrapper:{
          width:60,
          height:93,
          flexDirection:'column',
          marginRight:20
      },
      cover:{
          width:60,
          height:93,
      },
      row: {
        flex:1,
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20
      },

      cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
      },
});


module.exports = VideoCommonItem;