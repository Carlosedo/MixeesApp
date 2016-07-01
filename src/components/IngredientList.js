import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  ListView,
} from 'react-native';


export default React.createClass({
  _press_on_ingredient(ingredient) {
    let i = this.props.selected_ingredients.map((e) => {return e.id}).indexOf(ingredient.id)

    if (i < 0) {
      this.props.addIngredient(ingredient, this.props.ingredientType)
    } else {
      this.props.removeIngredient(i, ingredient.id, this.props.ingredientType)
    }
  },

  _render_ingredient_row(rowData) {
    return (
      <TouchableNativeFeedback
        key={rowData.id}
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => this._press_on_ingredient(rowData)}
      >
        <View style={[styles.ingredientRow, rowData.selected && styles.selected]}>
          <Text>
            {rowData.ingredientName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  },

  render() {
    return(
        <View>
          <Text>{this.props.ingredientType}</Text>
          <View>
            {this.props.ingredientList.map((ingredient) =>
              this._render_ingredient_row(ingredient)
            )}
          </View>
        </View>
      )
  }
})

const styles = StyleSheet.create({
  ingredientRow: {
    height: 40,
    borderColor: '#999',
    borderWidth: 2,
  },

  selected: {
    backgroundColor: 'red'
  }
})