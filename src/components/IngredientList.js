import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  ListView,
} from 'react-native';


export default React.createClass({
  _render_ingredient_row(rowData) {
    return (
      <TouchableNativeFeedback
        key={rowData.id}
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => this.props.addIngredient(rowData, this.props.ingredientType)}
        disabled={rowData.disabled}
      >
        <View style={[styles.ingredientRow, rowData.disabled && styles.selected]}>
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