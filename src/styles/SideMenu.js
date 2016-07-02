const React = require('react-native');

const {
  StyleSheet,
} = React;

const absoluteStretch = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};

module.exports = StyleSheet.create({
  container: {
    ...absoluteStretch,
    justifyContent: 'center',
  },
  menu: {
    ...absoluteStretch,
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 50,
    top: 0,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...absoluteStretch,
    backgroundColor: 'transparent',
  },
  center: {
    position: 'absolute',
    left: 50,
    top: 300
  },
  likeContainer: {
    position: 'absolute',
    left: -10,
    top: -30,
    padding: 5,
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  img: {
    margin: 5,
    width: 30,
    height: 30,
  }
});