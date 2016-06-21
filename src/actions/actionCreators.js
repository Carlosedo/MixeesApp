// add ingredient
export function addIngredient(ingredient, ingredientType) {
  return {
    type: 'ADD_INGREDIENT',
    ingredient,
    ingredientType
  }
}

// remove ingredient
export function removeIngredient(index, ingredient_id, ingredientType) {
  return {
    type: 'REMOVE_INGREDIENT',
    index,
    ingredient: {
      id: ingredient_id
    },
    ingredientType
  }
}
