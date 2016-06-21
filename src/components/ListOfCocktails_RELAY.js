import React from 'react';
import {
  Image,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class ListOfCocktails extends React.Component({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    var cocktails = this.props.cocktails.edges.map(edge =>
      return {cocktailName: edge.node.name, wikiURL: 'https://en.wikipedia.org/wiki/Long_Island_Iced_Tea'}
    )

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
      <TouchableHighlight onPress={() => this.props.navigator.push(navigationPayload)}>
        {this._rowBody(rowData.cocktailName)}
      </TouchableHighlight>
    )
  },

  _rowBody(rowData) {
    return (
      <View
        style={styles.row}
      >

        <Text style={{flex: 1}}>
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

ListOfCocktails = Relay.createContainer(ListOfCocktails, {
  fragments: {
    // cocktails: () => Relay.QL`
    //   fragment on Spirit {
    //     allSpirits {
    //       edges {
    //         node {
    //           id,
    //           name,
    //           slug,
    //         },
    //       },
    //     },
    //   }
    // `,
    cocktails: () => Relay.QL`
      fragment on Spirit {
        id
        name
        slug
      }
    `,
  },
})


const styles = StyleSheet.create({
  tableView: {
    flex: 1,
    backgroundColor: 'gray',
    marginTop: Platform.OS === 'ios' ? 60 : 0,
  },

  row: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },

  image: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },

})

module.exports = ListOfCocktails
