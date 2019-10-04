/**
 *
 * @author ikonon
 * @create 2019/10/3
 */
import React, {memo} from 'react';
import {Text} from 'react-native';
import {Button} from 'teaset';
// import {getBannerRequest} from '../../api/request';
import {NavigationActions, StackActions} from 'react-navigation';
import NavigationServer from '../../utils/NavigationServer';

const SingerDetail = props => {
  const navigateAction = NavigationActions.navigate({
    routeName: 'Home',

    params: {},

    // action: NavigationActions.navigate({ routeName: 'SingerDetail' }),
  });

  return (
    <>
      <Text>歌手详情</Text>
      <Button
        title={'获取详情'}
        onPress={async () => {
          // const data = await getBannerRequest();
          // console.log('data', data);
          props.navigation.dispatch(navigateAction);
        }}
      />
      <Button
        title={'dismiss'}
        onPress={async () => {
          props.navigation.dispatch(navigateAction);
        }}
      />
    </>
  );
};

export default SingerDetail;
