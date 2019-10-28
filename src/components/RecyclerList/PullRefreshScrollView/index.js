/**
 *
 * @author ikonon
 * @create 2019/10/27
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  RefreshControl,
  Animated,
  Image,
  ScrollView,
  Easing,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseScrollView,
} from 'recyclerlistview';
import RefreshHeader from './RefreshHeader';
import PropTypes from 'prop-types';
import type {HeaderStatus} from './RefreshHeader';
import {status} from './RefreshHeader';
import {SpringScrollView, NormalHeader} from 'react-native-spring-scrollview';

function log(...args) {
  console.log(...args);
}

export default class PullRefreshScrollView extends BaseScrollView {
  // XY动画偏移量
  _offsetX: Animated.Value;
  _offsetY: Animated.Value;
  // 外层ScrollView撑开的宽高
  _width: number;
  _height: number;
  // 内层View宽高
  _contentWidth: number;
  _contentHeight: number;
  // 正在拖动标志
  dragFlag: boolean = false;
  _refreshStatus: HeaderStatus = status.waiting;

  constructor(props) {
    super(props);
    this.state = {
      updateView: false,
    };
    this.obtainScrollEvent(props);
    this._offsetX.setValue(props.initialContentOffset.x);
    this._offsetY.setValue(props.initialContentOffset.y);
  }
  //
  obtainScrollEvent(props) {
    if (!props) {
      props = {};
    }
    this._nativeOffset = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      ...props.onNativeContentOffsetExtract

    };
    this._offsetY = this._nativeOffset.y;
    this._offsetX = this._nativeOffset.x;
    // this._event = Animated.event(
    //   [
    //     {
    //       nativeEvent: {
    //         contentOffset: this._nativeOffset,
    //       },
    //     },
    //   ],
    //   {
    //     useNativeDriver: true,
    //     listener: this._onScroll,
    //   },
    // );
  }

  _updateView = () => this.setState({updateView: !this.state.updateView});

  componentDidMount() {
    log('componentDidMount====渲染完成', {
      _offsetX: this._offsetX,
      _offsetY: this._offsetY,
    });
  }
  _onContentLayoutChange = ({
    nativeEvent: {
      layout: {x, y, width: contentWidth, height: contentHeight},
    },
  }) => {
    log('_onContentLayoutChange====内层View' + new Date(), {
      x,
      y,
      contentWidth,
      contentHeight,
    });
    if (
      this._contentHeight !== contentHeight ||
      this._contentWidth !== contentWidth
    ) {
      this._contentHeight = contentHeight;
      this._contentWidth = contentWidth;
      // todo
    }
  };
  _onWrapperLayoutChange = (width, height) => {
    log('_onWrapperLayoutChange====外层ScrollView' + new Date(), {
      width,
      height,
    });
    if (this._height !== height || this._width !== width) {
      this._height = height;
      this._width = width;
      // todo
    }
  };

  _onMomentumScrollEnd = e => {
    log('onMomentumScrollEnd====滚动动画结束' + new Date(), e.nativeEvent);
  };
  _onScrollBeginDrag = e => {
    log('onScrollBeginDrag====用户开始拖动此视图' + new Date(), e.nativeEvent);
    this.dragFlag = true;
  };
  _onScroll = e => {
    const target = e.nativeEvent;
    const y = target.contentOffset.y;
    log('onScroll====用户正在拖动此视图' + new Date(), {
      ...target.contentOffset,
    });

    if (this.dragFlag) {
      if (y <= 10) {
        this.upState();
      } else {
        this.downState();
      }
    }
  };

  _onScrollEndDrag = e => {
    log('onScrollBeginDrag====用户停止拖动此视图' + new Date(), e.nativeEvent);
    const target = e.nativeEvent;
    const y = target.contentOffset.y;
    this.dragFlag = false;

    // if (y <= 160 && y >= 10 && Platform.OS === 'android') {
    //   this._scrollViewRef.scrollTo({x: 0, y: -60, animated: true});
    // }
  };

  upState = () => {
    log('upState====高于临界值', this._offsetY);
    this._updateView();
    Animated.spring(this._offsetY, {
      toValue: 80,
      duration: 100,
      // easing: Easing.inOut(Easing.quad),
    }).start();
  };

  downState = () => {
    log('downState====低于临界值', this._offsetY);
    this._updateView();
    Animated.spring(this._offsetY, {
      toValue: -80,
      duration: 100,
      // easing: Easing.inOut(Easing.quad),
    }).start();
  };
  _getRefreshHeaderStyle = () => {
    const {
      RefreshHeader: {height: rHeight, style},
    } = this.props;

    let transform = [];
    if (style === 'topping') {
      transform = [
        {
          translateY: this._offsetY.interpolate({
            inputRange: [-rHeight - 1, -rHeight, 0, 1],
            outputRange: [-1, 0, rHeight, rHeight],
          }),
        },
      ];
    } else if (style === 'stickyScrollView') {
      transform = [
        {
          translateY: this._offsetY.interpolate({
            inputRange: [-rHeight - 1, -rHeight, 0, 1],
            outputRange: [-1, 0, 0, 0],
          }),
        },
      ];
    } else if (style !== 'stickyContent') {
      console.warn(
        "unsupported value: '",
        style,
        "' in SpringScrollView, " +
          "select one in 'topping','stickyScrollView','stickyContent' please",
      );
    }
    return {
      position: 'absolute',
      top: -rHeight,
      right: 0,
      height: rHeight,
      left: 0,
      transform,

    };
  };

  scrollTo(...args) {
    if (this._scrollViewRef) {
      this._scrollViewRef.scrollTo(...args);
    }
  }

  _renderRefreshHeader = () => {
    const {onRefresh = true, RefreshHeader} = this.props;
    // 渲染失败不加载
    const measured =
      this._height !== undefined && this._contentHeight !== undefined;
    if (!measured) {
      return null;
    }
    log('-----------------------+++++++++++++++++',this._getRefreshHeaderStyle())
    return (
      onRefresh && (
        <Animated.View style={this._getRefreshHeaderStyle()}>
          <RefreshHeader
            ref={ref => (this._refreshHeader = ref)}
            offset={this._offsetY}
            maxHeight={RefreshHeader.height}
          />
        </Animated.View>
      )
    );
  };

  render() {
    log('render==========',  {
      _offsetX: this._offsetX._value,
      _offsetY: this._offsetY._value,
    });
    return (
      <ScrollView
        ref={scrollView => (this._scrollViewRef = scrollView)}
        onContentSizeChange={this._onWrapperLayoutChange}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        onScrollBeginDrag={this._onScrollBeginDrag}
        onScrollEndDrag={this._onScrollEndDrag}
        bounces={true}
        onScroll={this._onScroll}
        {...this.props}
        scrollEventThrottle={1}
        onNativeContentOffsetExtract={this._nativeOffset}
      >
        <View onLayout={this._onContentLayoutChange} style={{flex:1}}>
          {this.props.children}
          {this._renderRefreshHeader()}

        </View>
      </ScrollView>
    );
  }
}

PullRefreshScrollView.propTypes = {
  RefreshHeader: PropTypes.func,
  onRefresh: PropTypes.func, // 下拉刷新回调函数
  initialContentOffset: PropTypes.object, // x, y轴初始化偏移量
};

PullRefreshScrollView.defaultProps = {
  RefreshHeader: RefreshHeader,
  initialContentOffset: {x: 0, y: 0},
};
