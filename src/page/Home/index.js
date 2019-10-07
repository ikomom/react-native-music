import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {Button} from 'teaset';
import {NavBar} from '../../components';
import NavigationServer from '../../utils/NavigationServer';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    NavigationServer.setNavigationRef(props.navigation);
  }

  render() {
    return (
      <>
        <NavBar title={'Home'} isTopNavigator={true} />
        <Button
          title={'第二页面'}
          onPress={() => {
            this.props.navigation.navigate('SingerDetail');
          }}
        />
        <Button
          title={'打开抽屉'}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <Button
          title={'切换抽屉状态'}
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
        />
        <Text>Hello Home</Text>
      </>
    );
  }
}

export default Home;
