import React from 'react'
import {
  Navigator,
  Platform,
  View,
  ToolbarAndroid,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import store from './src/store'
import * as actionCreators from './src/actions/actionCreators'

import APIClient from './src/utils/APIClient'

import HomeScene from './src/components/Home'
import BaseView from './src/components/BaseView'
import ListOfCocktails from './src/components/ListOfCocktails'
import CocktailDetail from './src/components/CocktailDetail'
import NavigationBarRouter from './src/components/NavigationBarRouter'

// class Main extends React.Component {
class App extends React.Component {

  // componentDidMount() {
  //   let client = new APIClient()

  //   ingredients_request_data = '{allSpirits{edges{node{id,name,slug}}},allMixers{edges{node{id,name,slug}}}}'

  //   console.log(ingredients_request_data)

  //   client.get('', ingredients_request_data)
  //     .then(json => console.log(json))
  //     .catch(error => console.error(error))
  // }

  render() {
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{name: 'home'}}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
        renderScene={this._routeMapper}
        navigationBar={Platform.OS === 'ios' ? <Navigator.NavigationBar routeMapper={NavigationBarRouter} /> : null}
      />
    )
  }

  _getToolbar(navigator, showBackIcon, title) {
    if (Platform.OS === 'ios') {
      return null
    }

    return (
      <ToolbarAndroid
        title={title}
        navIcon={showBackIcon ? require('./src/imgs/back_android.png') : null}
        onIconClicked={() => navigator.pop()}
        titleColor='white'
      />
    )
  }

  _routeMapper(route, navigator) {
    _navigator = navigator

    let defaultProps = {navigator: _navigator}
    if (route.name === 'home') {
      return <HomeScene {...defaultProps} toolbar={() => this._getToolbar(navigator, false, 'Mixees')} />
    } else if (['search', 'mixer', 'favorites'].indexOf(route.name) != -1) {
      return <BaseView {...defaultProps} {...this.props} toolbar={() => this._getToolbar(navigator, true, 'Test')} selectedTab={route.name}/>
    } else if (route.name === 'favorites') {
      return <ListOfCocktails {...defaultProps} toolbar={() => this._getToolbar(navigator, true, 'Cocktails')} />
    } else if (route.name === 'detail') {
      return <CocktailDetail {...defaultProps} wikiURL={route.wikiURL} toolbar={() => this._getToolbar(navigator, true, route.cocktailName)}/>
    }

    return null
  }
}

// function mapStateToProps(state) {
//   return {
//     ingredients: state.ingredients,
//     cocktails: state.cocktails,
//     selected_ingredients: state.selected_ingredients
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreators, dispatch)
// }

// const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App


