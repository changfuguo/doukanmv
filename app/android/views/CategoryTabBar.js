'use strict';

var React = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} = React;
var videoTypies=[{name:'电影',value:'movie'},{name:'电视剧',value:'tv'},{name:'综艺',value:'zy'},{name:'动漫',value:'katong'}];

var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
	tab: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
	},
	container: {
		height: 40,
	},
	tabs: {
		height: 30,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor:'#3a3941',
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
	},
	arrow :{
		height:10,
		width:10,
		padding:0,
		marginTop:-1,
//		rotation:90
	}
});

var DefaultTabBar = React.createClass({
  propTypes: {
    go: React.PropTypes.func,
    page: React.PropTypes.number,
  },


  renderTabOption(tab, page) {
    var isTabActive = this.props.page === page;

    return (
      <TouchableOpacity style={[styles.tab]}  onPress={() => this.props.go(page)}>
        <View>
          <Text style={{color: isTabActive ? '#fff' : '#999', fontWeight: isTabActive ? 'bold' : 'normal'}}>{tab.name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
   render() {
    var numberOfTabs = videoTypies.length;
    var tabUnderlineStyle = {
      position: 'absolute',
	  justfiyContent: 'center',
	  alignItems: 'center',
      width: deviceWidth / numberOfTabs,
      height: 10,
      top: 30,
    };

     var fractionalPosition = (this.props.progress.position + this.props.progress.offset);
     var progressBarSize = (fractionalPosition ) * (deviceWidth / numberOfTabs);

    return (
		<View style={styles.container}>
			<View style={styles.tabs}>
				{videoTypies.map((tab, i) => this.renderTabOption(tab, i))}

			</View>
			<View style={[tabUnderlineStyle, {left: progressBarSize}]} >
				<Image source={require('image!ic_play')} style={styles.arrow}/>
			</View>
		</View>
    );
  },
});

module.exports = DefaultTabBar;
