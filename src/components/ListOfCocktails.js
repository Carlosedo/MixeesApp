import React from 'react';
import {
  Image,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import cocktails from './../data/cocktails'

export default React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      dataSource: ds.cloneWithRows(cocktails),
    };
  },

  _renderRow(rowData) {
    const navigationPayload = {
      name: 'detail',
      'cocktailName': rowData.cocktailName,
      'wikiURL': rowData.wikiURL,
    }

    return (
      <TouchableNativeFeedback
        onPress={() => this.props.navigator.push(navigationPayload)}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        {this._rowBody(rowData.cocktailName)}
      </TouchableNativeFeedback>
    )
  },

  _rowBody(rowData) {
    return (
      <View
        style={styles.row}
      >

        <Text style={styles.rowText}>
          {rowData}
        </Text>
      </View>
    )
  },

  render() {
    return (
      <View style={{flex: 1}}>
      {this.props.toolbar}
      <ListView
        style={styles.tableView}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
      </View>
    )
  },
})



const styles = StyleSheet.create({
  tableView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 0,
  },

  row: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  rowText: {
    marginLeft: 20,
  },

})
