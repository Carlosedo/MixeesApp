export function selected_ingredients(state = [], action) {
  switch(action.type) {
    case 'ADD_INGREDIENT':
    if (state.map((e) => {return e.id}).indexOf(action.ingredient.id) < 0) {
      return [
        {
          name: action.ingredient.ingredientName,
          id: action.ingredient.id,
          type: action.ingredientType,
        },
        ...state,
      ]
    } else {
      return state
    }
    case 'REMOVE_INGREDIENT':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

export function ingredients(state = [], action) {
  switch(action.type) {
    case 'ADD_INGREDIENT':
      new_state = {...state}
      new_state[action.ingredientType].map((ing) => {
        if (ing.id == action.ingredient.id) {
          ing['selected'] = true
          return ing
        } else {
          return ing
        }
      })
      return new_state
    case 'REMOVE_INGREDIENT':
      new_state = {...state}
      new_state[action.ingredientType].map((ing) => {
        if (ing.id == action.ingredient.id) {
          ing['selected'] = false
          return ing
        } else {
          return ing
        }
      })
      return new_state
    default:
      return state
  }
}