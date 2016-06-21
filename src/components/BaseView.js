import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TabNavigator from 'react-native-tab-navigator';
import Searcher from './Searcher'
import Mixer from './Mixer'
import ListOfCocktails from './ListOfCocktails'
import * as actionCreators from './../actions/actionCreators'

let IconFont = require('react-native-vector-icons/MaterialIcons')


const BaseView = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: this.props.selectedTab
    }
  },

  render() {
    return (
        <View style={{flex: 1}}>
          <TabNavigator
            tabBarStyle={styles.tabBar}
          >
            <TabNavigator.Item
              selected={this.state.selectedTab === 'search'}
              title="Search"
              titleStyle={styles.tabTitle}
              selectedTitleStyle={styles.tabTitleSelected}
              renderIcon={() => <IconFont name="search" size={24} color="#000"/>}
              renderSelectedIcon={() => <IconFont name="search" size={24} color="#FFF"/>}
              onPress={() => this.setState({ selectedTab: 'search' })}
            >
              <Searcher {...this.props} />
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'mixer'}
              title="Mixer"
              titleStyle={styles.tabTitle}
              selectedTitleStyle={styles.tabTitleSelected}
              renderIcon={() => <IconFont name="local-bar" size={24} color="#000"/>}
              renderSelectedIcon={() => <IconFont name="local-bar" size={24} color="#FFF"/>}
              onPress={() => this.setState({ selectedTab: 'mixer' })}
            >
              <Mixer {...this.props} />
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'favorites'}
              title="Favorites"
              titleStyle={styles.tabTitle}
              selectedTitleStyle={styles.tabTitleSelected}
              renderIcon={() => <IconFont name="star-border" size={24} color="#000"/>}
              renderSelectedIcon={() => <IconFont name="star" size={24} color="#FFF"/>}
              onPress={() => this.setState({ selectedTab: 'favorites' })}
            >
              <ListOfCocktails/>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    )
  },
})

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#08FE66'
  },

  tabTitle: {
    color: '#000',
  },

  tabTitleSelected: {
    color: '#FFF',
  },

})

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients,
    cocktails: state.cocktails,
    selected_ingredients: state.selected_ingredients
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseView)
