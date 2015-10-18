'use strict';

var React = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = React;

var {Icon,} = require('react-native-icons');
var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
	tab: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: 10,
	},
	container: {
		height: 40,
	},
	tabs: {
		height: 30,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor:'rgba(0,0,0,.8)',
	},
	arrow :{
		height:10,
		width:10,
		padding:0,
		marginTop:-10,
		backgroundColor:'blue'
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
          <Text style={{color: isTabActive ? 'navy' : 'black', fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
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
				<Icon name='fontawesome|sort-down' color='#000' size ={20} style={styles.arrow}/>
			</Animated.View>
		</View>
    );
  },
});

module.exports = DefaultTabBar;
