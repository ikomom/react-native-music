/**
 *  FlatList实现的推荐列表
 *  性能不太好，换成RecyclerList实现
 * @author ikonon
 * @create 2019/10/20
 */
import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Image from '../ImageWithPlaceholder';
import Constants, {screenWidth} from '../../utils/Constance';

export type Props = {
  data?: Array,
};
const {width, resolution} = Constants.ImageCell;
const lineHeight = Constants.RecommendList.height;

export const ImageItem = memo(({item, index, separators}) => {
  // console.log({item, index, separators});
  return (
    <View
      // onLayout={e => console.log('renderImageItem', e.nativeEvent.layout)}
      style={styles.imageItem}>
      <TouchableWithoutFeedback>
        <View style={{backgroundColor: 'white'}}>
          <Image
            resizeMethod="auto"
            PlaceholderContent={<ActivityIndicator />}
            source={{uri: item.picUrl + resolution}}
            style={{height: width, width}}
          />
          <Text ellipsizeMode={'tail'} numberOfLines={3}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

class RecommendList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;
  _getItemLayout = (data, index) => ({
    length: lineHeight,
    offset: lineHeight * index,
    index,
  });

  renderImageItem = ({item, index, separators}) => {
    // console.log({item, index, separators});
    return <ImageItem item={item} />;
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        // 开了后，图片会闪烁，但是，关了后，滑动性能变差
        removeClippedSubviews
        windowSize={40}
        numColumns={3}
        initialNumToRender={6}
        columnWrapperStyle={styles.columnWrapperStyle}
        legacyImplementation={true}
        getItemLayout={this._getItemLayout}
        renderItem={this.renderImageItem}
        keyExtractor={this._keyExtractor}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageItem: {
    height: lineHeight,
    width,
    flexDirection: 'row',
    // margin: 5,
    justifyContent: 'center',
  },
  columnWrapperStyle: {justifyContent: 'space-evenly', paddingTop: 2},
});

export default RecommendList;
