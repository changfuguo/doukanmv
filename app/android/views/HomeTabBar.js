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
		borderTopRadius: 3,
		borderRightRadius: 3,
	},
	arrow :{
		height:10,
		width:10,
		padding:0,
		marginTop:-1,
		rotation:90
	}
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={{color: isTabActive ? '#fff' : '#999', fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
   render() {
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
	  justfiyContent: 'center',
	  alignItems: 'center',
      width: deviceWidth / numberOfTabs,
      height: 10,
      top: 30,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, deviceWidth / numberOfTabs]
    });

    return (
		<View style={styles.container}>
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
			<Animated.View style={[tabUnderlineStyle, {left: left}]} >
				<Image source={require('image!ic_play')} style={styles.arrow}/>
			</Animated.View>
		</View>
    );
  },
});

module.exports = DefaultTabBar;
