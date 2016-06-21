/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux'

import App from './App';


import store from './src/store'
// import { applyMiddleware, createStore } from 'redux'
// import createLogger from 'redux-logger'
// import thunk from 'redux-thunk';
// import rootReducer from './src/reducers/index'

// const logger = createLogger()
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
// const store = createStoreWithMiddleware(rootReducer)


class MixeesApp extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('MixeesApp', () => MixeesApp);
