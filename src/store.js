import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import root reducer
import rootReducer from './reducers/index';

import cocktails from './data/cocktails';
import ingredients from './data/ingredients';

var selected_ingredients = []

// create an object for the default data
const defaultState = {
  cocktails,
  ingredients,
  selected_ingredients
}

const store = createStore(rootReducer, defaultState, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
