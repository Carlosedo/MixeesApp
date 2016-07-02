import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  Animated
} from 'react-native';

var images = [
  {id: 'like', img: require('./../imgs/liker/like.png')},
  {id: 'love', img: require('./../imgs/liker/love.png')},
  {id: 'haha', img: require('./../imgs/liker/smile.png')},
  {id: 'yay', img: require('./../imgs/liker/happy.jpg')},
]


var Liker = React.createClass({
  getInitialState: function() {
    return {
      selected: '',
      hoveredImg: '',
    };
  },

  componentWillMount: function() {
    this._imgLayouts = {};
    this._imageAnimations = {};
    this._hoveredImg = '';

    this._scaleAnimation = new Animated.Value(0);

    images.forEach((img) => {
      this._imageAnimations[img.id] = {
        scale: new Animated.Value(1)
      };
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        var hoveredImg = this.getHoveredImg(Math.ceil(gestureState.moveY) - 300);

        this.setState({
          hoveredImg: Math.ceil(gestureState.moveY) - 300
        })
        if (hoveredImg && this._hoveredImg !== hoveredImg) {
          this.animateSelected(this._imageAnimations[hoveredImg])
        }
        if (this._hoveredImg !== hoveredImg && this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg]);
        }
        this._hoveredImg = hoveredImg;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg], this.release )
        } else {
          this.release();
        }
      }
    });
  },

  animateSelected: function(imgAnimations) {
    Animated.timing(imgAnimations.scale, {
      duration: 150,
      toValue: 1.8
    }).start();
  },

  animateFromSelect: function(imgAnimations, cb) {
    Animated.timing(imgAnimations.scale, {
      duration: 50,
      toValue: 1
    }).start(cb);
  },

  getHoveredImg: function(y) {
    return Object.keys(this._imgLayouts).find((key) => {
      return y >= this._imgLayouts[key].bottom && y <= this._imgLayouts[key].top;
    })
  },

  release: function() {
    if (this._hoveredImg) {
      this.setState({
        selected: this._hoveredImg
      })
    }
    this._hoveredImg = '';
  },

  handleLayoutPosition: function(img, position) {
    this._imgLayouts[img] = {
      top: position.nativeEvent.layout.y,
      bottom: position.nativeEvent.layout.y - position.nativeEvent.layout.height
    }
    console.log(this._imgLayouts)
  },

  getImages: function() {
    return images.map((img) => {
      return (
        <Animated.Image
          onLayout={this.handleLayoutPosition.bind(this, img.id)}
          key={img.id}
          source={img.img}
          style={[
              styles.img,
              {
                transform: [
                  {scale: this._imageAnimations[img.id].scale}
                ]
              }
          ]}
        />
      );
    })
  },

  render: function() {
    return (
      <View
        style={styles.center}
        {...this._panResponder.panHandlers}
      >
        <Text>Like</Text>
        <Text>You selected: {this.state.selected}</Text>
        <Text>You hovered: {this.state.hoveredImg}</Text>
        <Animated.View
          style={styles.likeContainer}
        >
          <View style={styles.imgContainer}>
            {this.getImages()}
          </View>
        </Animated.View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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

export default Liker
