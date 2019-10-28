/**
 * 常量
 * @author ikonon
 * @create 2019/10/27
 */
import {Dimensions, Platform} from 'react-native';

export const platforms = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const getImageParam = (width, height) => `?param=${width}x${height}`;
const Constants = {
  NavBar: {
    height: 100,
  },
  banner: {
    height: 160,
  },
  RecommendList: {
    height: Math.floor(screenWidth / 3 - 10) + 62,
  },
  ImageCell: {
    width: screenWidth / 3 - 12,
  },
};

// 图片分辨率
Constants.banner.resolution = getImageParam(
  screenWidth,
  Constants.banner.height,
);
Constants.ImageCell.resolution = getImageParam(
  Constants.ImageCell.width - 50,
  Constants.ImageCell.width - 50,
);

export default Constants;
