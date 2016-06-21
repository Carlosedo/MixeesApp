import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  ListView,
} from 'react-native';


export default React.createClass({
  _render_ingredient_row(ingredient, i) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        key={ingredient.id}
        onPress={() => this.props.removeIngredient(i, ingredient.id, ingredient.type)}
      >
        <View style={styles.ingredient}>
          <Text>
            {ingredient.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  },

  render() {
    return(
      <View>
        <View style={styles.mixerGlass}>
          {this.props.selected_ingredients.map((ingredient, i) =>
            this._render_ingredient_row(ingredient, i)
          )}
          <View style={styles.mixerGlassBottom}></View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  mixerGlass: {
    height: 300,
    width: 150,
    borderRadius: 5,
    borderColor: '#999',
    borderWidth: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  mixerGlassBottom: {
    height: 30,
    width: 142,
    backgroundColor: '#eee',
    borderRadius: 3,
  },

  ingredient: {
    height: 30,
    width: 142,
    backgroundColor: 'green',
  }
})
