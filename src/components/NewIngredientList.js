import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  ListView,
  PanResponder,
  Animated
} from 'react-native';


export default React.createClass({
  getInitialState: function() {
    return {
      selectedRow: ''
    };
  },

  componentWillMount: function() {
    this._rowLayouts = {};
    this._rowAnimations = {};
    this._hoveredRow = '';

    this._scaleAnimation = new Animated.Value(0);

    this.props.ingredientList.forEach((ing) => {
      this._rowAnimations[ing.id] = {
        scale: new Animated.Value(1)
      };
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        var hoveredRow = this.getHoveredRow(Math.ceil(gestureState.moveY) - 300);
        this.setState({
          hoveredRow: Math.ceil(gestureState.moveY) - 300
        })
        if (hoveredRow && this._hoveredRow !== hoveredRow) {
          this.animateSelected(this._rowAnimations[hoveredRow])
        }
        if (this._hoveredRow !== hoveredRow && this._hoveredRow) {
          this.animateFromSelect(this._rowAnimations[this._hoveredRow]);
        }
        this._hoveredRow = hoveredRow;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredRow) {
          this.animateFromSelect(this._rowAnimations[this._hoveredRow], this.release )
        } else {
          this.release();
        }
      }
    });
  },

  animateSelected: function(rowAnimations) {
    Animated.timing(rowAnimations.scale, {
      duration: 150,
      toValue: 1.8
    }).start();
  },

  animateFromSelect: function(rowAnimations, cb) {
    Animated.timing(rowAnimations.scale, {
      duration: 50,
      toValue: 1
    }).start(cb);
  },

  getHoveredRow: function(y) {
    return Object.keys(this._rowLayouts).find((key) => {
      return y >= this._rowLayouts[key].bottom && y <= this._rowLayouts[key].top;
    })
  },

  release: function() {
    if (this._hoveredRow) {
      this.setState({
        selectedRow: this._hoveredRow
      })
    }
    this._hoveredRow = '';
  },

  handleLayoutPosition: function(row, position) {
    this._rowLayouts[row] = {
      top: position.nativeEvent.layout.y,
      bottom: position.nativeEvent.layout.y - position.nativeEvent.layout.height
    }
  },

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
        onLayout={this.handleLayoutPosition.bind(this, rowData.id)}
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
          <Text>You selected: {this.state.selectedRow}</Text>
        </View>
      )
  }
})

const styles = StyleSheet.create({
  ingredientRow: {
    height: 40,
    width: 80,
    marginRight: 10,
    borderColor: '#999',
    borderWidth: 2,
  },

  selected: {
    backgroundColor: 'red'
  }
})
