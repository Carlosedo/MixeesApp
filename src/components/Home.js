import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  Image,
  View,
} from 'react-native';

let IconFont = require('react-native-vector-icons/MaterialIcons')

//style={ [styles.defaultText, styles.orange, styles.centered] }
export default React.createClass({
  render() {
    // <Text style={styles.subtitle}>Welcome to</Text>
    return (
      <View style={styles.tableView}>
        <View style={styles.title}>
          <Image
            source={require('./../imgs/cocktail.png')}
            style={styles.titleImage}
          />
          <Text style={styles.titleText}>Mixees</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigator.immediatelyResetRouteStack([{name: 'search'}])}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.buttonRaised}>
              <Text style={styles.buttonRaisedText}>
                I know what I want
              </Text>
              <IconFont
                name="search"
                size={26}
                color="#FFF"
              />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => this.props.navigator.immediatelyResetRouteStack([{name: 'mixer'}])}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.buttonRaised}>
              <Text style={styles.buttonRaisedText}>
                Looking for something new
              </Text>
              <IconFont
                name="local-bar"
                size={26}
                color="#FFF"
              />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => this.props.navigator.immediatelyResetRouteStack([{name: 'favorites'}])}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.buttonFlat}>
              <Text style={styles.buttonFlatText}>
                Take me to my favorites
              </Text>
              <IconFont
                name="star-border"
                size={26}
                color="#08FE66"
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  },
})


//style={ [styles.defaultText, styles.orange, styles.centered] }
const styles = StyleSheet.create({
  tableView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 0,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  subtitle: {
    fontSize: 20,
    color: '#999',
    marginTop: 60,
    marginBottom: 10,
    textAlign: 'center',
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },

  titleText: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#08FE66',
    textAlign: 'center',
  },

  titleImage: {
    width: 90,
    height: 120
  },

  buttonContainer: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 25,
  },

  buttonRaised: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#08FE66',
    margin: Platform.OS === 'ios' ? 5 : 7,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
    shadowRadius: 1,
    shadowOpacity: 0.4,
    shadowColor: 'black',
    elevation: 2,
    borderRadius: 2,
  },

  buttonRaisedText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonFlat: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    margin: Platform.OS === 'ios' ? 5 : 7,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
    borderRadius: 2,
  },

  buttonFlatText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    color: '#08FE66',
  },

})