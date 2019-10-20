/**
 *
 * @author ikonon
 * @create 2019/10/20
 */
import React, {memo} from 'react';
import {View} from 'react-native';
import {Button} from 'teaset';
import PersistUtils from '../../utils/PersistUtils';
import NavBar from '../../components/NavBar';

const Settings = props => {
  return (
    <View>
      <NavBar title={'设置'} isTopNavigator={true}/>
      <Button
        title={'清除缓存'}
        onPress={() => {
          PersistUtils.clearPersist();
        }}
      />
    </View>
  );
};

export default memo(Settings);
