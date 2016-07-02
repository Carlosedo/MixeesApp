const styles = require('./../styles/SideMenu');
const ReactNative = require('react-native');
const React = require('react');
const {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Text,
  View,
} = ReactNative;
const deviceScreen = Dimensions.get('window');


var images = [
  {id: 'like', img: require('./../imgs/liker/like.png')},
  {id: 'love', img: require('./../imgs/liker/love.png')},
  {id: 'haha', img: require('./../imgs/liker/smile.png')},
  {id: 'yay', img: require('./../imgs/liker/happy.jpg')},
]


class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Default left offset for content view
     * @todo Check if it's possible to avoid using `prevLeft`
     * @type {Number}
     */
    this.prevLeft = 0;
    this.fingerWidth = 0;

    const initialMenuPositionMultiplier = props.menuPosition === 'right' ? -1 : 1



    this._imgLayouts = {};
    this._imageAnimations = {};
    this._hoveredImg = '';

    this._scaleAnimation = new Animated.Value(0);

    images.forEach((img) => {
      this._imageAnimations[img.id] = {
        scale: new Animated.Value(1)
      };
    })



    this.state = {
      width: deviceScreen.width,
      height: deviceScreen.height,
      left: new Animated.Value(this.props.hiddenMenuOffset),
      selected: '',
      hoveredImg: '',
    };
  }

  /**
   * Set the initial responders
   * @return {Void}
   */
  componentWillMount() {
    this.responder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: this.handlePanResponderEnd.bind(this),
    });
  }

  /**
   * Permission to use responder
   * @return {Boolean}
   */
  handleMoveShouldSetPanResponder(e: Object, gestureState: Object) {
    // const x = Math.round(Math.abs(gestureState.dx));
    // const y = Math.round(Math.abs(gestureState.dy));

    // const touchMoved = x > this.props.toleranceX && y < this.props.toleranceY;

    // const withinEdgeHitWidth = this.props.menuPosition === 'right' ?
    //   gestureState.moveX > (deviceScreen.width - this.props.edgeHitWidth) :
    //   gestureState.moveX < this.props.edgeHitWidth;

    // const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0;
    // return withinEdgeHitWidth && touchMoved && swipingToOpen;
    return true
  }

  /**
   * Handler on responder move
   * @param  {Synthetic Event} e
   * @param  {Object} gestureState
   * @return {Void}
   */
  handlePanResponderMove(e: Object, gestureState: Object) {
    let newLeft = this.prevLeft + gestureState.dx + this.fingerWidth;

    if (!this.props.bounceBackOnOverdraw && newLeft > this.props.maxMenuWidth) {
      newLeft = this.menuPositionMultiplier() * this.props.maxMenuWidth + this.fingerWidth;
    }

    this.state.left.setValue(newLeft);



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
  }

  /**
   * Handler on responder move ending
   * @param  {Synthetic Event} e
   * @param  {Object} gestureState
   * @return {Void}
   */
  handlePanResponderEnd(e: Object, gestureState: Object) {
    if (this._hoveredImg) {
      this.animateFromSelect(this._imageAnimations[this._hoveredImg], this.release )
    } else {
      this.release();
    }

    this.closeMenu();
  }

  /**
   * Returns 1 or -1 depending on the menuPosition
   * @return {Number}
   */
  menuPositionMultiplier() {
    return this.props.menuPosition === 'right' ? -1 : 1;
  }

  moveLeft(offset) {
    const newOffset = this.menuPositionMultiplier() * offset;

    this.state.left.setValue(newOffset);

    this.prevLeft = newOffset;
  }

  /**
   * Close menu
   * @return {Void}
   */
  closeMenu() {
    const { hiddenMenuOffset, } = this.props;
    this.moveLeft(hiddenMenuOffset);

    this.forceUpdate();
    this.props.onChange();
  }

  release() {
    if (this._hoveredImg) {
      this.setState({
        selected: this._hoveredImg
      })
    }
    this._hoveredImg = '';
  }

  animateSelected(imgAnimations) {
    Animated.timing(imgAnimations.scale, {
      duration: 150,
      toValue: 1.8
    }).start();
  }

  animateFromSelect(imgAnimations, cb) {
    Animated.timing(imgAnimations.scale, {
      duration: 50,
      toValue: 1
    }).start(cb);
  }

  getHoveredImg(y) {
    return Object.keys(this._imgLayouts).find((key) => {
      return y >= this._imgLayouts[key].bottom && y <= this._imgLayouts[key].top;
    })
  }

  handleLayoutPosition(img, position) {
    this._imgLayouts[img] = {
      top: position.nativeEvent.layout.y,
      bottom: position.nativeEvent.layout.y - position.nativeEvent.layout.height
    }
  }

  getImages() {
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
      )
    })
  }

  /**
   * Get content view. This view will be rendered over menu
   * @return {React.Component}
   */
  getContentView() {
    const { width, height, } = this.state;
    const ref = (sideMenu) => this.sideMenu = sideMenu;
    // const style = [
    //   styles.frontView,
    //   { width, height, },
    //   this.props.animationStyle(this.state.left),
    // ];

    const style = [
      styles.frontView,
      { width, height, },
    ];


    return (
      <View style={style} ref={ref}>
        {this.props.children}
      </View>
    );
  }

  onLayoutChange(e) {
    const { width, height, } = e.nativeEvent.layout;
    this.setState({ width, height, });
  }

  /**
   * Compose and render menu and content view
   * @return {React.Component}
   */
  render() {
    const boundryStyle = this.props.menuPosition == 'right' ?
      {left: deviceScreen.width - this.props.maxMenuWidth} :
      {right: deviceScreen.width - this.props.maxMenuWidth}

    const style = [
      styles.menu,
      this.props.animationStyle(this.state.left)
    ]

    const menu =
      <Animated.View
        style={style}
        {...this.responder.panHandlers}>
          <View
            style={styles.center}
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
      </Animated.View>;

    return (
      <View style={styles.container} onLayout={this.onLayoutChange.bind(this)}>
        {this.getContentView()}
        {menu}
      </View>
    );
  }
}

SideMenu.propTypes = {
  edgeHitWidth: React.PropTypes.number,
  toleranceX: React.PropTypes.number,
  toleranceY: React.PropTypes.number,
  menuPosition: React.PropTypes.oneOf(['left', 'right', ]),
  onChange: React.PropTypes.func,
  maxMenuWidth: React.PropTypes.number,
  hiddenMenuOffset: React.PropTypes.number,
  disableGestures: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool, ]),
  animationFunction: React.PropTypes.func,
  onStartShouldSetResponderCapture: React.PropTypes.func,
  bounceBackOnOverdraw: React.PropTypes.bool,
};

SideMenu.defaultProps = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  maxMenuWidth: deviceScreen.width * 2 / 3,
  hiddenMenuOffset: 0,
  onStartShouldSetResponderCapture: () => true,
  onChange: () => {},
  animationStyle: (value) => {
    return {
      transform: [{
        translateX: value,
      }, ],
    };
  },
  animationFunction: (prop, value) => {
    return Animated.spring(
      prop,
      {
        toValue: value,
        friction: 8,
      }
    );
  },
  bounceBackOnOverdraw: true,
};

module.exports = SideMenu;
