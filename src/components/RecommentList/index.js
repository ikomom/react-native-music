/**
 *
 * @author ikonon
 * @create 2019/10/20
 */
import React, {memo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';

export type Props = {
  data?: Array,
};

const ImageItem = () => {
  return (
    <View style={{}}>
      {/*<LazyloadImage source={}/>*/}
      <Text>Section</Text>
    </View>
  )
};

const RecommendList = (props: Props) => {
  return (
    <View>
     <FlatList
       data={props.data}
       numColumns={3}
       renderItem={<ImageItem/>}
     />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default React.memo(RecommendList);
