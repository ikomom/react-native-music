/**
 * 带占位符的Image
 * @author ikonon
 * @create 2019/10/20
 */
import React from 'react';
import {
  View,
  Image as ImageNative,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const isAndroid = Platform.OS === 'android';

export default class Image extends React.PureComponent {
  state = {
    placeholderOpacity: new Animated.Value(1),
  };

  /**
   * 图片加载成功调用
   */
  onLoad = () => {
    const minimumWait = 100;
    const staggerNonce = 200 * Math.random();

    setTimeout(
      () => {
        Animated.timing(this.state.placeholderOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: !isAndroid,
        }).start();
      },
      isAndroid ? 0 : Math.floor(minimumWait + staggerNonce),
    );
  };

  render() {
    const {
      ImageComponent,
      placeholderStyle,
      PlaceholderContent,
      containerStyle,
      style,
      children,
      ...attributes // 其他属性
    } = this.props;
    const hasImage = Boolean(attributes.source);
    return (
      <View
        // IOS无障碍反转关闭
        accessibilityIgnoresInvertColors={true}
        style={StyleSheet.flatten([styles.container, containerStyle])}>
        <ImageComponent
          {...attributes}
          onLoad={this.onLoad}
          style={[
            StyleSheet.absoluteFill,
            // 图片样式只控制宽高
            {
              width: style.width,
              height: style.height,
            },
          ]}
        />
        {/*无图片时，默认遮罩*/}
        <Animated.View
          pointerEvents={hasImage ? 'none' : 'auto'}
          accessibilityElementsHidden={hasImage}
          importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
          style={[
            styles.placeholderContainer,
            {
              opacity: hasImage ? this.state.placeholderOpacity : 1,
            },
          ]}>
          <View
            style={StyleSheet.flatten([
              style,
              styles.placeholder,
              placeholderStyle,
            ])}>
            {PlaceholderContent}
          </View>
        </Animated.View>

        <View style={style}>{children}</View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Image.propTypes = {
  ...ImageNative.propTypes,
  // 占位内容
  PlaceholderContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.func,
  ]),
  placeholderStyle: ImageNative.propTypes.style,
  //控制最外层样式
  containerStyle: PropTypes.object,
  ImageComponent: PropTypes.elementType,
};

Image.defaultProps = {
  ImageComponent: ImageNative,
  style: {},
};
