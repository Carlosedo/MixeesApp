import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'

// import root reducer
import rootReducer from './reducers/index'

import cocktails from './data/cocktails'
import ingredients from './data/ingredients'

var selected_ingredients = []
var new_ingredients = {}

// Ugly hack until I get the data from the api
new_ingredients['spirits'] = ingredients['spirits'].map((ing) => {
  ing['selected'] = false
  return ing
})
new_ingredients['mixers'] = ingredients['mixers'].map((ing) => {
  ing['selected'] = false
  return ing
})

// create an object for the default data
const defaultState = {
  cocktails,
  ingredients: new_ingredients,
  selected_ingredients
}

const enhancer = compose(
  applyMiddleware(thunk),
  devTools()
)

const store = createStore(rootReducer, defaultState, enhancer)

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
