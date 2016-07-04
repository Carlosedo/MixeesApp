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
    left: 10,
    top: 0,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...absoluteStretch,
    backgroundColor: 'transparent',
  },
  center: {
    position: 'absolute',
    left: 10,
    top: 30
  },
  likeContainer: {
    position: 'absolute',
    top: -30,
    padding: 5,
    flex: 1,
    backgroundColor: '#ccc',
  },
  imgContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  ing: {
    margin: 5,
    width: 60,
    height: 30,
  }
});