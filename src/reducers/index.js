import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {ingredients, selected_ingredients} from './ingredients'
import cocktails from './cocktails'

// const rootReducer = combineReducers({selected_ingredients, routing: routerReducer})
const rootReducer = combineReducers({cocktails, ingredients, selected_ingredients})

export default rootReducer
