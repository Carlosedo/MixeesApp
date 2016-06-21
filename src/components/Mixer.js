import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  Image,
  View,
  ListView,
} from 'react-native';

import IngredientList from './IngredientList'
import MixerGlass from './MixerGlass'


// let elasticsearch = require('elasticsearch')

// let es_client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// })

export default React.createClass({

    // let ingredients = []

    // es_client.search({
    //   index: 'ingredients',
    //   type: 'ingredient',
    //   body: {},
    //   ignore: [404]
    // }).then( body => {
    //   ingredients = body.hits.hits.map(hit => hit._source.name)
    // }, error => {
    //   console.trace(error.message)
    // })

    // es_client.search({
    //   index: 'cocktails',
    //   type: 'cocktail',
    //   body: {
    //     query: {
    //       match_phrase: {
    //         ingredients: val.join(' ')
    //       }
    //     }
    //   },
    //   ignore: [404]
    // }).then( body => {
    //   this.found_cocktails = body.hits.hits
    //   this.num_found_cocktails = this.found_cocktails.length
    // }, error => {
    //   console.trace(error.message)
    // })

  render() {
    return(
        <View>
          <Text style={styles.mixerTitle}>
            Select the ingredients you want
          </Text>
          <View style={styles.mixerContainer}>
            <IngredientList
              ingredientType='spirits'
              ingredientList={this.props.ingredients.spirits}
              {...this.props}
            />
            <MixerGlass {...this.props} />
            <IngredientList
              ingredientType='mixers'
              ingredientList={this.props.ingredients.mixers}
              {...this.props}
            />
          </View>
        </View>
      )
  }
})


const styles = StyleSheet.create({
  mixerTitle: {
    flex:1,
    marginVertical: 30,
    textAlign: 'center',
  },

  mixerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
})

