import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
const deviceScreen = Dimensions.get('window');

// const SideMenu = require('react-native-side-menu');
import SideMenu from './SideMenu'
import NewIngredientList from './NewIngredientList'
import Liker from './Liker'

export default React.createClass({
  getInitialState: function() {
    return {
      text: '',
    };
  },

  render() {
    const menu = (
      <Liker
      />
    )

    // return (
    //   <SideMenu
    //     menu={menu}
    //     maxMenuWidth={deviceScreen.width / 3}
    //     bounceBackOnOverdraw={false}
    //   >
    //     <View style={styles.container}>
    //       <TextInput
    //         style={styles.searchInput}
    //         placeholder='Type your search here!'
    //         selectionColor='#08FE66'
    //         onChangeText={(text) => this.setState({text})}
    //         value={this.state.text}
    //         autoFocus={true}
    //       />

    //       <View>
    //         <Text>
    //           {this.state.text}
    //         </Text>
    //       </View>
    //     </View>
    //   </SideMenu>
    // )

    return (
      <SideMenu
        menu={menu}
        maxMenuWidth={deviceScreen.width / 6}
        bounceBackOnOverdraw={false}
        hiddenMenuOffset={-60}
      >
        <View style={styles.container}>

          <View>
            <Text>
              holarr
              {this.state.text}
            </Text>
          </View>
        </View>
      </SideMenu>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  menu: {
    backgroundColor: 'blue'
  },

  searchInput: {
    height: 56,
    borderColor: 'gray',
    borderWidth: 1,
    shadowRadius: 1,
    shadowOpacity: 0.4,
    shadowColor: 'black',
    elevation: 2,
  }
})